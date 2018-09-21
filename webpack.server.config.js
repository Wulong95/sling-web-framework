const { resolve } = require('path');
const { existsSync } = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlStringReplace = require('html-replace-webpack-plugin');
const getBasePath = require('./scripts/helpers/getBasePath');

const basePath = getBasePath();

const entry = existsSync(resolve(__dirname, basePath, './public/index.js'))
  ? ['./src/index.js', './public/index.js']
  : './src/index.js';

module.exports = () => ({
  mode: 'development',
  resolve: {
    mainFields: ['module', 'jsnext:main', 'main'],
  },
  context: resolve(__dirname, basePath),
  entry,
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    contentBase: [
      resolve(__dirname, `${basePath}/public`),
      resolve(__dirname, './packages'),
    ],
    watchContentBase: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
    }),
    new HtmlStringReplace([{
      pattern: /<script.*?\/script>/,
      replacement: '',
    }]),
  ],
});
