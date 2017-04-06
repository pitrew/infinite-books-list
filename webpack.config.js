const webpack = require('webpack');
const path = require('path');

const jsSourcePath = path.join(__dirname, './web');
const buildPath = path.join(__dirname, './public/js');

module.exports = {
  devtool: 'source-map',
  context: jsSourcePath,
  entry: {
    js: './index.js',
    vendor: [
      'babel-polyfill',
      'isomorphic-fetch',
      'react-dom',
      'react-redux',
      'react',
      'redux-saga',
      'redux',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      jsSourcePath,
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
  ],
};