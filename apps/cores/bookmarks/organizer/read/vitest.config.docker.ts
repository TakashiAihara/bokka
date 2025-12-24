import { defineConfig, mergeConfig } from 'vitest/config';
import { serverConfig } from './vitest.config';

export default mergeConfig(
  serverConfig,
  defineConfig({
    server: {
      deps: {
        // Inline these packages to avoid pnpm symlink issues
        inline: [/@grpc/, /@bufbuild/],
      },
    },
    test: {
      // Use forks pool for better native module support
      pool: 'forks',
      // Ensure deps are handled correctly
      deps: {
        optimizer: {
          ssr: {
            include: ['@grpc/grpc-js', '@grpc/proto-loader'],
          },
        },
      },
      include: ['test/integration/**/*.docker-test.ts'],
      globals: true,
      environment: 'node',
      testTimeout: 30000,
      hookTimeout: 60000,
      globalSetup: './test/integration/setup.ts',
      env: {
        NODE_ENV: 'test',
        GRPC_HOST: 'localhost',
        GRPC_PORT: '50151',
        HTTP_HOST: 'localhost',
        HTTP_PORT: '13100',
      },
    },
  }),
);
