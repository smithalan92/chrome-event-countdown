const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: {
    resolve: {
      plugins: [new DirectoryNamedWebpackPlugin()],
      alias: {
        '@': path.join(__dirname, './src'),
        '@sections': path.join(__dirname, './src/components/sections'),
        '@modals': path.join(__dirname, './src/components/modals'),
        '@widgets': path.join(__dirname, './src/components/widgets'),
      },
      extensions: ['.vue', '.js'],
    },
  },
};
