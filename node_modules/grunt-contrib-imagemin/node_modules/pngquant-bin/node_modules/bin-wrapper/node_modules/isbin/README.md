[![Build Status](https://secure.travis-ci.org/mbehrendt/isbin.png?branch=master)](https://travis-ci.org/mbehrendt/isbin)

# Isbin

Tiny little helper library to determine if a certain binary is available within $PATH or any additional folder.

# Installation

```bash
$ npm install isbin
```

# Usage

```js
var isbin = require('isbin');

// Test against $PATH
isbin('mysql', function(exists) {
  console.log(exists); // ==> Boolean
});

// With additional path to test
isbin('mysql', '/usr/local/bin', function(exists) {
  console.log(exists); // ==> Boolean
});

// Or multiple ones
isbin('mysql', ['/usr/local/bin', '/home/me/bins'], function(exists) {
  console.log(exists); // ==> Boolean
});
```

There are also synchronous versions available

```js
var exists = isbin('mysql');
var exists = isbin('mysql', '/usr/local/bin');
var exists = isbin('mysql', ['/usr/local/bin', '/home/me/bins']);
```

# Running the tests

```bash
$ npm install
$ make test
```

# License

(The MIT License)

Copyright (c) 2012 Mario Behrendt info@mario-behrendt.de, Stephan Hoyer <ste.hoyer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
