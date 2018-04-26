import { hello } from './a.js'
QUnit.module('testA')
QUnit.test('testa', function (assert) {
  assert.deepEqual(hello('params'), 'params', 'hello is ok')
})
