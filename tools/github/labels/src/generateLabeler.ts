import { dump } from 'js-yaml';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { settings } from './settings';
import { getWorkspaceRoot } from './utils';

const generateLabelerYml = async () => {
  const workspaceRoot = await getWorkspaceRoot();
  const outputPath = resolve(workspaceRoot, '.github', 'labeler.yml');

  const { pathConfigs } = settings;

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, dump(pathConfigs), 'utf8');
};

generateLabelerYml()
  .catch((error) => {
    console.error('Error generating labeler.yml:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Labeler configuration has been generated successfully');
    process.exit(0);
  });
