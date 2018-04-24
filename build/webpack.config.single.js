'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')
const PurifyCss = require('purifycss-webpack')
const glob = require('glob-all')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfig = {
    entry: {
        vender: ['jquery']
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            '@': resolve('src/pages'),
            'components': resolve('src/components')
        }
    },

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
        }),
        // css treeshaking
        new PurifyCss({
            paths: glob.sync([
                path.join(__dirname, './src/*.js'),
                path.join(__dirname, './src/*.html'),
            ])
        }),
        // js treeshaking
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            parallel: true
        }) 
    ]
}

const generatePage = function ({
    title = '',
    entry = '',
    template = '',
    name = '',
    chunks = ['vender']
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html'
            })
        ]
    }
}

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: resolve('/src/pages/pageA/js/index.js')
        },
        template: resolve('/src/pages/pageA/indexA.html'),
        name: 'a',
        chunks: ['vender', 'a']
    }),


    generatePage({
        title: 'page B',
        entry: {
            b: resolve('/src/pages/pageB/js/index.js')
        },
        template: resolve('/src/pages/pageB/indexB.html'),
        name: 'b',
        chunks: ['vender', 'b']
    }),


    generatePage({
        title: 'page C',
        entry: {
            c: resolve('/src/pages/pageC/js/index.js')
        },
        template: resolve('/src/pages/pageC/indexC.html'),
        name: 'c',
        chunks: ['vender', 'c']
    })
]

module.exports = merge([baseConfig].concat(pages))