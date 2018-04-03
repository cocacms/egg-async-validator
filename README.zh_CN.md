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

基于 [parameter](https://github.com/yiminghe/async-validator) 提供数据校验方法。

## 安装

```bash
$ npm i egg-async-validate --save
```

## 启用

```js
// {app_root}/config/plugin.js
exports.asyncValidator = {
  enable: true,
  package: 'egg-async-validate',
};
```

## 自定义错误信息配置

```js
// {app_root}/config/config.default.js
exports.asyncValidator = {
  messages: {},
};
```

具体错误信息文本模板，详情见[async-validator#messages](https://github.com/yiminghe/async-validator#messages)。

## 例

```js
// {app_root}/app/controller/home.js
exports.index = async ctx => {

  // 验证不通过，将抛出错误
  await ctx.validate({
    data: { type: 'object', required: true },
  }, {
    data: '1',
  });

  // 如果你想获取验证不通过的信息
  // 使用 try { ... } catch (err) { ... } 来获取
  // 下面是例子
  try {
    await ctx.validate({ data: { type: 'object', required: true } }); // validate target, default to `this.request.body`
  } catch (err) {
    const errors = err.errors;
  }

};
```
验证规则详见 [async-validator#rules](https://github.com/yiminghe/async-validator#rules)。
!!重要： `type` 中的 `method`,`date`,`hex`不适用与服务端表单验证。

## License

[MIT](LICENSE)
