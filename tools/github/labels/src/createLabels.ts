import { Octokit } from '@octokit/rest';
import { RequestError } from 'octokit';
import { env } from './env';
import { settings } from './settings';
import { getRepoInfo } from './utils';

async function getAuthenticatedOctokit(): Promise<Octokit> {
  const { GITHUB_TOKEN: token } = env;

  if (!token) {
    throw new Error('GITHUB_TOKEN is not set in the environment variables');
  }

  return new Octokit({ auth: token });
}

async function createLabel(
  octokit: Octokit,
  owner: string,
  repo: string,
  name: string,
  color: string,
  description?: string,
) {
  try {
    await octokit.issues.createLabel({
      owner,
      repo,
      name,
      color,
      description: description ?? '',
    });
    console.log(`Created label: ${name}`);
  } catch (error: unknown) {
    if (error instanceof RequestError && error.status === 422) {
      console.log(`Label ${name} already exists. Updating...`);
      await octokit.issues.updateLabel({
        owner,
        repo,
        name,
        color,
        description: description ?? '',
      });
      console.log(`Updated label: ${name}`);
    } else {
      console.error(`Error creating/updating label ${name}:`, error);
    }
  }
}

async function createLabels() {
  const octokit = await getAuthenticatedOctokit();
  const { owner, repo } = await getRepoInfo();

  for (const [name, config] of Object.entries(settings.labelConfigs)) {
    await createLabel(octokit, owner, repo, name, config.color, config.description);
  }
}

createLabels()
  .catch((error) => {
    console.error('Error creating labels:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Finished');
    process.exit(0);
  });
