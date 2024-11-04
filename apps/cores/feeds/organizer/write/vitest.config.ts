import { baseConfig } from '@tools/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export const serverConfig = defineConfig({
  test: {
    alias: {
      '@': '/src',
      '@domain': '/src/domain',
      '@application': '/src/application',
      '@presentation': '/src/presentation',
      '@infrastructure': '/src/infrastructure',
    },
  },
});

export default mergeConfig(baseConfig, serverConfig);
