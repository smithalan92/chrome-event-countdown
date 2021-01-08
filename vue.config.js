const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
      .set('@sections', path.join(__dirname, './src/components/sections'))
      .set('@modals', path.join(__dirname, './src/components/modals'))
      .set('@widgets', path.join(__dirname, './src/components/widgets'));

    config.resolve.plugin('directory-named-webpack-plugin')
      .use(new DirectoryNamedWebpackPlugin({
        exclude: /node_modules/,
      }));

    config.resolve.extensions.prepend('.vue');

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // `vue-loader-v16` for preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            'removeTitle',
            'removeDesc',
            'removeComments',
            'removeDoctype',
            { removeViewBox: false },
            { cleanupIDs: false },
            // { collapseGroups: false }, // needed for map svg CSS targeting
          ],
        },
      });
  },
};
