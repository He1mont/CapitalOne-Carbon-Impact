/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/accounts/create-random', controller.account.createRandom);
  router.get('/accounts/get-all', controller.account.getAll);
  router.get('/transactions/get-all/:id', controller.transactions.getAll);
  router.get('/transactions/get-by-id/:accountID/:transactionID', controller.transactions.getByID);
  router.get('/transactions/group-by-date/:id', controller.transactions.groupByDate);
  router.get('/accounts/get-by-id/:id', controller.account.getByID);
};
