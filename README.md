# egg-async-validate

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-async-validate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-async-validate
[travis-image]: https://img.shields.io/travis/eggjs/egg-async-validate.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-async-validate
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-async-validate.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-async-validate?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-async-validate.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-async-validate
[snyk-image]: https://snyk.io/test/npm/egg-async-validate/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-async-validate
[download-image]: https://img.shields.io/npm/dm/egg-async-validate.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-async-validate

Validate plugin for egg.

see [async-validate](https://github.com/yiminghe/async-validator) for more information such as custom rule.

[以中文查看](./README.zh_CN.md)


## Install

```bash
$ npm i egg-async-validate --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.asyncValidator = {
  enable: true,
  package: 'egg-async-validate',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.asyncValidator = {
  messages: {},
};
```

see [async-validator#messages](https://github.com/yiminghe/async-validator#messages) for more detail.

## Example

```js
// {app_root}/app/controller/home.js
exports.index = async ctx => {

  // will throw if invalid.
  await ctx.validate({
    data: { type: 'object', required: true },
  }, {
    data: '1',
  });

  // if you want to get errors info,
  // use try { ... } catch (err) { ... } to get
  // example
  try {
    await ctx.validate({ data: { type: 'object', required: true } }); // validate target, default to `this.request.body`
  } catch (err) {
    const errors = err.errors;
  }

};
```
rules see [async-validator#rules](https://github.com/yiminghe/async-validator#rules) for more detail.
!!important:  `method`,`date`,`hex` in `type` does not apply to server - side form validation

## License

[MIT](LICENSE)
