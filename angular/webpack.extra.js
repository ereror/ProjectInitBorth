const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.pug$/,
      loader: ['pug-html-loader']
    }]
  }
}
