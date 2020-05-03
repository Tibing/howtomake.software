const { contentRenderPlugin } = require('@scullyio/scully/renderPlugins/contentRenderPlugin');
const { contentFolderPlugin } = require('@scullyio/scully/routerPlugins/contentFolderPlugin');
const { registerPlugin } = require('@scullyio/scully');
const { readFileSync } = require('fs');
const readingTime = require('reading-time');
const marked = require('marked');
require('prismjs/prism');
require('prismjs/plugins/toolbar/prism-toolbar.js');
require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js');
require('prismjs/components/prism-bash.js');
require('prismjs/components/prism-css.js');
require('prismjs/components/prism-javascript.js');
require('prismjs/components/prism-json.js');
require('prismjs/components/prism-markup.js');
require('prismjs/components/prism-typescript.js');

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

const markdownPlugin = async (raw) => {
  marked.setOptions({
    highlight(code, lang) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
  });
  return marked(raw)
};

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
registerPlugin('fileHandler', 'md', markdownPlugin, [ 'markdown' ], { replaceExistingPlugin: true });

module.exports.articlePlugin = ARTICLE_PLUGIN_NAME;
