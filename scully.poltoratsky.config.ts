import { ScullyConfig } from '@scullyio/scully';
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
    },
  },
};
