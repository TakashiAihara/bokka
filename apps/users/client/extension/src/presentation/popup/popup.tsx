import type { IBookmarkService } from '@/application/services/bookmark';
import type { Bookmark } from '@/domain/entities/bookmark';
import { container } from '@/inversify.config';
import { SYMBOLS } from '@/symbols';
import { useEffect, useState } from 'react';

export const Popup = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const bookmarkService = container.get<IBookmarkService>(SYMBOLS.IBookmarkService);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const fetchedBookmarks = await bookmarkService.getBookmarks();
      setBookmarks(fetchedBookmarks);
    };
    fetchBookmarks();
  }, [bookmarkService]);

  return (
    <div>
      <h1>Bookmarks</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.title}</li>
        ))}
      </ul>
    </div>
  );
};
