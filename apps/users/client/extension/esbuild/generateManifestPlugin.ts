import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { PluginBuild } from 'esbuild';
import type { Icons, ManifestD } from 'generated/manifest';
import { z } from 'zod';

type ManifestSettings = { name: string; description: string; icons: Icons };

const packageJsonSchema = z.object({
  version: z.string(),
});

const getPackageVersion = async () => {
  const packageJson = packageJsonSchema.parse(await import('package.json'));
  return packageJson.version;
};

const generateManifest = async ({ name, description, icons }: ManifestSettings) => {
  const manifest: ManifestD = {
    manifest_version: 3,
    name,
    version: await getPackageVersion(),
    description,
    permissions: ['storage', 'readingList', 'bookmarks', 'tabs'],
    background: {
      service_worker: 'background/index.js',
      type: 'module',
    },
    action: {
      default_popup: 'popup.html',
    },
    icons,
  };

  return JSON.stringify(manifest, null, 2);
};

const writeManifest = async (outdir: string, manifestSettings: ManifestSettings) => {
  const manifestPath = join(outdir, 'manifest.json');
  await writeFile(manifestPath, await generateManifest(manifestSettings));

  console.info(`manifest.json has been generated at ${manifestPath}`);
};

export const generateManifestPlugin = (manifestSettings: ManifestSettings) => ({
  name: 'generate-manifest',

  setup(build: PluginBuild) {
    build.onEnd(async () => {
      if (!build.initialOptions.outdir) {
        throw new Error('outdir is not defined');
      }

      const { outdir } = build.initialOptions;

      await writeManifest(outdir, manifestSettings);
    });
  },
});
