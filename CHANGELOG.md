# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.4.0 - 2021-05-16

### Added

- Introduced ESM and UMD versions of this module, each with an ES5 version for browser environments.

### Changed

- Removed unnecessary files from the package making it more lightweight.
- Moved to named exports, so importing this should now look like this:
  ``` js
  import { RuntimeError } from 'run-time-error';
  // instead of
  import RuntimeError from 'run-time-error';
  ```

## 1.3.0 - 2021-05-09

### Changed

- Support for Node.js version `10.x.x` has been dropped.

## 1.2.0 - 2018-12-14

### Added

- Introduced documentation to the Typescript type definitions.

## 1.1.0 - 2017-12-29

A code quality release; no functionality changes.

## 1.0.1 - 2017-06-18

### Changed

- Updated the TypeScript type definitions to adhere to ECMAScript 6.

## 1.0.0 - 2017-05-16

The initial public release.
