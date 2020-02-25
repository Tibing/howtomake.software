exports.config = {
  projectRoot: "./src",
  projectName: "poltoratsky",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};