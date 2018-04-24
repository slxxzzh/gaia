'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfig = {
    entry: {
        vender: ['react', 'jquery']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '@': ''
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpack.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpack({
            filename: 'css/[name].[hash].css'
        }),

        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            minChunks: Infinity
        }),

        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}

const generatePage = function ({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks = []
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                filename: name + '.html'
            })
        ]
    }
}

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        template: './src/indexA.html',
        name: 'a',
        chunks: ['vender', 'a']
    }),


    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        template: './src/indexB.html',
        name: 'b',
        chunks: ['vender', 'b']
    }),


    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        template: './src/indexC.html',
        name: 'c',
        chunks: ['vender', 'c']
    })
]

console.log(pages.map(page => merge(baseConfig, page)))

module.exports = pages.map(page => merge(baseConfig, page))