import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';
import esbuild from 'esbuild';
import { copyFilesPlugin } from './esbuild/copyFilesPlugin';
import { generateIconsPlugin } from './esbuild/generateIconsPlugin';
import { generateManifestPlugin } from './esbuild/generateManifestPlugin';

const outdir = 'dist';
const entryPoints = ['src/presentation/background/index.ts', 'src/presentation/popup/index.tsx'];

esbuild
  .build({
    entryPoints,
    bundle: true,
    outdir,
    // platform: 'browser',
    target: 'es2020',
    format: 'esm',
    // loader: {
    //   '.ts': 'ts',
    //   '.tsx': 'tsx'
    // },
    // define: {
    //   'process.env.NODE_ENV': '"production"',
    // },
    plugins: [
      typecheckPlugin(),
      generateIconsPlugin({
        iconPath: 'src/static/icon.png',
        outdir: 'dist/icons',
      }),
      copyFilesPlugin({
        files: ['src/static/popup.html'],
      }),
      generateManifestPlugin({
        name: 'Reading List',
        description: 'A simple reading list extension',
        icons: {
          '16': 'icons/icon-16.png',
          '48': 'icons/icon-48.png',
          '128': 'icons/icon-128.png',
          '256': 'icons/icon-256.png',
        },
      }),
    ],
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV !== 'production',
    jsx: 'automatic',
    alias: {
      '@': './src',
      '@domain': './src/domain',
      '@application': './src/application',
      '@presentation': './src/presentation',
      '@infrastructure': './src/infrastructure',
    },
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
