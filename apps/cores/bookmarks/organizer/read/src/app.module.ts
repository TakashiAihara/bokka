import { BookmarkService } from '@application/services/bookmark';
import { GreetingService } from '@application/services/greeting';
import { IBookmarkService } from '@application/services/interfaces/bookmark';
import { IGreetingService } from '@application/services/interfaces/greeting';
import { IBookmarkRepository } from '@domain/interfaces/repositories/bookmark';
import { IGreetingRepository } from '@domain/interfaces/repositories/greeting';
import { InMemoryBookmarkRepository } from '@infrastructure/repositories/bookmark';
import { GreetingRepository } from '@infrastructure/repositories/greeting';
import { Module } from '@nestjs/common';
import { AppController } from '@presentation/controllers/app';
import { BookmarkGrpcHandler } from '@presentation/grpc/bookmark.handler';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    // Greeting (existing sample)
    {
      provide: IGreetingService,
      useClass: GreetingService,
    },
    {
      provide: IGreetingRepository,
      useClass: GreetingRepository,
    },
    // Bookmark
    {
      provide: IBookmarkService,
      useClass: BookmarkService,
    },
    {
      provide: IBookmarkRepository,
      useClass: InMemoryBookmarkRepository,
    },
    // gRPC Handler
    BookmarkGrpcHandler,
  ],
})
export class AppModule {}
