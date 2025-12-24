import type {
  IBookmarkRepository,
  ListBookmarksParams,
  ListBookmarksResult,
} from '@domain/interfaces/repositories/bookmark';
import { Bookmark } from '@domain/models/bookmark';
import { BookmarkTag } from '@domain/models/bookmark-tag';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryBookmarkRepository implements IBookmarkRepository {
  private readonly bookmarks: Map<string, Bookmark> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    const sampleBookmarks = [
      Bookmark.create({
        id: 'bm-1',
        url: 'https://example.com/article1',
        title: 'Sample Article 1',
        description: 'This is a sample bookmark',
        userId: 'user-1',
        tags: [
          BookmarkTag.create({
            id: 'tag-1',
            name: 'tech',
            userId: 'user-1',
          }),
        ],
      }),
      Bookmark.create({
        id: 'bm-2',
        url: 'https://example.com/article2',
        title: 'Sample Article 2',
        userId: 'user-1',
      }),
      Bookmark.create({
        id: 'bm-3',
        url: 'https://example.com/article3',
        title: 'Another User Article',
        userId: 'user-2',
      }),
    ];

    for (const bookmark of sampleBookmarks) {
      this.bookmarks.set(bookmark.id, bookmark);
    }
  }

  async findById(id: string): Promise<Bookmark | null> {
    return this.bookmarks.get(id) ?? null;
  }

  async findByUserId(params: ListBookmarksParams): Promise<ListBookmarksResult> {
    let bookmarks = Array.from(this.bookmarks.values()).filter(
      (b) => b.userId === params.userId,
    );

    // Filter by tags if provided
    if (params.tagIds && params.tagIds.length > 0) {
      bookmarks = bookmarks.filter((b) =>
        b.tags.some((tag) => params.tagIds?.includes(tag.id)),
      );
    }

    const totalCount = bookmarks.length;

    // Handle pagination
    let startIndex = 0;
    if (params.pageToken) {
      startIndex = Number.parseInt(params.pageToken, 10) || 0;
    }

    const pageSize = params.pageSize || 10;
    const paginatedBookmarks = bookmarks.slice(startIndex, startIndex + pageSize);

    const hasMore = startIndex + pageSize < totalCount;
    const nextPageToken = hasMore ? String(startIndex + pageSize) : undefined;

    return {
      bookmarks: paginatedBookmarks,
      nextPageToken,
      totalCount,
    };
  }

  // Helper method for testing - add a bookmark
  addBookmark(bookmark: Bookmark): void {
    this.bookmarks.set(bookmark.id, bookmark);
  }

  // Helper method for testing - clear all bookmarks
  clear(): void {
    this.bookmarks.clear();
  }
}
