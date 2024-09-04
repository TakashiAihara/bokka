import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { PluginBuild } from 'esbuild';
import type { Icons } from 'generated/manifest';
import sharp from 'sharp';
import { z } from 'zod';

const iconSizes = ['16', '48', '128', '256'] as const;

const generateIcon = async (
  iconPath: string,
  outputDir: string,
  size: keyof Icons,
): Promise<void> => {
  const outputPath = join(outputDir, `icon-${size}.png`);

  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const parsedSize = z.coerce.number().parse(size);

  await sharp(iconPath).resize(parsedSize, parsedSize).toFile(outputPath);
};

export const generateIconsPlugin = ({
  iconPath,
  outdir,
}: {
  iconPath: string;
  outdir: string;
}) => ({
  name: 'generate-icons',

  setup(build: PluginBuild) {
    build.onEnd(async () => {
      for (const size of iconSizes) {
        await generateIcon(iconPath, outdir, size);
      }
    });
  },
});
