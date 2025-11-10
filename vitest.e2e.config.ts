import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/.git/**'],
    include: ['tests/e2e/**/*.e2e.test.ts'],
    globals: true,
    globalSetup: ['./tests/e2e/config/global-config.ts'],
    fileParallelism: false,
    pool: 'forks',
    testTimeout: 100 * 100 * 6,
    hookTimeout: 100 * 100 * 6,
  },
})
