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
  router.post('/transaction/create-random/:id', controller.transaction.createRandom);
  router.get('/transaction/get-all/:id', controller.transaction.getAll);
  router.get('/transaction/get-by-id/:accountID/:transactionID', controller.transaction.getByID);
  router.get('/transaction/group-by-date/:id', controller.transaction.groupByDate);
  router.post('/friend/create-username/:id', controller.accountTable.createUsername);
  router.get('/friend/get-id/:username', controller.accountTable.getID);
  router.post('/userGoal/create-goal/:id/:goal/:month', controller.userGoal.createGoal);
  router.delete('/userGoal/delete-goal/:id', controller.userGoal.deleteUserGoal);
  router.get('/userGoal/get-goal/:id', controller.userGoal.getUserGoal);
};
