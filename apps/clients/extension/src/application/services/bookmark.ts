import type { Bookmark } from '@/domain/entities/bookmark';
import type { IBookmarkRepository } from '@/domain/repositories/bookmark';
import { SYMBOLS } from '@/symbols';
import { inject, injectable } from 'inversify';

export interface IBookmarkService {
  getBookmarks(): Promise<Bookmark[]>;
}

@injectable()
export class BookmarkService implements IBookmarkService {
  constructor(
    @inject(SYMBOLS.IBookmarkRepository) private bookmarkRepository: IBookmarkRepository,
  ) {}

  async getBookmarks(): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks();
  }
}
