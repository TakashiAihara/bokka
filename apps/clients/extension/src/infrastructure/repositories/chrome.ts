import type { Bookmark } from '@/domain/entities/bookmark';
import type { IBookmarkRepository } from '@/domain/repositories/bookmark';
import { injectable } from 'inversify';

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

const { bookmarks } = chrome;
const { getTree } = bookmarks;

@injectable()
export class ChromeBookmarkRepository implements IBookmarkRepository {
  async getBookmarks(): Promise<Bookmark[]> {
    return new Promise((resolve) => {
      getTree((bookmarkTreeNodes) => {
        const bookmarks = this.flattenBookmarkTree(bookmarkTreeNodes);
        resolve(bookmarks);
      });
    });
  }

  private flattenBookmarkTree(nodes: BookmarkTreeNode[]): Bookmark[] {
    const bookmarks: Bookmark[] = [];

    const traverse = (node: BookmarkTreeNode) => {
      if (node.url) {
        bookmarks.push({
          id: node.id,
          title: node.title,
          url: node.url,
        });
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
    return bookmarks;
  }
}
