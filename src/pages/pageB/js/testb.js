import { yourName } from './b.js'
QUnit.module('testB')
QUnit.test('testb', function (assert) {
  assert.ok(yourName(), 'yourName is ok')
})
