const path = require('path');
const config = require('./webpack.config.js');

config.mode = 'development';

config.devServer = {
  historyApiFallback: true,
  contentBase: path.join(__dirname, '../dist/'),
  port: 8080,
  hot: true,
};

config.devtool = 'inline-source-map';

module.exports = config;
