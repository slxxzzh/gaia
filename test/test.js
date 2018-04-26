function name () {
  return false
}
console.log($)
var obj = { foo: 'foo' }
QUnit.module('group a')

QUnit.assert.myTest = function (needle, haystack, message) {
  var solution = haystack.includes(needle)
  this.push(solution, solution, needle, message)
}

QUnit.test('a basic test example', function (assert) {
  var value = 'hello'
  var done = assert.async()
  var arr = [1, 2, 3]
  assert.equal(value, 'hello', 'We expect value to be hello')
  assert.ok(true, 'true pass')
  assert.ok(name(), 'name is ok')
  assert.equal(name(), false, 'name is ok')
  setTimeout(() => {
    assert.deepEqual(obj, { foo: 'foo' }, 'obj is ok')
    done()
  }, 1000)
  assert.myTest(1, arr, 'arr is true')
})
