import { hello } from './a.js'
console.log('i am in test')
QUnit.module('testA')
QUnit.test('testa', function (assert) {
  assert.deepEqual(hello('params'), 'params', 'hello is ok')
})
