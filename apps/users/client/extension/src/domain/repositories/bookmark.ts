import type { Bookmark } from '@/domain/entities/bookmark';

export interface IBookmarkRepository {
  getBookmarks(): Promise<Bookmark[]>;
}
