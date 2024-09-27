import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import type { PluginBuild } from 'esbuild';

export const copyFilesPlugin = ({ files }: { files: string[] }) => ({
  name: 'copy-files',
  setup(build: PluginBuild) {
    build.onEnd(async () => {
      if (!build.initialOptions.outdir) {
        throw new Error('outdir is not defined');
      }

      if (!existsSync(build.initialOptions.outdir)) {
        await mkdir(build.initialOptions.outdir, { recursive: true });
      }

      const { outdir } = build.initialOptions;

      for (const fromPath of files) {
        const fileName = basename(fromPath);
        const toPath = join(outdir, fileName);

        await copyFile(fromPath, toPath);
        console.info(`Copied ${fromPath} to ${toPath}`);
      }
    });
  },
});
