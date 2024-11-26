export const domains = ['cores', 'managers', 'users'] as const;
export const environments = ['development', 'staging', 'production'] as const;
export const areas = ['bookmarks', 'feeds'] as const;
export const frameworks = ['hono', 'nestjs', 'react', 'commander'] as const;
export const packages = ['shared', 'db', 'auth', 'ui', 'validators', 'grpc'] as const;
export const architectures = ['serverless', 'container'] as const;
export const docs = ['readme', 'architectures', 'requirements'] as const;
export const roles = ['bff', 'client', 'service'] as const;
export const usages = ['read', 'write'] as const;
export const experiences = ['ci', 'cd', 'develop', 'docker'] as const;
export const tests = [
  'end-to-end',
  'unit',
  'integration',
  'visual-regression',
  'performance',
] as const;
export const services = ['analyzer', 'organizer', 'streamer', 'explorer', 'scheduler'] as const;
export const nonFunctionalItems = [
  'security',
  'performance',
  'reliability',
  'maintainability',
] as const;
export const tools = ['biome', 'github-actions', 'github-labels', 'typescript', 'vitest'] as const;
export const operations = ['monitoring', 'logging'] as const;

export const owner = 'TakashiAihara';
export const application = 'bokk';
