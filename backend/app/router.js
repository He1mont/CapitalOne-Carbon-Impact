/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/accounts/create-random', controller.account.createRandom);
  router.get('/accounts/get-all', controller.account.getAll);
};
