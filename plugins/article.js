const { contentRenderPlugin } = require('@scullyio/scully/renderPlugins/contentRenderPlugin');
const { contentFolderPlugin } = require('@scullyio/scully/routerPlugins/contentFolderPlugin');
const { registerPlugin } = require('@scullyio/scully');
const { readFileSync } = require('fs');
const readingTime = require('reading-time');

const ARTICLE_PLUGIN_NAME = 'articlePlugin';

function readingTimePlugin(routes) {
  routes.forEach(route => {
    const file = readFileSync(route.templateFile).toString();
    route.data.stats = readingTime(file);
  });
}

function isArticlePlugin(routes) {
  routes.forEach(route => {
    route.data.isArticle = true;
  })
}

const plugins = [
  readingTimePlugin,
  isArticlePlugin,
];

async function articlePlugin(route, config = {}) {
  const routes = await contentFolderPlugin(route, config);
  return plugins.reduce((previousResult, plugin) => {
    plugin(previousResult, route, config);
    return previousResult;
  }, routes);
}

const validator = async conf => [];
registerPlugin('router', ARTICLE_PLUGIN_NAME, articlePlugin, validator);
registerPlugin('render', ARTICLE_PLUGIN_NAME, contentRenderPlugin);

module.exports.articlePlugin = ARTICLE_PLUGIN_NAME;
