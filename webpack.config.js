const webpack = require('webpack');
const path = require('path');

const jsSourcePath = path.join(__dirname, './web');
const buildPath = path.join(__dirname, './public/js');
const imgPath = path.join(__dirname, './public/img');
const sourcePath = path.join(__dirname, './web');

// Common plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js',
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=static/[name]-[hash].[ext]',
  },
];
  rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss-loader',
        'sass-loader',
      ],
    }
  );
}

module.exports = {
  devtool: 'source-map',
  context: jsSourcePath,
  entry: {
    js: './index.js',
    vendor: [
      'babel-polyfill',
      'isomorphic-fetch',
      'react-dom',
      // 'react-redux',
      'react',
      // 'redux-saga',
      // 'redux',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      jsSourcePath,
    ],
  },
  plugins,
};