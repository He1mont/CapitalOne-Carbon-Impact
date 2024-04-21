/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
<<<<<<< HEAD
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
  router.post('/userGoal/set-goal/:id/:goal/:month', controller.userGoal.createGoal);
  router.delete('/userGoal/:id', controller.userGoal.userGoals);
  router.get('/userGoal/:id', controller.userGoal.userGoals);
=======
  router.post('/accounts', controller.account.createRandom);
  router.get('/accounts', controller.account.getAll);
  router.get('/accounts/email', controller.account.getByEmail);
  router.get('/accounts/:id', controller.account.getByID);
  router.post('/accounts/:id/transactions', controller.transaction.createRandom);
  router.get('/accounts/:id/transactions', controller.transaction.getTransactions);
  // router.get('/accounts/:id/transactions', controller.transaction.getAll);
  router.get('/accounts/:accountID/transactions/:transactionID', controller.transaction.getByID);
  // router.get('/accounts/:id/transactions/group-by-date', controller.transaction.groupByDate);
  router.get('/accounts/:accountID/transactions/:transactionID/carbonImpact', controller.transaction.getCarbonImpact);
  router.get('/friends', controller.accountTable.getID);
  router.post('/accounts/:id/userGoal', controller.userGoal.createGoal);
  router.delete('/accounts/:id/userGoal', controller.userGoal.userGoals);
  router.get('/accounts/:id/userGoal', controller.userGoal.userGoals);
>>>>>>> modify-routes-rest
};
