export class BookmarkTag {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _userId: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
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
    name: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): BookmarkTag {
    const now = new Date();
    return new BookmarkTag(
      params.id,
      params.name,
      params.userId,
      params.createdAt ?? now,
      params.updatedAt ?? now,
    );
  }
}
