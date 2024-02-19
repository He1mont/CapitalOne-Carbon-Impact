/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/account/create-random', controller.account.createRandom);
  router.get('/account/get-all', controller.account.getAll);
  router.get('/account/get-by-id/:id', controller.account.getByID);
  router.get('/account/get-by-email/:email', controller.account.getByEmail);
  router.get('/transaction/create-random/:id', controller.transaction.createRandom);
  router.get('/transaction/get-all/:id', controller.transaction.getAll);
  router.get('/transaction/get-by-id/:accountID/:transactionID', controller.transaction.getByID);
  router.get('/transaction/group-by-date/:id', controller.transaction.groupByDate);
};
