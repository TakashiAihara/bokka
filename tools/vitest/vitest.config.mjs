import swc from 'unplugin-swc';
import { defineConfig, mergeConfig } from 'vitest/config';

export const baseConfig = defineConfig({
  test: {
    globals: true,
    root: './',
    watch: false,
  },
  plugins: [
    swc.vite({
      configFile: '.test.swcrc',
      isModule: true,
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          dynamicImport: true,
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
          react: {
            runtime: 'automatic',
          },
        },
        target: 'esnext',
        loose: false,
      },
      module: { type: 'es6' },
    }),
  ],
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
