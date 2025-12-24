import { AppModule } from '@/app.module';
import { BookmarkGrpcHandler } from '@presentation/grpc/bookmark.handler';
import { NestFactory } from '@nestjs/core';
import { BookmarkServiceDefinition } from '@packages/proto/bookmarks/v1';
import { createServer } from 'nice-grpc';

const HTTP_PORT = process.env.HTTP_PORT ?? 3000;
const GRPC_PORT = process.env.GRPC_PORT ?? 50051;

async function bootstrap() {
  // Create NestJS application
  const app = await NestFactory.create(AppModule);

  // Get the gRPC handler from NestJS DI container
  const bookmarkHandler = app.get(BookmarkGrpcHandler);

  // Create and start gRPC server
  const grpcServer = createServer();
  grpcServer.add(BookmarkServiceDefinition, bookmarkHandler);

  await grpcServer.listen(`0.0.0.0:${GRPC_PORT}`);
  console.log(`gRPC server is running on port ${GRPC_PORT}`);

  // Start HTTP server
  await app.listen(HTTP_PORT);
  console.log(`HTTP server is running on port ${HTTP_PORT}`);
}

bootstrap();
