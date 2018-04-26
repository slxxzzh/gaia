import moduleA from 'common/js/module.js'
import '../css/b.less'

console.log('i am b')
console.log(moduleA)

function yourName () {
  return true
}

export { yourName }