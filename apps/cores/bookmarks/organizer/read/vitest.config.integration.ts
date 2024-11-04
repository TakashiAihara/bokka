import { integrationConfig } from '@tools/vitest';
import { mergeConfig } from 'vitest/config';
import { serverConfig } from './vitest.config';

export default mergeConfig(serverConfig, integrationConfig);
