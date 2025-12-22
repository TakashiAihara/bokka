import { createChannel, createClient, type Channel } from 'nice-grpc';
import {
  BookmarkServiceDefinition,
  type BookmarkServiceClient,
} from '@packages/proto/bookmarks/v1';
import {
  FeedServiceDefinition,
  type FeedServiceClient,
} from '@packages/proto/feeds/v1';

// Default E2E test endpoints
const E2E_ENDPOINTS = {
  bookmarks: process.env.BOOKMARKS_GRPC_ENDPOINT ?? 'localhost:50051',
  feeds: process.env.FEEDS_GRPC_ENDPOINT ?? 'localhost:50052',
} as const;

// Channel cache for reuse
const channels = new Map<string, Channel>();

function getChannel(endpoint: string): Channel {
  let channel = channels.get(endpoint);
  if (!channel) {
    channel = createChannel(endpoint);
    channels.set(endpoint, channel);
  }
  return channel;
}

/**
 * Create a BookmarkService gRPC client for E2E testing
 */
export function createBookmarkClient(
  endpoint: string = E2E_ENDPOINTS.bookmarks,
): BookmarkServiceClient {
  const channel = getChannel(endpoint);
  return createClient(BookmarkServiceDefinition, channel);
}

/**
 * Create a FeedService gRPC client for E2E testing
 */
export function createFeedClient(
  endpoint: string = E2E_ENDPOINTS.feeds,
): FeedServiceClient {
  const channel = getChannel(endpoint);
  return createClient(FeedServiceDefinition, channel);
}

/**
 * Close all gRPC channels
 * Call this in afterAll() to clean up resources
 */
export async function closeAllChannels(): Promise<void> {
  for (const channel of channels.values()) {
    channel.close();
  }
  channels.clear();
}

export { E2E_ENDPOINTS };
