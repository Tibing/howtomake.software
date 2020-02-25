const { MinifyHtml } = require('scully-minify-html');
require('reading-time');

const postRenderers = [ MinifyHtml ];

exports.config = {
  projectRoot: './src',
  projectName: 'poltoratsky',
  outDir: './dist/static',
  defaultPostRenderers: postRenderers,
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog'
      }
    },
  }
};
