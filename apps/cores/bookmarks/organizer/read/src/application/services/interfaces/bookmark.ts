import type { Bookmark } from '@domain/models/bookmark';

export interface GetBookmarkParams {
  id: string;
}

export interface ListBookmarksParams {
  userId: string;
  pageSize: number;
  pageToken?: string;
  tagIds?: string[];
}

export interface ListBookmarksResult {
  bookmarks: Bookmark[];
  nextPageToken?: string;
  totalCount: number;
}

export interface IBookmarkService {
  getBookmark(params: GetBookmarkParams): Promise<Bookmark | null>;
  listBookmarks(params: ListBookmarksParams): Promise<ListBookmarksResult>;
}

export const IBookmarkService = Symbol('IBookmarkService');
