'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async get_test() {
    this.ctx.body = await this.ctx.validate({
      name: { required: true, message: 'this is required!' },
    }, this.ctx.request.query);
  }

  async post_test() {
    this.ctx.body = await this.ctx.validate({
      data: { type: 'object', required: true, message: 'this is not obejct!' },
    });
  }

  async all_rules_test() {
    console.log(this.ctx.request.body);

    this.ctx.body = await this.ctx.validate({
      string: { type: 'string' },
      number: { type: 'number' },
      boolean: { type: 'boolean' },
      regexp: { type: 'regexp' },
      integer: { type: 'integer' },
      float: { type: 'float' },
      array: { type: 'array' },
      object: { type: 'object' },
      url: { type: 'url' },
      email: { type: 'email' },
      required: { required: true },
      pattern: {
        type: 'string',
        required: true,
        pattern: /^[a-z]+$/,
      },
      range: {
        type: 'number',
        min: 5,
        max: 10,
        length: 1,
      },
      role: { type: 'enum', enum: [ 'admin', 'user', 'guest' ] },
      address: {
        type: 'object', required: true,
        fields: {
          street: { type: 'string', required: true },
          city: { type: 'string', required: true },
          zip: { type: 'string', required: true, len: 8, message: 'invalid zip' },
        },
      },
      urls: {
        type: 'array', required: true,
        defaultField: { type: 'url' },
      },
    });
  }
}

module.exports = HomeController;
