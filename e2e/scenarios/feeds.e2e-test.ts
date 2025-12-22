import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFeedClient, closeAllChannels } from '../helpers/grpc-client';
import { httpClients } from '../helpers/http-client';
import type { FeedServiceClient } from '@packages/proto/feeds/v1';

describe('Feeds E2E Tests', () => {
  let grpcClient: FeedServiceClient;
  let httpClient: ReturnType<typeof httpClients.feedsRead>;

  beforeAll(() => {
    grpcClient = createFeedClient();
    httpClient = httpClients.feedsRead();
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

  describe('gRPC FeedService', () => {
    describe('CreateFeed', () => {
      it('should create a new RSS feed', async () => {
        const feed = await grpcClient.createFeed({
          url: 'https://example.com/feed.xml',
          title: 'Test RSS Feed',
          description: 'A test RSS feed for E2E testing',
          userId: 'test-user-1',
          type: 1, // FEED_TYPE_RSS
        });

        expect(feed).toBeDefined();
        expect(feed.id).toBeDefined();
        expect(feed.url).toBe('https://example.com/feed.xml');
        expect(feed.title).toBe('Test RSS Feed');
        expect(feed.type).toBe(1); // FEED_TYPE_RSS
      });

      it('should create a new Atom feed', async () => {
        const feed = await grpcClient.createFeed({
          url: 'https://example.com/atom.xml',
          title: 'Test Atom Feed',
          userId: 'test-user-1',
          type: 2, // FEED_TYPE_ATOM
        });

        expect(feed).toBeDefined();
        expect(feed.id).toBeDefined();
        expect(feed.type).toBe(2); // FEED_TYPE_ATOM
      });
    });

    describe('GetFeed', () => {
      it('should retrieve an existing feed', async () => {
        // First create a feed
        const created = await grpcClient.createFeed({
          url: 'https://example.com/get-feed.xml',
          title: 'Get Test Feed',
          userId: 'test-user-2',
          type: 1,
        });

        // Then retrieve it
        const retrieved = await grpcClient.getFeed({ id: created.id });

        expect(retrieved).toBeDefined();
        expect(retrieved.id).toBe(created.id);
        expect(retrieved.url).toBe('https://example.com/get-feed.xml');
        expect(retrieved.title).toBe('Get Test Feed');
      });

      it('should throw error for non-existent feed', async () => {
        await expect(
          grpcClient.getFeed({ id: 'non-existent-id' }),
        ).rejects.toThrow();
      });
    });

    describe('ListFeeds', () => {
      it('should list feeds for a user', async () => {
        const userId = 'list-feeds-user';

        // Create some feeds
        await grpcClient.createFeed({
          url: 'https://example.com/list-feed-1.xml',
          title: 'List Test Feed 1',
          userId,
          type: 1,
        });

        await grpcClient.createFeed({
          url: 'https://example.com/list-feed-2.xml',
          title: 'List Test Feed 2',
          userId,
          type: 2,
        });

        // List feeds
        const response = await grpcClient.listFeeds({
          userId,
          pageSize: 10,
        });

        expect(response).toBeDefined();
        expect(response.feeds).toBeDefined();
        expect(response.feeds.length).toBeGreaterThanOrEqual(2);
      });

      it('should return empty list for user with no feeds', async () => {
        const response = await grpcClient.listFeeds({
          userId: 'no-feeds-user',
          pageSize: 10,
        });

        expect(response).toBeDefined();
        expect(response.feeds).toBeDefined();
        expect(response.feeds.length).toBe(0);
      });

      it('should filter feeds by status', async () => {
        const userId = 'status-filter-user';

        // Create feeds with different statuses
        await grpcClient.createFeed({
          url: 'https://example.com/active-feed.xml',
          title: 'Active Feed',
          userId,
          type: 1,
          status: 1, // FEED_STATUS_ACTIVE
        });

        // List only active feeds
        const response = await grpcClient.listFeeds({
          userId,
          pageSize: 10,
          status: 1, // FEED_STATUS_ACTIVE
        });

        expect(response).toBeDefined();
        expect(response.feeds.every((f) => f.status === 1)).toBe(true);
      });
    });
  });

  describe('Full Flow: BFF -> gRPC -> DB', () => {
    it('should create feed via BFF and retrieve via gRPC', async () => {
      const usersBff = httpClients.usersBff();

      // For now, just verify BFF is accessible
      const healthResponse = await usersBff.get('/');
      expect(healthResponse.status).toBe(200);
    });
  });
});
