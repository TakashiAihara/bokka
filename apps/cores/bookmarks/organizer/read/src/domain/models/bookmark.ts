import type { BookmarkTag } from './bookmark-tag';

export class Bookmark {
  constructor(
    private readonly _id: string,
    private readonly _url: string,
    private readonly _title: string,
    private readonly _userId: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
    private readonly _description?: string,
    private readonly _tags: BookmarkTag[] = [],
  ) {}

  get id(): string {
    return this._id;
  }

  get url(): string {
    return this._url;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get tags(): readonly BookmarkTag[] {
    return this._tags;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(params: {
    id: string;
    url: string;
    title: string;
    userId: string;
    description?: string;
    tags?: BookmarkTag[];
    createdAt?: Date;
    updatedAt?: Date;
  }): Bookmark {
    const now = new Date();
    return new Bookmark(
      params.id,
      params.url,
      params.title,
      params.userId,
      params.createdAt ?? now,
      params.updatedAt ?? now,
      params.description,
      params.tags ?? [],
    );
  }
}
