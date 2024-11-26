import { application, owner } from '@packages/shared';
import { getRepoInfo, getWorkspaceRoot, parseRepoInfo } from './utils';

describe('getRepoInfo', () => {
  describe('Given a repository with an origin remote', () => {
    describe('When calling getRepoInfo', () => {
      it('Then should return the owner and repo', async () => {
        await expect(getRepoInfo()).resolves.toEqual({ owner, repo: application });
      });
    });
  });
});

describe('getWorkspaceRoot', () => {
  describe('Given a workspace root', () => {
    describe('When calling getWorkspaceRoot', () => {
      it('Then should return the workspace root', async () => {
        const path = await getWorkspaceRoot();
        const pathArray = path.split('/');

        expect(pathArray[pathArray.length - 1]).toBe(application);
        expect(pathArray[pathArray.length - 2]).toBe(owner);
      });
    });
  });
});

describe('parseRepoInfo', () => {
  describe('Given a repository with an origin remote', () => {
    describe('When calling with http url', () => {
      it('Then should return the owner and repo', async () => {
        expect(parseRepoInfo('https://github.com/foo/bar.git')).toEqual({
          owner: 'foo',
          repo: 'bar',
        });
      });
    });

    describe('When calling with ssh url', () => {
      it('Then should return the owner and repo', async () => {
        expect(parseRepoInfo('git@github.com:foo/bar.git')).toEqual({
          owner: 'foo',
          repo: 'bar',
        });
      });
    });
  });
});
