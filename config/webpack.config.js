const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');
const DIST_DIRECTORY = path.join(ROOT_DIRECTORY, 'dist');

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
    alias: {
      config$: path.resolve(SRC_DIRECTORY, 'config/index.js'),
      '#': path.resolve(SRC_DIRECTORY),
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.pug'),
      filename: path.join(DIST_DIRECTORY, 'index.html'),
    }),
    new DefinePlugin({
      SERVER_BASE_URL: JSON.stringify('http://localhost:9001'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = config;
