'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const pages = require('./pages-template.js')
const PurifyCss = require('purifycss-webpack')
const glob = require('glob-all')

const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devServer = isDev
  ? {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true
  }
  : {}

const cssLoader = isDev
  ? [
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
  : ExtractTextWebpack.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [require('postcss-cssnext')()]
        }
      },
      {
        loader: 'less-loader'
      }
    ]
  })
const fileLoader = path => {
  return isDev
    ? [
      {
        loader: 'file-loader',
        options: {
          name: `${path}/[name]-[hash:5].[ext]`
        }
      }
    ]
    : [
      {
        loader: 'url-loader',
        options: {
          name: `${path}/[name]-[hash:5].[ext]`,
          limit: 1000
        }
      }
    ]
}
const baseConfig = {
  entry: {
    vender: ['jquery'],
    global: resolve('src/common/js/global.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isDev ? 'js/[name].[hash].js' : 'js/[name].[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src/pages'),
      common: resolve('src/common'),
      components: resolve('src/components')
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
        test: /\.(less|css)$/,
        use: cssLoader
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: fileLoader('css/images').concat(
          !isDev
            ? {
              loader: 'img-loader'
            }
            : []
        )
      },

      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: fileLoader('css/font')
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
    new ExtractTextWebpack({
      filename: 'css/[name].[hash].css'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vender', 'global'],
      minChunks: Infinity
    }),
    // 引用jq
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new CopyWebpackPlugin([
      {
        from: resolve('src/components/footer/footer.html'),
        to: resolve('dist/components/footer.html'),
      }
    ])
  ]
}

if (!isDev) {
  baseConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      parallel: true
    }),
    // css treeshaking
    new PurifyCss({
      paths: glob.sync([
        path.join(__dirname, '../src/common/js/global.js')
      ])
    })
  )
} else {
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = merge([baseConfig].concat(pages))
