/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  // Accounts
  router.post('/accounts', controller.account.createRandom);
  router.get('/accounts', controller.account.getAll);
  router.get('/accounts/username', controller.account.getByUserName);
  router.get('/accounts/email', controller.account.getByEmail);
  router.get('/accounts/:id', controller.account.getByID);
  // Transactions
  router.post('/accounts/:id/transactions', controller.transaction.createRandom);
  router.get('/accounts/:id/transactions', controller.transaction.getAllTransactions);
  router.get('/accounts/:accountID/transactions/:transactionID', controller.transaction.getByID);
  router.get('/accounts/:accountID/transactions/:transactionID/carbonScore', controller.transaction.getCarbonImpact);
  router.get('/accounts/:accountID/carbonScores/monthly', controller.transaction.getCarbonScoreByMonth);
  router.get('/accounts/:accountID/carbonScores/monthly/allCategories', controller.transaction.getCarbonScoreByMonthInCaregories);
  // Friends
  router.post('accounts/:accountID/friends/:friendID', controller.friend.addByID);
  router.delete('/accounts/:accountID/friends/:friendID', controller.friend.deleteFriend);
  router.get('/accounts/:id/friends', controller.friend.getAll);
  // User Goals
  router.post('/accounts/:id/userGoal', controller.userGoal.createGoal);
  router.get('/accounts/:id/userGoal', controller.userGoal.getUserGoals);
};
