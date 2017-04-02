const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const extractCSS = new ExtractTextPlugin('[name].css');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');


const config = {
  context: sourcePath,
  entry: {
    app: ['./index.js']
  },
   output: {
    path: distPath,
    publicPath: '/public/',
    filename: '[name].bundle.js'
  },

  /*

  */
  module: {
    rules: [
      {
        test: /\.less$/,
        include: sourcePath,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },{
        test: /\.js$/,
        include: sourcePath,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }]
  },
  watch: true,
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    extractCSS,
    extractCommons
  ]
}

module.exports = config