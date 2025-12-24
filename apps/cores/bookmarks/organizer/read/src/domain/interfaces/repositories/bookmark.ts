import type { Bookmark } from '@domain/models/bookmark';

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

export interface IBookmarkRepository {
  findById(id: string): Promise<Bookmark | null>;
  findByUserId(params: ListBookmarksParams): Promise<ListBookmarksResult>;
}

export const IBookmarkRepository = Symbol('IBookmarkRepository');
