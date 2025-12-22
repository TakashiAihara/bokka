// E2E Test Setup
// This file runs before each test file

import { beforeAll, afterAll } from 'vitest';

// Global test configuration
beforeAll(async () => {
  // Wait a bit for services to be fully ready
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

afterAll(async () => {
  // Cleanup after tests if needed
});
