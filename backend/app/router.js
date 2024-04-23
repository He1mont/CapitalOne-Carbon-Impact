/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/account/create-random', controller.account.createRandom);
  router.get('/account/get-all', controller.account.getAll);
  router.get('/account/get-by-id/:id', controller.account.getByID);
  router.get('/account/get-by-email/:email', controller.account.getByEmail);
  router.get('/account/get-by-username/:username', controller.account.getByUserName);
  router.post('/transaction/create-random/:id', controller.transaction.createRandom);
  router.get('/transaction/get-all/:id', controller.transaction.getAll);
  router.get('/transaction/get-by-id/:accountID/:transactionID', controller.transaction.getByID);
  router.get('/transaction/group-by-date/:id', controller.transaction.groupByDate);
  router.get('/transaction/get-carbon-impact/:accountID/:transactionID', controller.transaction.getCarbonImpact);
  router.get('/transaction/get-by-month/:accountID/:year/:month', controller.transaction.getTransactionsByMonth);
  router.get('/transaction/get-carbonscore-by-month/:accountID/:year/:month', controller.transaction.getCarbonScoreByMonth);
  router.get('/transaction/get-carbonscore-by-month-in-category/:accountID/:year/:month', controller.transaction.getCarbonScoreByMonthInCategory);
  router.post('/friend/add-by-id/:accountID/:friendID', controller.friend.addByID);
  router.get('/friend/get-all/:id', controller.friend.getAll);
  router.delete('/friend/delete/:accountID/:friendID', controller.friend.deleteFriend);
  router.post('/userGoal/set-goal/:id/:goal/:year/:month', controller.userGoal.createGoal);
  router.delete('/userGoal/:id', controller.userGoal.userGoals);
  router.get('/userGoal/:id', controller.userGoal.userGoals);
};
