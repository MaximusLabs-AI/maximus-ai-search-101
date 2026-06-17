import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'AI Search 101',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/ai-search-101/studio', // Next basePath (/ai-search-101) + the /studio route
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
