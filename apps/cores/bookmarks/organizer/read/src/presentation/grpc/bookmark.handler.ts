import { IBookmarkService } from '@application/services/interfaces/bookmark';
import type { Bookmark as DomainBookmark } from '@domain/models/bookmark';
import type { BookmarkTag as DomainBookmarkTag } from '@domain/models/bookmark-tag';
import { Inject, Injectable } from '@nestjs/common';
import type {
  Bookmark as ProtoBookmark,
  BookmarkServiceImplementation,
  BookmarkTag as ProtoBookmarkTag,
  GetBookmarkRequest,
  ListBookmarksRequest,
  ListBookmarksResponse,
} from '@packages/proto/bookmarks/v1';
import type { CallContext } from 'nice-grpc-common';

@Injectable()
export class BookmarkGrpcHandler implements BookmarkServiceImplementation {
  constructor(
    @Inject(IBookmarkService)
    private readonly bookmarkService: IBookmarkService,
  ) {}

  async getBookmark(
    request: GetBookmarkRequest,
    _context: CallContext,
  ): Promise<ProtoBookmark> {
    const bookmark = await this.bookmarkService.getBookmark({ id: request.id });

    if (!bookmark) {
      throw new Error(`Bookmark not found: ${request.id}`);
    }

    return this.toProtoBookmark(bookmark);
  }

  async listBookmarks(
    request: ListBookmarksRequest,
    _context: CallContext,
  ): Promise<ListBookmarksResponse> {
    const result = await this.bookmarkService.listBookmarks({
      userId: request.userId,
      pageSize: request.pageSize,
      pageToken: request.pageToken || undefined,
      tagIds: request.tagIds.length > 0 ? [...request.tagIds] : undefined,
    });

    return {
      $type: 'bookmarks.v1.ListBookmarksResponse',
      bookmarks: result.bookmarks.map((b) => this.toProtoBookmark(b)),
      nextPageToken: result.nextPageToken ?? '',
      totalCount: result.totalCount,
    };
  }

  async createBookmark(): Promise<ProtoBookmark> {
    // Read service does not support create
    throw new Error('CreateBookmark is not supported by Read service');
  }

  private toProtoBookmark(domain: DomainBookmark): ProtoBookmark {
    return {
      $type: 'bookmarks.v1.Bookmark',
      id: domain.id,
      url: domain.url,
      title: domain.title,
      description: domain.description,
      tags: domain.tags.map((t) => this.toProtoBookmarkTag(t)),
      userId: domain.userId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  private toProtoBookmarkTag(domain: DomainBookmarkTag): ProtoBookmarkTag {
    return {
      $type: 'bookmarks.v1.BookmarkTag',
      id: domain.id,
      name: domain.name,
      userId: domain.userId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
