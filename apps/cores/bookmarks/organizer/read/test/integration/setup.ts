import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const COMPOSE_FILE = 'docker-compose.test.yaml';
const SERVICE_NAME = 'bookmarks-organizer-read';
const GRPC_PORT = 50151;
const HTTP_PORT = 13100;
const MAX_RETRIES = 30;
const RETRY_DELAY = 2000;

async function waitForService(): Promise<void> {
  console.log('Waiting for service to be ready...');

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      // Check HTTP endpoint
      const response = await fetch(`http://localhost:${HTTP_PORT}`);
      if (response.ok) {
        console.log(`Service is ready after ${i + 1} attempts`);
        return;
      }
    } catch {
      // Service not ready yet
    }

    console.log(`Waiting for service... (${i + 1}/${MAX_RETRIES})`);
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
  }

  throw new Error('Service did not become ready in time');
}

export async function setup(): Promise<void> {
  console.log('Starting integration test environment...');

  try {
    // Build and start the service
    console.log('Building and starting Docker Compose...');
    await execAsync(`docker compose -f ${COMPOSE_FILE} up -d --build`, {
      cwd: process.cwd(),
      timeout: 180000, // 3 minutes for build
    });

    // Wait for service to be ready
    await waitForService();

    console.log('Integration test environment is ready!');
    console.log(`  HTTP: http://localhost:${HTTP_PORT}`);
    console.log(`  gRPC: localhost:${GRPC_PORT}`);
  } catch (error) {
    console.error('Failed to start integration test environment:', error);

    // Show logs for debugging
    try {
      const { stdout } = await execAsync(
        `docker compose -f ${COMPOSE_FILE} logs --tail=100`,
        { cwd: process.cwd() },
      );
      console.log('Service logs:\n', stdout);
    } catch {
      // Ignore log errors
    }

    throw error;
  }
}

export async function teardown(): Promise<void> {
  console.log('Stopping integration test environment...');

  try {
    await execAsync(
      `docker compose -f ${COMPOSE_FILE} down -v --remove-orphans`,
      { cwd: process.cwd() },
    );
    console.log('Integration test environment stopped.');
  } catch (error) {
    console.error('Failed to stop integration test environment:', error);
  }
}
