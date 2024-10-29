import swc from 'unplugin-swc';
import { mergeConfig } from 'vitest/config';
import { baseConfig as base, integrationConfig as integration } from "../../vitest.config.mjs"

export const baseConfig = mergeConfig(base,{ plugins: [
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
}
)

export const integrationConfig = mergeConfig(
  baseConfig,
  integration,
);

export default baseConfig;
