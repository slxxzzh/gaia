'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')
const pages = require('./pages.config.js')
const PurifyCss = require('purifycss-webpack')
const glob = require('glob-all')

const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devServer = isDev ? {
  contentBase: path.join(__dirname, '../dist'),
  compress: true,
  port: 9000,
  host: '0.0.0.0',
  hot: true,
  hotOnly: true
} : {}

const baseConfig = {
  entry: {
    vender: ['jquery']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isDev ? 'js/[name].[hash].js' : 'js/[name].[chunkhash].js'
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
        test: /\.css$/,
        use: ExtractTextWebpack.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    // css treeshaking
    new PurifyCss({
      paths: glob.sync([
        path.join(__dirname, './src/*.js'),
        path.join(__dirname, './src/*.html')
      ])
    }),
    new ExtractTextWebpack({
      filename: 'css/[name].[hash].css'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      minChunks: Infinity
    }),
    // 引用jq
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}

if (!isDev) {
  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    parallel: true
  }))
} else {
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = merge([baseConfig].concat(pages))
