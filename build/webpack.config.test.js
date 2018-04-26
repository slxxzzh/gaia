'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const pages = require('./test-template.js')

const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devServer = {
  contentBase: path.join(__dirname, '../pro-test/TEST.html'),
  compress: true,
  port: 9090,
  host: '0.0.0.0',
  hot: true,
  hotOnly: true
}

const cssLoader = [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'less-loader'
    }
  ]
 

const baseConfig = {
  output: {
    path: path.resolve(__dirname, '../pro-test'),
    filename: 'js/[name].[hash].js'
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src/pages'),
      common: resolve('src/common')
    }
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'  
      },
      {
        test: /\.less$/,
        use: cssLoader
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

module.exports = merge([baseConfig].concat(pages))
