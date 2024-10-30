import type { Route as BffRoute } from '@users/bff-cli';
import { Command } from 'commander';
import { hc } from 'hono/client';

const client = hc<BffRoute>('http://localhost:3000/');
const program = new Command();

program
  .action(async () => {
    try {
      const res = await client.index.$get();
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  })
  .parse();
