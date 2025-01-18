import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { BookmarkServiceDefinition } from '@packages/proto/bookmarks/v1';
import { createServer } from 'nice-grpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

const server = createServer();

server.add(BookmarkServiceDefinition, {
  async getBookmark() {
    return {};
  },
  async listBookmarks() {
    return {};
  },
  async createBookmark() {
    return {};
  },
});

server.listen('0.0.0.0:50051');
