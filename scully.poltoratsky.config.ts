import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
const { articlePlugin } = require('./plugins/article');

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'poltoratsky',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: articlePlugin,
      slug: {
        folder: './blog'
      },
      postRenderers: [docLink],
    },
  },
};
