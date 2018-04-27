import moduleA from 'common/js/module'
import 'common/css/global.less'
import '../css/a.less'

console.log('i am a')
console.log(moduleA)
console.log($('.a').addClass('new add'))

let a = [...[1, 2, 3], 4, 5]
console.log(a)

function hello (params) {
  return params
}
hello('params')

$('#datepicker').datepicker({
  inline: true
})

export { hello }
