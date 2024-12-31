const path = require('path');
const HtmlPlugin = require('../plugins/HtmlPlugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: path.resolve(__dirname, '../lib/loaders/vue-loader.js')
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: 'Mini Webpack Vue App',
      devServer: true
    })
  ]
}; 