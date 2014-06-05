
uncache
=======

Like `require()`, but do not put the required package into the cache to facilitate live coding
(actually, it removes the required module from the cache!).

What Can You Do?
----------------

* Create a web server that you don't have to restart when you change the code.


Usage
-----

```javascript
var live = require('uncache')(require)
```

Now, use `live('module')` instead of `require('module')`.
It will load the file each time.


### When the module exports a function

```javascript
var func = live.function('./module')
```

When `func()` is called, it will reload the module before calling it.
Of course, this assumes that the module exports a function.



Use Cases
---------

### Restartless Express Application

One annoying thing when creating web applications with Node.js
is that you have to restart the server when you change the code.

Even with `nodemon` that restarts the server automatically,
it's still annoying.

Since [the app returned by `express()` is a function](http://expressjs.com/4x/api.html#app.listen)
that can be passed to `http.createServer`,
you can create a web server like this:

```javascript
var live = require('uncache')(require)
var http = require('http')

http.createServer(live.function('./app'))
    .listen(3002, '127.0.0.1')
```

And `app.js` like this:

```javascript
var express = require('express')
var app = module.exports = express()

app.get('/', function(req, res, next) {
  res.send('hello')
})
```

Each time you send a request to this server,
a new application is created.

That means when you change the code,
for example, from `'hello'` to `'world'`,
and then refresh the page.

__Going live:__ when you want to go production,
just change `live.function` to `require`, and it's done!














