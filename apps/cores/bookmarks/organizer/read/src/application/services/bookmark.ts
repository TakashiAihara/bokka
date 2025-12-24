import {
  IBookmarkRepository,
  type ListBookmarksParams as RepoListParams,
} from '@domain/interfaces/repositories/bookmark';
import type { Bookmark } from '@domain/models/bookmark';
import { Inject, Injectable } from '@nestjs/common';
import type {
  GetBookmarkParams,
  IBookmarkService,
  ListBookmarksParams,
  ListBookmarksResult,
} from './interfaces/bookmark';

@Injectable()
export class BookmarkService implements IBookmarkService {
  constructor(
    @Inject(IBookmarkRepository)
    private readonly bookmarkRepository: IBookmarkRepository,
  ) {}

  async getBookmark(params: GetBookmarkParams): Promise<Bookmark | null> {
    return this.bookmarkRepository.findById(params.id);
  }

  async listBookmarks(params: ListBookmarksParams): Promise<ListBookmarksResult> {
    const repoParams: RepoListParams = {
      userId: params.userId,
      pageSize: params.pageSize,
      pageToken: params.pageToken,
      tagIds: params.tagIds,
    };

    return this.bookmarkRepository.findByUserId(repoParams);
  }
}
