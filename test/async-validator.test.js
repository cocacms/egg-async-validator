'use strict';

const mock = require('egg-mock');

describe('test/async-validator.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/async-validator-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('get', () => {
    it('should return invalid_param when body empty', async () => {
      return app.httpRequest()
        .get('/')
        .set('Accept', 'application/json')
        .expect({
          errors: {
            errors: [
              {
                message: 'this is required!',
                field: 'name',
              },
            ],
            fields: {
              name: [{
                message: 'this is required!',
                field: 'name',
              }],
            },
          },
          message: 'Validation Failed',
        })
        .expect(422);

    });

    it('should return status 200 when body not empty', async () => {
      return app.httpRequest()
        .get('/?name=111')
        .set('Accept', 'application/json')
        .expect({
          name: '111',
        })
        .expect(200);

    });

  });

  describe('post', () => {
    it('should return invalid_param when post body empty', async () => {
      return app.httpRequest()
        .post('/')
        .set('Accept', 'application/json')
        .expect({
          errors: {
            errors: [
              {
                message: 'this is not obejct!',
                field: 'data',
              },
            ],
            fields: {
              data: [{
                message: 'this is not obejct!',
                field: 'data',
              }],
            },
          },
          message: 'Validation Failed',
        })
        .expect(422);

    });


    it('should all pass', async () => {
      return app.httpRequest()
        .post('/allRules')
        .set('Accept', 'application/json')
        .send({
          string: '11asdasd1',
          number: 1.2,
          boolean: false,
          regexp: /^[a-z]+$/,
          integer: 1,
          float: 2.2,
          array: [],
          object: {},
          url: 'http://www.google.com',
          email: 'rojerchen@qq.com',
          required: '1',
          pattern: 'abcdefg',
          range: 8,
          role: 'user',
          address: {
            street: 'a',
            city: 'b',
            zip: '12345678',
          },
          urls: [
            'http://www.google.com',
            'http://www.google.com',
          ],
        })
        .expect(200);

    });
  });

});
