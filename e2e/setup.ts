import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const COMPOSE_FILE = 'docker-compose.e2e.yaml';
const STARTUP_TIMEOUT = 120000; // 2 minutes

async function waitForServices(): Promise<void> {
  const maxAttempts = 30;
  const delay = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Check if all services are healthy
      const { stdout } = await execAsync(
        `docker compose -f ${COMPOSE_FILE} ps --format json`,
      );

      const services = stdout
        .trim()
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line));

      const allHealthy = services.every(
        (service: { State: string; Health?: string }) =>
          service.State === 'running' &&
          (service.Health === 'healthy' || service.Health === undefined),
      );

      if (allHealthy && services.length > 0) {
        console.log('All services are healthy!');
        return;
      }

      console.log(
        `Waiting for services... (attempt ${attempt}/${maxAttempts})`,
      );
    } catch {
      console.log(`Health check failed, retrying... (attempt ${attempt}/${maxAttempts})`);
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error('Services did not become healthy in time');
}

export async function setup(): Promise<void> {
  console.log('Starting E2E test environment...');

  try {
    // Build and start services
    console.log('Building and starting Docker Compose services...');
    await execAsync(`docker compose -f ${COMPOSE_FILE} up -d --build --wait`, {
      timeout: STARTUP_TIMEOUT,
    });

    // Wait for all services to be healthy
    await waitForServices();

    console.log('E2E environment is ready!');
  } catch (error) {
    console.error('Failed to start E2E environment:', error);

    // Show logs for debugging
    try {
      const { stdout } = await execAsync(
        `docker compose -f ${COMPOSE_FILE} logs --tail=50`,
      );
      console.log('Service logs:\n', stdout);
    } catch {
      // Ignore log errors
    }

    throw error;
  }
}

export async function teardown(): Promise<void> {
  console.log('Stopping E2E test environment...');

  try {
    await execAsync(`docker compose -f ${COMPOSE_FILE} down -v --remove-orphans`);
    console.log('E2E environment stopped.');
  } catch (error) {
    console.error('Failed to stop E2E environment:', error);
  }
}
