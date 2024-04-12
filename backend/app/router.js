/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/account/create-random', controller.account.createRandom);
  router.get('/account/get-all', controller.account.getAll);
  router.get('/account/:id/get-by-id', controller.account.getByID);
  router.get('/account/get-by-email', controller.account.getByEmail);
  router.post('/account/:id/transaction/create-random', controller.transaction.createRandom);
  router.get('/account/:id/transaction/get-all/', controller.transaction.getAll);
  router.get('/account/:accountID/transaction/:transactionID/get-by-id', controller.transaction.getByID);
  router.get('/account/:id/transaction/group-by-date/', controller.transaction.groupByDate);
  router.get('/account/:accountID/transaction/:transactionID/get-carbon-impact', controller.transaction.getCarbonImpact);
  router.get('/account/friend/get-id', controller.accountTable.getID);
  router.post('/account/:id/userGoal/create-goal', controller.userGoal.createGoal);
  router.delete('/account/:id/userGoal', controller.userGoal.userGoals);
  router.get('/account/:id/userGoal', controller.userGoal.userGoals);
};
