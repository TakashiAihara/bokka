import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/clients/extension/vitest.config.ts",
  "./apps/servers/main/vitest.config.ts"
])
