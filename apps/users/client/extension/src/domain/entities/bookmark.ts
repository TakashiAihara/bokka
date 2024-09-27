export type BookmarkId = string;

export type Bookmark = {
  id: BookmarkId;
  title: string;
  url: string;
};

export type BookmarkFolder = {
  id: BookmarkId;
  title: string;
  children: (Bookmark | BookmarkFolder)[];
};

export type BookmarkTree = BookmarkFolder[];

export type ReadingListItem = Bookmark;
