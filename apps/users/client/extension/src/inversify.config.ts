import 'reflect-metadata';

import type { IBookmarkRepository } from '@/domain/repositories/bookmark';
import { ChromeBookmarkRepository } from '@/infrastructure/repositories/chrome';
import { Container } from 'inversify';
import { BookmarkService, type IBookmarkService } from './application/services/bookmark';
import { SYMBOLS } from './symbols';

const container = new Container();
container.bind<IBookmarkRepository>(SYMBOLS.IBookmarkRepository).to(ChromeBookmarkRepository);
container.bind<IBookmarkService>(SYMBOLS.IBookmarkService).to(BookmarkService);

export { container };
