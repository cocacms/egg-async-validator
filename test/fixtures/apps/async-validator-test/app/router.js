'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.get_test);
  router.post('/', controller.home.post_test);
  router.post('/allRules', controller.home.all_rules_test);

};
