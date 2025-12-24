import type {
  IBookmarkRepository,
  ListBookmarksResult,
} from '@domain/interfaces/repositories/bookmark';
import { Bookmark } from '@domain/models/bookmark';
import { BookmarkTag } from '@domain/models/bookmark-tag';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookmarkService } from './bookmark';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let mockRepository: IBookmarkRepository;

  const sampleTag = BookmarkTag.create({
    id: 'tag-1',
    name: 'tech',
    userId: 'user-1',
  });

  const sampleBookmark = Bookmark.create({
    id: 'bm-1',
    url: 'https://example.com',
    title: 'Example',
    description: 'A sample bookmark',
    userId: 'user-1',
    tags: [sampleTag],
  });

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      findByUserId: vi.fn(),
    };
    service = new BookmarkService(mockRepository);
  });

  describe('getBookmark', () => {
    it('should return bookmark when found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(sampleBookmark);

      const result = await service.getBookmark({ id: 'bm-1' });

      expect(result).toBe(sampleBookmark);
      expect(mockRepository.findById).toHaveBeenCalledWith('bm-1');
    });

    it('should return null when not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      const result = await service.getBookmark({ id: 'non-existent' });

      expect(result).toBeNull();
    });
  });

  describe('listBookmarks', () => {
    it('should return bookmarks for user', async () => {
      const mockResult: ListBookmarksResult = {
        bookmarks: [sampleBookmark],
        totalCount: 1,
        nextPageToken: undefined,
      };
      vi.mocked(mockRepository.findByUserId).mockResolvedValue(mockResult);

      const result = await service.listBookmarks({
        userId: 'user-1',
        pageSize: 10,
      });

      expect(result.bookmarks).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(mockRepository.findByUserId).toHaveBeenCalledWith({
        userId: 'user-1',
        pageSize: 10,
        pageToken: undefined,
        tagIds: undefined,
      });
    });

    it('should pass pagination params to repository', async () => {
      const mockResult: ListBookmarksResult = {
        bookmarks: [],
        totalCount: 0,
        nextPageToken: undefined,
      };
      vi.mocked(mockRepository.findByUserId).mockResolvedValue(mockResult);

      await service.listBookmarks({
        userId: 'user-1',
        pageSize: 5,
        pageToken: '10',
        tagIds: ['tag-1', 'tag-2'],
      });

      expect(mockRepository.findByUserId).toHaveBeenCalledWith({
        userId: 'user-1',
        pageSize: 5,
        pageToken: '10',
        tagIds: ['tag-1', 'tag-2'],
      });
    });
  });
});
