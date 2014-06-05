
var live = require('./')(require)
var assert = require('assert')
var fs = require('fs')

fs.writeFileSync('/tmp/a.js', 'module.exports = 42')
assert.equal(live('/tmp/a'), 42)
fs.writeFileSync('/tmp/a.js', 'module.exports = -42')
assert.equal(live('/tmp/a'), -42)
console.log('OK, live() works')

fs.writeFileSync('/tmp/b.js', 'module.exports = function(a, b) { return a + b }')
var b = live.function('/tmp/b')
assert.equal(b(1, 2), 3)
fs.writeFileSync('/tmp/b.js', 'module.exports = function(a, b) { return a - b }')
assert.equal(b(1, 2), -1)
console.log('OK, live.function() works')

var thrown = false
fs.writeFileSync('/tmp/b.js', 'module.exports = 1')
try { live.function('/tmp/b') } catch (e) { thrown = true }
assert(thrown, 'live.function() should throw when the module does not export a function')
console.log('OK, live.function() throws when the module does not export a function')



