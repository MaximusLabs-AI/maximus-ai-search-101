import { defineCliConfig } from 'sanity/cli'

// Used by the `sanity` CLI (dataset import/export, schema deploy, etc.).
export default defineCliConfig({
  api: {
    projectId: 'bict0s25',
    dataset: 'production',
  },
  autoUpdates: true,
})
