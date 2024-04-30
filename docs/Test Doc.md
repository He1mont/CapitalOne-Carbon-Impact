# Test Document
- [Test Document](#test-document)
  - [Backend Testing](#backend-testing)
    - [Controller](#controller)
      - [AccountController](#accountcontroller)
      - [TransactionController](#transactioncontroller)
      - [FriendController](#friendcontroller)
      - [UserGoalController](#usergoalcontroller)
    - [Service](#service)
      - [AccountService](#accountservice)
        - [`getAll()`](#getall)
        - [`getByID(accountID)`](#getbyidaccountid)
        - [`getByEmail(email)`](#getbyemailemail)
        - [`getByUserName(username)`](#getbyusernameusername)
        - [`updateColorTheme(accountID, newTheme)`](#updatecolorthemeaccountid-newtheme)
        - [`updateCurrency(accountID, newCurrency)`](#updatecurrencyaccountid-newcurrency)
      - [TransactionService](#transactionservice)
        - [`getAllTransactions(accountID)`](#getalltransactionsaccountid)
        - [`getByID(accountID, transactionID)`](#getbyidaccountid-transactionid)
        - [`getTransactionsByMonth(accountID, year, month)`](#gettransactionsbymonthaccountid-year-month)
        - [`getCarbonScoreByMonth(accountID, year, month)`](#getcarbonscorebymonthaccountid-year-month)
        - [`getCarbonScoreByMonthInCategories(accountID, year, month)`](#getcarbonscorebymonthincategoriesaccountid-year-month)
      - [FriendService](#friendservice)
        - [`addByID(accountID, friendID)`](#addbyidaccountid-friendid)
        - [`getAll(accountID)`](#getallaccountid)
        - [`deleteFriend(accountID, friendID)`](#deletefriendaccountid-friendid)
      - [UserGoalService](#usergoalservice)
        - [`createGoal(accountID, goal, year, month)`](#creategoalaccountid-goal-year-month)
        - [`getUserGoals(accountID)`](#getusergoalsaccountid)

## Backend Testing

### Controller

#### AccountController

| Test | Method          | Router                   | Expected Status | Test Status | Result           | Remark                                |
| ---- | --------------- | ------------------------ | --------------- | ----------- | ---------------- | ------------------------------------- |
| 1    | `createRandom`  | Post `/accounts`         | `200`           | `200`       | Pass @04/30/2024 | Create a random account               |
| 2    | `getAll`        | Get `/accounts`          | `200`           | `200`       | Pass @04/30/2024 | Get all existing accounts             |
| 3    | `getByID`       | Get `/accounts/:id`      | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by ID       |
| 4    | `getByEmail`    | Get `/accounts/email`    | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by email    |
| 5    | `getByUserName` | Get `/accounts/username` | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by username |

#### TransactionController

| Test | Method                              | Router                                                             | Expected Status | Test Status | Result           | Remark                                                                     |
| ---- | ----------------------------------- | ------------------------------------------------------------------ | --------------- | ----------- | ---------------- | -------------------------------------------------------------------------- |
| 1    | `createRandom`                      | Post `/accounts/:accountID/transactions`                           | `200`           | `200`       | Pass @04/30/2024 | Create random transactions for an account                                  |
| 2    | `getAllTransactions`                | Get `/accounts/:accountID/transactions`                            | `200`           | `200`       | Pass @04/30/2024 | Get all transactions of an account                                         |
| 3    | `getByID`                           | Get `/accounts/:accountID/transactions/:transactionID`             | `200`           | `200`       | Pass @04/30/2024 | Get a specified transaction of an account                                  |
| 4    | `getCarbonImpact`                   | Get `/accounts/:accountID/transactions/:transactionID/carbonScore` | `200`           | `200`       | Pass @04/30/2024 | Get the carbon score of a transaction                                      |
| 5    | `getByUserName`                     | Get `/accounts/:accountID/carbonScores/monthly`                    | `200`           | `200`       | Pass @04/30/2024 | Get the carbon score for a specific year and month                         |
| 6    | `getCarbonScoreByMonthInCategories` | Get `/accounts/:accountID/carbonScores/monthly/allCategories`      | `200`           | `200`       | Pass @04/30/2024 | Get the carbon score for a specific year and month and group by categories |

#### FriendController

| Test | Method         | Router                                          | Expected Status | Test Status | Result           | Remark                                |
| ---- | -------------- | ----------------------------------------------- | --------------- | ----------- | ---------------- | ------------------------------------- |
| 1    | `addByID`      | Post `/accounts/:accountID/friends/:friendID`   | `200`           | `200`       | Pass @04/30/2024 | Add a friend relationship by their ID |
| 2    | `getAll`       | Get `/accounts/:accountID/friends`              | `200`           | `200`       | Pass @04/30/2024 | Get all friends for an account        |
| 3    | `deleteFriend` | Delete `/accounts/:accountID/friends/:friendID` | `200`           | `200`       | Pass @04/30/2024 | Delete a friendship relation          |

#### UserGoalController

| Test | Method         | Router                               | Expected Status | Test Status | Result           | Remark                              |
| ---- | -------------- | ------------------------------------ | --------------- | ----------- | ---------------- | ----------------------------------- |
| 1    | `createGoal`   | Post `/accounts/:accountID/userGoal` | `200`           | `200`       | Pass @04/30/2024 | Create a goal for a specified month |
| 2    | `getUserGoals` | Get `/accounts/:accountID/userGoal`  | `200`           | `200`       | Pass @04/30/2024 | Get all goals for an account        |

### Service

#### AccountService

```js
    const testAccountID = '12345';
    const testUsername = 'TestW12345';
    const testEmail = 'test@outlook.com';
    testAccount = 
        {
            accountID: testAccountID,
            username: testUsername,
            email: testEmail,
            colorMode: 0,
            currency: 'USD',
            firstName: 'Test',
            lastName: 'Test',
            phone: 'Test',
            address: 'Test',
            state: 'Test',
        }
```

##### `getAll()` 

| Test | Inputs | Expected Outcome   | Test Outcome       | Result           | Remark                     |
| ---- | ------ | ------------------ | ------------------ | ---------------- | -------------------------- |
| 1    | `null` | A list of accounts | A list of accounts | Pass @04/30/2024 | Retrieve all user accounts |

##### `getByID(accountID)`

| Test | Inputs          | Expected Outcome | Test Outcome    | Result           | Remark                                |
| ---- | --------------- | ---------------- | --------------- | ---------------- | ------------------------------------- |
| 1    | `testAccountID` | `[testAccount]`  | `[testAccount]` | Pass @04/30/2024 | Retrieve a user account by account ID |
| 2    | `nonExistentID` | `[]`             | `[]`            | Pass @04/30/2024 | Query for non-existent account ID     |

##### `getByEmail(email)`

| Test | Inputs             | Expected Outcome | Test Outcome    | Result           | Remark                           |
| ---- | ------------------ | ---------------- | --------------- | ---------------- | -------------------------------- |
| 1    | `testEmail`        | `[testAccount]`  | `[testAccount]` | Pass @04/30/2024 | Retrieve a user account by email |
| 2    | `nonExistentEmail` | `[]`             | `[]`            | Pass @04/30/2024 | Query for non-existent email     |

##### `getByUserName(username)`

| Test | Inputs                | Expected Outcome | Test Outcome    | Result           | Remark                              |
| ---- | --------------------- | ---------------- | --------------- | ---------------- | ----------------------------------- |
| 1    | `testUsername`        | `[testAccount]`  | `[testAccount]` | Pass @04/30/2024 | Retrieve a user account by username |
| 2    | `nonExistentUsername` | `[]`             | `[]`            | Pass @04/30/2024 | Query for non-existent username     |

##### `updateColorTheme(accountID, newTheme)`

| Test | Inputs                          | Expected Outcome | Test Outcome     | Result           | Remark                                 |
| ---- | ------------------------------- | ---------------- | ---------------- | ---------------- | -------------------------------------- |
| 1    | `testAccountID`, `newTheme`     | `updatedAccount` | `updatedAccount` | Pass @04/30/2024 | Update the color theme of an account   |
| 2    | `testAccountID`, `invalidTheme` | Catch an error   | Catch an error   | Pass @04/30/2024 | Throw an error for invalid color theme |
| 3    | `invalidAccountID`, `newTheme`  | Catch an error   | Catch an error   | Pass @04/30/2024 | Throw an error for invalid account ID  |

##### `updateCurrency(accountID, newCurrency)`

| Test | Inputs                             | Expected Outcome | Test Outcome     | Result           | Remark                                |
| ---- | ---------------------------------- | ---------------- | ---------------- | ---------------- | ------------------------------------- |
| 1    | `testAccountID`, `newCurrency`     | `updatedAccount` | `updatedAccount` | Pass @04/30/2024 | Update the currency of an account     |
| 2    | `testAccountID`, `invalidCurrency` | Catch an error   | Catch an error   | Pass @04/30/2024 | Throw an error for invalid currency   |
| 3    | `invalidAccountID`, `newCurrency`  | Catch an error   | Catch an error   | Pass @04/30/2024 | Throw an error for invalid account ID |

#### TransactionService

```js
    const testAccountID = '12345';
    const testTransactionID1 = 'abcde';
    const testTransactionID2 = 'abcdf';
    const testYear = 2024;
    const testMonth = 3; // April (0-indexed)
    testAccount = 
        {
            accountID: testAccountID,
            username: 'TestW12345',
            email: 'test@outlook.com',
            colorMode: 0,
            currency: 'USD',
            firstName: 'Test',
            lastName: 'Test',
            phone: 'Test',
            address: 'Test',
            state: 'Test',
        }
    testTransactions = 
        [{
            accountID: testAccountID,
            transactionUUID: testTransactionID1,
            date: new Date(testYear, testMonth, 1),
            carbonScore: 10,
            category: 'Food & Dining',
            amount: 100,
            merchantName: 'Test',
            indicator: 'Test',
            currency: 'Test',
            status: 'Test',
        },
        {
            accountID: testAccountID,
            transactionUUID: testTransactionID2,
            date: new Date(testYear, testMonth, 5),
            carbonScore: 5,
            category: 'Entertainment',
            amount: 200,
            merchantName: 'Test',
            indicator: 'Test',
            currency: 'Test',
            status: 'Test',
        }]
```

##### `getAllTransactions(accountID)` 

| Test | Inputs          | Expected Outcome     | Test Outcome         | Result           | Remark                                   |
| ---- | --------------- | -------------------- | -------------------- | ---------------- | ---------------------------------------- |
| 1    | `testAccountID` | `[testTransactions]` | `[testTransactions]` | Pass @04/30/2024 | Retrieve all transactions for an account |
| 2    | `invalidID`     | `[]`                 | `[]`                 | Pass @04/30/2024 | Query for non-existent account ID        |

##### `getByID(accountID, transactionID)`

| Test | Inputs                                  | Expected Outcome        | Test Outcome            | Result           | Remark                                |
| ---- | --------------------------------------- | ----------------------- | ----------------------- | ---------------- | ------------------------------------- |
| 1    | `testAccountID`, `testTransactionID1`   | `[testTransactions[0]]` | `[testTransactions[0]]` | Pass @04/30/2024 | Retrieve a transaction by ID          |
| 2    | `testAccountID`, `invalidTransactionID` | `[]`                    | `[]`                    | Pass @04/30/2024 | Query for non-existent transaction ID |
| 3    | `nonExistentID`, `testTransactionID2`   | `[]`                    | `[]`                    | Pass @04/30/2024 | Query for non-existent account ID     |

##### `getTransactionsByMonth(accountID, year, month)`

| Test | Inputs                                      | Expected Outcome     | Test Outcome         | Result           | Remark                                     |
| ---- | ------------------------------------------- | -------------------- | -------------------- | ---------------- | ------------------------------------------ |
| 1    | `testAccountID`, `testYear`, `testMonth`    | `[testTransactions]` | `[testTransactions]` | Pass @04/30/2024 | Retrieve transactions for a specific month |
| 2    | `testAccountID`, `testYear`, `AnotherMonth` | `[]`                 | `[]`                 | Pass @04/30/2024 | Query for a month with no transactions     |

##### `getCarbonScoreByMonth(accountID, year, month)`

| Test | Inputs                                      | Expected Outcome | Test Outcome | Result           | Remark                                               |
| ---- | ------------------------------------------- | ---------------- | ------------ | ---------------- | ---------------------------------------------------- |
| 1    | `testAccountID`, `testYear`, `testMonth`    | `15`             | `15`         | Pass @04/30/2024 | Retrieve the total carbon score for a specific month |
| 2    | `testAccountID`, `testYear`, `AnotherMonth` | `0`              | `0`          | Pass @04/30/2024 | Query for a month with no transactions               |

##### `getCarbonScoreByMonthInCategories(accountID, year, month)`

| Test | Inputs                                      | Expected Outcome                                   | Test Outcome                                       | Result           | Remark                                                     |
| ---- | ------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ---------------- | ---------------------------------------------------------- |
| 1    | `testAccountID`, `testYear`, `testMonth`    | object with `Food & Dining: 10` `Entertainment: 5` | object with `Food & Dining: 10` `Entertainment: 5` | Pass @04/30/2024 | Retrieve the carbon score by category for a specific month |
| 2    | `testAccountID`, `testYear`, `AnotherMonth` | object with all properties have a value of 0       | object with all properties have a value of 0       | Pass @04/30/2024 | Query for a month with no transactions                     |

#### FriendService

```js
    const testAccountID = '12345';
    const testFriendID = '54321';
    testAccount = 
        {
            accountID: testFriendID,
            username: 'TestW12345',
            email: 'test@outlook.com',
            colorMode: 0,
            currency: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            phone: 'Test',
            address: 'Test',
            state: 'Test',
        }
```

##### `addByID(accountID, friendID)` 

| Test | Inputs                          | Expected Outcome                                        | Test Outcome                                            | Result           | Remark                                                      |
| ---- | ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ---------------- | ----------------------------------------------------------- |
| 1    | `testAccountID`, `testFriendID` | `{accountID: testAccountID, followingID: testFriendID}` | `{accountID: testAccountID, followingID: testFriendID}` | Pass @04/30/2024 | Add a following relationship by ID                          |
| 2    | `testAccountID`, `testFriendID` | Catch an error                                          | Catch an error                                          | Pass @04/30/2024 | Throw an error if the following relationship already exists |

##### `getAll(accountID)` 

| Test | Inputs          | Expected Outcome                                          | Test Outcome                                              | Result           | Remark                                                    |
| ---- | --------------- | --------------------------------------------------------- | --------------------------------------------------------- | ---------------- | --------------------------------------------------------- |
| 1    | `testAccountID` | `[{accountID: testAccountID, followingID: testFriendID}]` | `[{accountID: testAccountID, followingID: testFriendID}]` | Pass @04/30/2024 | Retrieve all following users of an account                |
| 2    | `invalidID`     | `[]`                                                      | `[]`                                                      | Pass @04/30/2024 | Return an empty array if no friends exist for the account |

##### `deleteFriend(accountID, friendID)` 

| Test | Inputs                          | Expected Outcome | Test Outcome   | Result           | Remark                                                      |
| ---- | ------------------------------- | ---------------- | -------------- | ---------------- | ----------------------------------------------------------- |
| 1    | `testAccountID`, `testFriendID` | `null`           | `null`         | Pass @04/30/2024 | Delete a following relationship by ID                       |
| 2    | `testAccountID`, `testFriendID` | Catch an error   | Catch an error | Pass @04/30/2024 | Throw an error if the following relationship does not exist |

#### UserGoalService

```js
    const testAccountID = '12345';
    const testYear = '2020';
    const testMonth = 'January';
    testAccount = 
        {
            accountID: testAccountID,
            username: 'TestW12345',
            email: 'test@outlook.com',
            colorMode: 0,
            currency: 'Test',
            firstName: 'Test',
            lastName: 'Test',
            phone: 'Test',
            address: 'Test',
            state: 'Test',
        }
```

##### `createGoal(accountID, goal, year, month)` 

| Test | Inputs                                           | Expected Outcome             | Test Outcome                 | Result           | Remark                                       |
| ---- | ------------------------------------------------ | ---------------------------- | ---------------------------- | ---------------- | -------------------------------------------- |
| 1    | `testAccountID`, `3000`, `testYear`, `testMonth` | `createdGoal`                | `createdGoal`                | Pass @04/30/2024 | Create a goal for a specified user and month |
| 2    | `testAccountID`, `2000`, `testYear`, `testMonth` | `updatedGoal with goal=2000` | `updatedGoal with goal=2000` | Pass @04/30/2024 | Update a goal for a specified user and month |
| 3    | `invalidID`, `2000`, `testYear`, `testMonth`     | Catch an error               | Catch an error               | Pass @04/30/2024 | Throw an error if accountID does not exist   |

##### `getUserGoals(accountID)` 

| Test | Inputs          | Expected Outcome | Test Outcome    | Result           | Remark                                                  |
| ---- | --------------- | ---------------- | --------------- | ---------------- | ------------------------------------------------------- |
| 1    | `testAccountID` | A list of goals  | A list of goals | Pass @04/30/2024 | Retrieve all goals of an account                        |
| 2    | `invalidID`     | `[]`             | `[]`            | Pass @04/30/2024 | Return an empty array if retrieving user does not exist |

