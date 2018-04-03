'use strict';
const schema = require('async-validator');

const validate = (rules, data, messages) => {
  return new Promise((resolve, reject) => {
    const validator = new schema(rules);
    validator.messages(messages);
    validator.validate(data, (errors, fields) => {
      if (errors) {
        reject({ errors: { errors, fields } });
      }
      resolve(data);
    });
  });
};

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object, see [async-validator](https://github.com/yiminghe/async-validator)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   *
   * @return {Object} [data]
   */
  async validate(rules, data) {
    data = data || this.request.body;
    try {
      return await validate(rules, data, this.app.config.asyncValidator.messages);
    } catch (error) {
      this.throw(422, 'Validation Failed', error);
    }
  },
};
