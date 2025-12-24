import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const GRPC_HOST = process.env.GRPC_HOST ?? 'localhost';
const GRPC_PORT = process.env.GRPC_PORT ?? '50151';

// Path to the proto file (relative from test/integration/)
const PROTO_PATH = path.resolve(
  __dirname,
  '../../../../../../../packages/proto/src/bookmarks/v1/bookmarks.proto',
);

// Type definitions for the gRPC service
interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags: Array<{ id: string; name: string; userId: string }>;
  userId: string;
}

interface ListBookmarksResponse {
  bookmarks: Bookmark[];
  nextPageToken: string;
  totalCount: number;
}

// Promisified client interface
interface BookmarkClient {
  getBookmark(request: { id: string }): Promise<Bookmark>;
  listBookmarks(request: {
    userId: string;
    pageSize: number;
    pageToken: string;
    tagIds: string[];
  }): Promise<ListBookmarksResponse>;
  createBookmark(request: {
    url: string;
    title: string;
    userId: string;
    tagIds: string[];
  }): Promise<Bookmark>;
  close(): void;
}

// Create promisified client
function createPromisifiedClient(
  grpcClient: grpc.Client & Record<string, unknown>,
): BookmarkClient {
  const promisify = <TRequest, TResponse>(
    methodName: string,
  ): ((request: TRequest) => Promise<TResponse>) => {
    return (request: TRequest) =>
      new Promise((resolve, reject) => {
        const method = grpcClient[methodName] as (
          request: TRequest,
          callback: (
            error: grpc.ServiceError | null,
            response: TResponse,
          ) => void,
        ) => void;
        method.call(grpcClient, request, (error, response) => {
          if (error) reject(error);
          else resolve(response);
        });
      });
  };

  return {
    getBookmark: promisify<{ id: string }, Bookmark>('getBookmark'),
    listBookmarks: promisify<
      { userId: string; pageSize: number; pageToken: string; tagIds: string[] },
      ListBookmarksResponse
    >('listBookmarks'),
    createBookmark: promisify<
      { url: string; title: string; userId: string; tagIds: string[] },
      Bookmark
    >('createBookmark'),
    close: () => grpcClient.close(),
  };
}

describe('BookmarkService gRPC Integration Tests', () => {
  let client: BookmarkClient;

  beforeAll(async () => {
    const packageDefinition = await protoLoader.load(PROTO_PATH, {
      keepCase: false,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [
        path.resolve(__dirname, '../../../../../../../packages/proto/src'),
      ],
    });

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const bookmarksV1 = protoDescriptor.bookmarks as {
      v1: { BookmarkService: grpc.ServiceClientConstructor };
    };
    const BookmarkServiceClient = bookmarksV1.v1.BookmarkService;

    const endpoint = `${GRPC_HOST}:${GRPC_PORT}`;
    console.log(`Connecting to gRPC server at ${endpoint}`);

    const grpcClient = new BookmarkServiceClient(
      endpoint,
      grpc.credentials.createInsecure(),
    );

    client = createPromisifiedClient(
      grpcClient as grpc.Client & Record<string, unknown>,
    );
  });

  afterAll(() => {
    if (client) {
      client.close();
    }
  });

  describe('GetBookmark', () => {
    it('should get an existing bookmark by id', async () => {
      // The InMemoryRepository has seed data with id 'bm-1'
      const bookmark = await client.getBookmark({ id: 'bm-1' });

      expect(bookmark).toBeDefined();
      expect(bookmark.id).toBe('bm-1');
      expect(bookmark.url).toBe('https://example.com/article1');
      expect(bookmark.title).toBe('Sample Article 1');
      expect(bookmark.userId).toBe('user-1');
    });

    it('should throw error for non-existent bookmark', async () => {
      await expect(
        client.getBookmark({ id: 'non-existent-id' }),
      ).rejects.toThrow();
    });
  });

  describe('ListBookmarks', () => {
    it('should list bookmarks for user-1', async () => {
      const response = await client.listBookmarks({
        userId: 'user-1',
        pageSize: 10,
        pageToken: '',
        tagIds: [],
      });

      expect(response).toBeDefined();
      expect(response.bookmarks).toBeDefined();
      expect(response.bookmarks.length).toBeGreaterThanOrEqual(2);
      expect(response.totalCount).toBeGreaterThanOrEqual(2);

      // Verify all bookmarks belong to user-1
      for (const bookmark of response.bookmarks) {
        expect(bookmark.userId).toBe('user-1');
      }
    });

    it('should list bookmarks for user-2', async () => {
      const response = await client.listBookmarks({
        userId: 'user-2',
        pageSize: 10,
        pageToken: '',
        tagIds: [],
      });

      expect(response).toBeDefined();
      expect(response.bookmarks).toBeDefined();
      expect(response.bookmarks.length).toBeGreaterThanOrEqual(1);

      // Verify all bookmarks belong to user-2
      for (const bookmark of response.bookmarks) {
        expect(bookmark.userId).toBe('user-2');
      }
    });

    it('should return empty list for non-existent user', async () => {
      const response = await client.listBookmarks({
        userId: 'non-existent-user',
        pageSize: 10,
        pageToken: '',
        tagIds: [],
      });

      expect(response).toBeDefined();
      expect(response.bookmarks).toHaveLength(0);
      expect(response.totalCount).toBe(0);
    });

    it('should support pagination', async () => {
      // Get first page with size 1
      const firstPage = await client.listBookmarks({
        userId: 'user-1',
        pageSize: 1,
        pageToken: '',
        tagIds: [],
      });

      expect(firstPage.bookmarks).toHaveLength(1);
      expect(firstPage.nextPageToken).toBeDefined();
      expect(firstPage.nextPageToken).not.toBe('');

      // Get second page
      const secondPage = await client.listBookmarks({
        userId: 'user-1',
        pageSize: 1,
        pageToken: firstPage.nextPageToken,
        tagIds: [],
      });

      expect(secondPage.bookmarks).toHaveLength(1);
      // Verify different bookmarks
      expect(secondPage.bookmarks[0].id).not.toBe(firstPage.bookmarks[0].id);
    });

    it('should filter by tag', async () => {
      const response = await client.listBookmarks({
        userId: 'user-1',
        pageSize: 10,
        pageToken: '',
        tagIds: ['tag-1'],
      });

      expect(response).toBeDefined();
      expect(response.bookmarks.length).toBeGreaterThanOrEqual(1);

      // Verify all returned bookmarks have the tag
      for (const bookmark of response.bookmarks) {
        const hasTag = bookmark.tags.some((tag) => tag.id === 'tag-1');
        expect(hasTag).toBe(true);
      }
    });
  });

  describe('CreateBookmark', () => {
    it('should throw error because Read service does not support create', async () => {
      await expect(
        client.createBookmark({
          url: 'https://example.com/new',
          title: 'New Bookmark',
          userId: 'user-1',
          tagIds: [],
        }),
      ).rejects.toThrow();
    });
  });
});
