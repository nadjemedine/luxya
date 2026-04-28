import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { sanityConfig } from './config';
import { structure } from './structure';

export default defineConfig({
  ...sanityConfig,
  name: 'luxya-boutique',
  title: 'Luxya Boutique',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
