const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

const generatePage = function ({
  title = '',
  entry = '',
  template = '',
  name = '',
  hash = true,
  chunks = ['vender']
} = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        template,
        title,
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
    template: resolve('/src/pages/pageA/indexA.html'),
    name: 'a',
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
