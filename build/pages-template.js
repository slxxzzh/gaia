const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}
const isDev = process.env.NODE_ENV === 'development'

const generatePage = function ({
  title = '',
  entry = '',
  template = '',
  name = '',
  hash = true,
  inject = true,
  chunks = ['vender']
} = {}) {
  inject = isDev ? true : inject
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        template,
        title,
        inject,
        hash,
        filename: name + '.html'
      })
    ]
  }
}

const pages = [
  generatePage({
    title: 'page A',
    entry: {
      a: resolve('/src/pages/pageA/js/a.js')
    },
    inject: {
      path: ''
    },
    template: resolve('/src/pages/pageA/indexA.html'),
    name: 'login/a',
    chunks: ['vender', 'global', 'a']
  }),

  generatePage({
    title: 'page B',
    entry: {
      b: resolve('/src/pages/pageB/js/b.js')
    },
    template: resolve('/src/pages/pageB/indexB.html'),
    name: 'b',
    chunks: ['vender', 'global', 'b']
  }),

  generatePage({
    title: 'page C',
    entry: {
      c: resolve('/src/pages/pageC/js/c.js')
    },
    template: resolve('/src/pages/pageC/indexC.html'),
    name: 'c',
    chunks: ['vender', 'global', 'c']
  })

]
module.exports = pages
