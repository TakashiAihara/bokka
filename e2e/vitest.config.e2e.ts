import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['e2e/**/*.e2e-test.ts'],
    globals: true,
    environment: 'node',
    testTimeout: 60000,
    hookTimeout: 120000,
    globalSetup: './e2e/setup.ts',
    setupFiles: ['./e2e/helpers/test-setup.ts'],
    env: {
      NODE_ENV: 'test',
    },
  },
  resolve: {
    alias: {
      '@packages/proto': '/packages/proto/gen/ts',
    },
  },
});
