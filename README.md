# RuntimeError

[![Available from NPM](https://img.shields.io/npm/v/run-time-error.svg?maxAge=900)](https://www.npmjs.com/package/run-time-error)
[![Built using Travis](https://img.shields.io/travis/lsphillips/RuntimeError/master.svg?maxAge=900)](https://travis-ci.org/lsphillips/RuntimeError)

A better error that is inspired by the Java exception that is also serializable to JSON.

## Usage

The RuntimeError constructor has this signature:

```
RuntimeError(String message [, Error cause])
```

Example usage:

``` js
try
{
	JSON.parse(someMalformedServiceData);
}
catch (error)
{
	throw new RuntimeError('The service data could not be parsed.', error);
}
```

## Getting started

This project is available through the Node Package Manager (NPM), so you can install it like so:

``` sh
npm install run-time-error
```

**Please Note:** Versions of Node lower than v6.0.0 are not supported, this is because it is written using ECMAScript 6 features.

## Development

This project doesn't have much of a build process. It does have tests though; which you can run through NPM like so:

``` sh
npm test
```

This also runs code quality checks using ESLint. Please refer to the `.eslintrc` file to familiar yourself with the rules.

## License

This project is released under the MIT license.
