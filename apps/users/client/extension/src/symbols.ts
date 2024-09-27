export const SYMBOLS = {
  IBookmarkService: Symbol('IBookmarkService'),
  IBookmarkRepository: Symbol('IBookmarkRepository'),
} as const;

export type SYMBOLS = typeof SYMBOLS;
