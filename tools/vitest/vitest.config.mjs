import { defineConfig, mergeConfig } from 'vitest/config';

export const baseConfig = defineConfig({
  test: {
    globals: true,
    root: './',
    watch: false,
  },
});

export const integrationConfig = mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ['test/**/*.integration-test.ts'],
      globals: true,
      environment: 'node',
      testTimeout: 20000,
      env: {
        NODE_ENV: 'test',
      },
    },
  }),
);

export default baseConfig;
