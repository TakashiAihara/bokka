import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { listRemotes } from 'isomorphic-git';
import * as fs from 'node:fs';
import parseGithubUrl from 'parse-github-url';

export const getWorkspaceRoot = async () => {
  const workspaceRoot = await findWorkspaceDir(process.cwd());

  if (!workspaceRoot) {
    throw new Error('Workspace root could not be found.');
  }
  return workspaceRoot;
};

export const parseRepoInfo = (remoteUrl: string): { owner: string; repo: string } => {
  const { owner, name } = parseGithubUrl(remoteUrl) ?? {};

  if (owner && name) {
    return {
      owner,
      repo: name,
    };
  }

  throw new Error('Failed to parse remote repository URL.');
};

export const getRepoInfo = async (): Promise<{ owner: string; repo: string }> => {
  const dir = await getWorkspaceRoot();

  try {
    const remotes = await listRemotes({ fs, dir });

    const originRemote = remotes.find((remote) => remote.remote === 'origin');

    if (!originRemote) {
      throw new Error('Remote "origin" could not be found.');
    }

    const remoteUrl = originRemote.url;

    const { owner, repo } = parseRepoInfo(remoteUrl);

    return { owner, repo };
  } catch (error) {
    throw new Error(`An error occurred while retrieving repository information: ${error}`);
  }
};
