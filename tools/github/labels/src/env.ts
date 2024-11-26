import { z } from 'zod';

const GithubSchema = z.object({
  GITHUB_TOKEN: z.string(),
});

export const env = GithubSchema.parse(process.env);
