const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const extractLESS = new ExtractTextPlugin('[name].css');
const extractVendor = new ExtractTextPlugin('[name].vendor.css');

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
  module: {
    rules: [
      {
        test: /\.less$/,
        include: sourcePath,
        use: extractLESS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },{
        test: /\.scss$/,
        include: sourcePath,
        use: extractVendor.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },{
        test: /\.js$/,
        include: sourcePath,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },{
          test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
          include: sourcePath,
          use: ['file-loader']
      }]
  },
  watch: true,
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    extractLESS,
    extractVendor,
    extractCommons
  ]
}

module.exports = config