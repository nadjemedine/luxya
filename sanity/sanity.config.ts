import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { sanityConfig } from './config';

export default defineConfig({
  ...sanityConfig,
  name: 'luxya-boutique',
  title: 'Luxya Boutique',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
