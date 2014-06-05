
module.exports = function(require) {
  function purge(path) {
    if (require.cache[path]) {
      delete require.cache[path]
    }
  }
  var live = function(id) {
    var path = require.resolve(id)
    purge(path)
    var exports = require(id)
    purge(path)
    return exports
  }
  live.function = function(id) {
    void function() {
      if (typeof require(id) != 'function') {
        throw new Error("Expect require('" + id + "') to export a function.")
      }
    }()
    return function() {
      return live(id).apply(this, arguments)
    }
  }
  return live
}

