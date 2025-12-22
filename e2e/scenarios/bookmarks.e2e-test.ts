import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  createBookmarkClient,
  closeAllChannels,
} from '../helpers/grpc-client';
import { httpClients } from '../helpers/http-client';
import type { BookmarkServiceClient } from '@packages/proto/bookmarks/v1';

describe('Bookmarks E2E Tests', () => {
  let grpcClient: BookmarkServiceClient;
  let httpClient: ReturnType<typeof httpClients.bookmarksRead>;

  beforeAll(() => {
    grpcClient = createBookmarkClient();
    httpClient = httpClients.bookmarksRead();
  });

  afterAll(async () => {
    await closeAllChannels();
  });

  describe('HTTP Endpoints', () => {
    it('should return 200 on health check', async () => {
      const response = await httpClient.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('gRPC BookmarkService', () => {
    describe('CreateBookmark', () => {
      it('should create a new bookmark', async () => {
        const bookmark = await grpcClient.createBookmark({
          url: 'https://example.com/test',
          title: 'Test Bookmark',
          description: 'A test bookmark for E2E testing',
          userId: 'test-user-1',
        });

        expect(bookmark).toBeDefined();
        expect(bookmark.id).toBeDefined();
        expect(bookmark.url).toBe('https://example.com/test');
        expect(bookmark.title).toBe('Test Bookmark');
        expect(bookmark.userId).toBe('test-user-1');
      });

      it('should create a bookmark without description', async () => {
        const bookmark = await grpcClient.createBookmark({
          url: 'https://example.com/no-desc',
          title: 'No Description Bookmark',
          userId: 'test-user-1',
        });

        expect(bookmark).toBeDefined();
        expect(bookmark.id).toBeDefined();
        expect(bookmark.description).toBeUndefined();
      });
    });

    describe('GetBookmark', () => {
      it('should retrieve an existing bookmark', async () => {
        // First create a bookmark
        const created = await grpcClient.createBookmark({
          url: 'https://example.com/get-test',
          title: 'Get Test Bookmark',
          userId: 'test-user-2',
        });

        // Then retrieve it
        const retrieved = await grpcClient.getBookmark({ id: created.id });

        expect(retrieved).toBeDefined();
        expect(retrieved.id).toBe(created.id);
        expect(retrieved.url).toBe('https://example.com/get-test');
        expect(retrieved.title).toBe('Get Test Bookmark');
      });

      it('should throw error for non-existent bookmark', async () => {
        await expect(
          grpcClient.getBookmark({ id: 'non-existent-id' }),
        ).rejects.toThrow();
      });
    });

    describe('ListBookmarks', () => {
      it('should list bookmarks for a user', async () => {
        const userId = 'list-test-user';

        // Create some bookmarks
        await grpcClient.createBookmark({
          url: 'https://example.com/list-1',
          title: 'List Test 1',
          userId,
        });

        await grpcClient.createBookmark({
          url: 'https://example.com/list-2',
          title: 'List Test 2',
          userId,
        });

        // List bookmarks
        const response = await grpcClient.listBookmarks({
          userId,
          pageSize: 10,
        });

        expect(response).toBeDefined();
        expect(response.bookmarks).toBeDefined();
        expect(response.bookmarks.length).toBeGreaterThanOrEqual(2);
      });

      it('should return empty list for user with no bookmarks', async () => {
        const response = await grpcClient.listBookmarks({
          userId: 'no-bookmarks-user',
          pageSize: 10,
        });

        expect(response).toBeDefined();
        expect(response.bookmarks).toBeDefined();
        expect(response.bookmarks.length).toBe(0);
      });
    });
  });

  describe('Full Flow: BFF -> gRPC -> DB', () => {
    it('should create bookmark via BFF and retrieve via gRPC', async () => {
      const usersBff = httpClients.usersBff();

      // Create via BFF (when implemented)
      // const createResponse = await usersBff.post('/bookmarks', {
      //   url: 'https://example.com/bff-test',
      //   title: 'BFF Test Bookmark',
      // });
      // expect(createResponse.status).toBe(201);

      // For now, just verify BFF is accessible
      const healthResponse = await usersBff.get('/');
      expect(healthResponse.status).toBe(200);
    });
  });
});
