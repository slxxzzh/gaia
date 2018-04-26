const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

const generatePage = function ({
  title = '',
  entry = '',
  template = resolve('/test/test.html'),
  name = '',
  hash = true,
  chunks = []
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
    title: 'TEST',
    entry: {
      testa: [resolve('/src/pages/pageA/js/a.js'),resolve('/src/pages/pageA/js/testa.js')],
      testb: [resolve('/src/pages/pageB/js/b.js'),resolve('/src/pages/pageB/js/testb.js')]
    },
    name: 'TEST',
    chunks: ['testa', 'testb']
  })
]
module.exports = pages
