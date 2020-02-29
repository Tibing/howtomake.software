const { articlePlugin } = require('./plugins/article');

exports.config = {
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
