/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/account', controller.account.createRandom);
  router.get('/account', controller.account.getAll);
  router.get('/account/:id', controller.account.getByID);
  router.get('/account/:email', controller.account.getByEmail);
  router.post('/account/:id/transaction', controller.transaction.createRandom);
  router.get('/account/:id/transaction', controller.transaction.getAll);
  router.get('/account/:accountID/transaction/:transactionID', controller.transaction.getByID);
  router.get('/account/:id/transaction/group-by-date', controller.transaction.groupByDate);
  router.get('/account/:accountID/transaction/:transactionID/carbon-impact', controller.transaction.getCarbonImpact);
  router.get('/friend', controller.accountTable.getID);
  router.post('/account/:id/userGoal', controller.userGoal.createGoal);
  router.delete('/account/:id/userGoal', controller.userGoal.userGoals);
  router.get('/account/:id/userGoal', controller.userGoal.userGoals);
};
