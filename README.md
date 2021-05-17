# RuntimeError

[![Available from NPM](https://img.shields.io/npm/v/run-time-error.svg?maxAge=900)](https://www.npmjs.com/package/run-time-error)
[![Built using Travis](https://img.shields.io/travis/com/lsphillips/RuntimeError/master.svg?maxAge=900)](https://travis-ci.com/lsphillips/RuntimeError)

A better error that is inspired by the Java exception that is also serializable to JSON.

## Usage

``` js
import { RuntimeError } from 'run-time-error';

try
{
  throw new Error('The root cause error.');
}
catch (cause)
{
  throw new RuntimeError('An unexpected error occurred while performing an operation.', cause);
}
```

This module can also be treated as a CommonJS module:

``` js
const { RuntimeError } = require('run-time-error');
```

## Getting started

This project is available through the Node Package Manager (NPM), so you can install it like so:

``` sh
npm install run-time-error
```

**Please Note:** Versions of Node lower than **v12.0.0** are not supported.

## Development

### Building

You can build UMD and ESM versions of this module that are minified:

``` sh
npm run build
```

### Testing

This module also has a robust test suite:

``` sh
npm test
```

This also runs code quality checks using ESLint. Please refer to the `.eslintrc` files to familiar yourself with the rules.

## License

This project is released under the MIT license.
