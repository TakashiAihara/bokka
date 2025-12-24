import { describe, expect, it } from 'vitest';

const HTTP_HOST = process.env.HTTP_HOST ?? 'localhost';
const HTTP_PORT = process.env.HTTP_PORT ?? '13000';

describe('HTTP Integration Tests', () => {
  const baseUrl = `http://${HTTP_HOST}:${HTTP_PORT}`;

  describe('Health Check', () => {
    it('should return 200 on root endpoint', async () => {
      const response = await fetch(baseUrl);

      expect(response.status).toBe(200);
    });

    it('should return Hello World! message', async () => {
      const response = await fetch(baseUrl);
      const text = await response.text();

      expect(text).toBe('Hello World!');
    });
  });
});
