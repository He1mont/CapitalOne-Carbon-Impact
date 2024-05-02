# Test Document
<details>
  <summary>Table of Content</summary>
  
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
        - [`getBalance(accountID)`](#getbalanceaccountid)
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
</details>


## Backend Testing

### Controller

#### AccountController

| Test | Method             | Router                            | Expected Status | Test Status | Result           | Remark                                |
| ---- | ------------------ | --------------------------------- | --------------- | ----------- | ---------------- | ------------------------------------- |
| 1    | `createRandom`     | Post `/accounts`                  | `200`           | `200`       | Pass @04/30/2024 | Create a random account               |
| 2    | `getAll`           | Get `/accounts`                   | `200`           | `200`       | Pass @04/30/2024 | Get all existing accounts             |
| 3    | `getByID`          | Get `/accounts/:id`               | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by ID       |
| 4    | `getByEmail`       | Get `/accounts/email`             | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by email    |
| 5    | `getByUserName`    | Get `/accounts/username`          | `200`           | `200`       | Pass @04/30/2024 | Get the account specified by username |
| 6    | `getBalance`       | Get `/accounts/:id/balance`       | `200`           | `200`       | Pass @04/30/2024 | Get the balance by ID                 |
| 7    | `updateColorTheme` | Petch `/accounts/:id/color-theme` | `200`           | `200`       | Pass @04/30/2024 | Update the colour theme by ID         |
| 8    | `updateCurrency`   | Petch `/accounts/:id/currency`    | `200`           | `200`       | Pass @04/30/2024 | Update the currency by ID             |

#### TransactionController

| Test | Method                              | Router                                                        | Expected Status | Test Status | Result           | Remark                                                                     |
| ---- | ----------------------------------- | ------------------------------------------------------------- | --------------- | ----------- | ---------------- | -------------------------------------------------------------------------- |
| 1    | `createRandom`                      | Post `/accounts/:accountID/transactions`                      | `200`           | `200`       | Pass @04/30/2024 | Create random transactions for an account                                  |
| 2    | `getAllTransactions`                | Get `/accounts/:accountID/transactions`                       | `200`           | `200`       | Pass @04/30/2024 | Get all transactions of an account                                         |
| 3    | `getTransactionsByMonth`            | Get `/accounts/:accountID/transactions/monthly`               | `200`           | `200`       | Pass @04/30/2024 | Get all transactions of an account for a specific month                    |
| 4    | `getByID`                           | Get `/accounts/:accountID/transactions/:transactionID`        | `200`           | `200`       | Pass @04/30/2024 | Get a specified transaction of an account                                  |
| 5    | `getCarbonScoreByMonth`             | Get `/accounts/:accountID/carbonScores/monthly`               | `200`           | `200`       | Pass @04/30/2024 | Get the carbon score for a specific year and month                         |
| 6    | `getCarbonScoreByMonthInCategories` | Get `/accounts/:accountID/carbonScores/monthly/allCategories` | `200`           | `200`       | Pass @04/30/2024 | Get the carbon score for a specific year and month and group by categories |

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
testAccount = {
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

##### `getBalance(accountID)`

| Test | Inputs          | Expected Outcome       | Test Outcome   | Result           | Remark                                |
| ---- | --------------- | ---------------------- | -------------- | ---------------- | ------------------------------------- |
| 1    | `testAccountID` | Default balance `1000` | `1000`         | Pass @04/30/2024 | Retrieve account balance by accountID |
| 2    | `nonExistentID` | Catch an error         | Catch an error | Pass @04/30/2024 | Query for non-existent account ID     |

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
testAccount = {
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
testTransactions = [
    {
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
    }
]
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


# Cypress Test Documentation for React Components

## Test Document Structure
- [Component Testing](#tests-for-settingbtn-component)
- [FAQS](#tests-for-faqs-component)
- [Friends Component](#tests-for-friends-component)
- [Goals Component](#tests-for-goals-component)
- [Help Component](#tests-for-help-component)
- [History Component](#tests-for-history-component)
- [HomePage Component](#tests-for-homepage-component)
  - [Head Component](#tests-for-head-component)
  - [Mid Component](#tests-for-mid-component)
  - [Low Component](#tests-for-low-component)
- [MyAccount Component](#tests-for-myaccount-component)
- [Transactions Component](#tests-for-transactions-component)

#### Tests for SettingBtn Component
| Test ID | Description                         | Method | Expected Outcome                           | Result               |
|---------|-------------------------------------|--------|--------------------------------------------|----------------------|
| 1       | Navigates on clicking settings      | Click  | Navigate to corresponding settings page    | Pass @04/30/2024 |
| 2       | Navigates back on click             | Click  | Navigate to the previous page in history   | Pass @04/30/2024|
| 3       | Click redirects to homepage         | Click  | Navigate to the homepage                   | Pass @04/30/2024  |
| 4       | Renders footer text correctly       | Render | Display correct copyright text             | Pass @04/30/2024 |

#### Tests for FAQS Component
| Test ID | Description                                            | Method        | Expected Outcome                                        | Result            |
| ------- | ------------------------------------------------------ | ------------- | ------------------------------------------------------- | ------------------|
| 1       | Renders the FAQS page successfully                     | Render        | FAQS page is successfully rendered with the main header | Pass @04/30/2024 |
| 2       | Displays all predefined questions                      | Check         | All predefined questions are visible                    | Pass @04/30/2024      |
| 3       | Updates content when questions are interacted with     | Click         | Content updates to display the answer to the question   | Pass @04/30/2024 |
| 4       | Verifies that all audio play buttons are functional    | Click & Audio | Audio play buttons trigger speech synthesis             | Pass @04/30/2024 |
| 5       | Handles browser history correctly                      | URL Check     | Browser URL reflects the FAQS page route                | Pass @04/30/2024 |
| 6       | Checks that the footer is correctly displayed          | Render        | Footer displays correct copyright text                  | Pass @04/30/2024 |

#### Tests for Friends Component
| Test ID | Description                                       | Method    | Expected Outcome                                              | Result  |
|---------|---------------------------------------------------|-----------|---------------------------------------------------------------|---------|
| 1       | Renders the Friends page with all components      | Render    | All components are visible on the Friends page                | Pass @04/30/2024 |
| 2       | Checks responsiveness on mobile devices           | Viewport  | Friends component should be responsive on mobile devices      | Pass @04/30/2024 |
| 3       | Adjusts layout for mobile view                    | Viewport  | Layout adjusts correctly to fit mobile view without data grid | Pass @04/30/2024 |

#### Tests for Goals Component
| Test ID | Description                                      | Method   | Expected Outcome                                               | Result  |
|---------|--------------------------------------------------|----------|----------------------------------------------------------------|---------|
| 1       | Renders with initial month and user data         | Render   | Correct initial data and month are displayed                   | Pass @04/30/2024|
| 2       | Displays the correct initial month               | Render   | Current month is correctly displayed at initial render         | Pass @04/30/2024 |
| 3       | Changes month when decrease month button clicked | Click    | Display updates to show the previous month                     | Pass @04/30/2024 |
| 4       | Changes month when increase month button clicked | Click    | Display updates to show the next month                         | Pass @04/30/2024 |
| 5       | Renders lower section content                    | Render   | Lower section of the component is visible                      | Pass @04/30/2024 |
| 6       | Redirects unauthenticated users to login         | Redirect | Unauthenticated users are redirected to login upon access      | Pass @04/30/2024 |

#### Tests for Help Component
| Test ID | Description                                       | Method    | Expected Outcome                                              | Result  |
|---------|---------------------------------------------------|-----------|----------------------------------------------------------------|---------|
| 1       | Renders Help page with all components             | Render    | All components on the Help page are visible and functional    | Pass @04/30/2024 |
| 2       | Checks logo and navigation button presence        | Existence | Logo image and go back button are present                     | Pass @04/30/2024 |
| 3       | Verifies mid-section content                      | Existence | Help-center image is present                                  | Pass @04/30/2024 |
| 4       | Checks form functionality                         | Input     | Input field and submit button work as expected                | Pass @04/30/2024 |
| 5       | Verifies button functionality and popups          | Click     | Buttons function and associated popups are correctly displayed| Pass @04/30/2024|
| 6       | Assesses responsive design                        | Viewport  | Design adjusts correctly for mobile devices                   | Pass @04/30/2024|
| 7       | Evaluates accessibility of the first button       | Focus     | First button meets accessibility standards                    | Pass @04/30/2024 |

#### Tests for History Component
| Test ID | Description                                      | Method    | Expected Outcome                                               | Result  |
|---------|--------------------------------------------------|-----------|----------------------------------------------------------------|---------|
| 1       | Renders the History page                         | Render    | History page is rendered with "Carbon History" title           | Pass @04/30/2024|
| 2       | Handles API errors gracefully                    | API       | API errors are handled without crashing the page               | Pass @04/30/2024 |
| 3       | Displays the correct title                       | Existence | "Carbon History" title exists                                  | Pass @04/30/2024 |
| 4       | Renders month selector with the current month    | Render    | Month selector displays the correct initial month              | Pass @04/30/2024 |
| 5       | Renders month range selector buttons             | Existence | Month selector buttons are correctly rendered                  | Pass @04/30/2024|
| 6       | Toggles category visibility on button click      | Click     | Category buttons toggle visibility of categories               | Pass @04/30/2024|
| 7       | Updates the month range when buttons clicked     | Click     | Clicking month buttons updates the month range correctly       | Pass @04/30/2024 |
| 8       | Navigates to home on logo click                  | Navigation| Clicking the logo navigates to the homepage                    | Pass @04/30/2024 |

#### Tests for HomePage Component
| Test ID | Description                           | Method    | Expected Outcome                                   | Result  |
|---------|---------------------------------------|-----------|----------------------------------------------------|---------|
| 1       | Renders HomePage with key components  | Render    | HomePage loads with necessary sections             | Pass @04/30/2024|

#### Tests for Head Component
| Test ID | Description                      | Method | Expected Outcome                        | Result  |
|---------|----------------------------------|--------|-----------------------------------------|---------|
| 1       | Renders logo and settings button | Render | Logo and settings button are visible    | Pass @04/30/2024|

#### Tests for Mid Component
| Test ID | Description                             | Method | Expected Outcome                                     | Result  |
|---------|-----------------------------------------|--------|------------------------------------------------------|---------|
| 1       | Shows login prompt and carbon impact    | Render | Login prompt and carbon impact information displayed | Pass @04/30/2024|
| 2       | Displays user name when logged in       | Render | User's name is displayed if logged in                | Pass @04/30/2024 |

#### Tests for Low Component
| Test ID | Description                           | Method   | Expected Outcome                                  | Result  |
|---------|---------------------------------------|----------|---------------------------------------------------|---------|
| 1       | Renders buttons and handles navigation| Navigate | Buttons render and navigate correctly             | Pass @04/30/2024 |

#### Tests for MyAccount Component
| Test ID | Description                                     | Method    | Expected Outcome                                               | Result  |
|---------|-------------------------------------------------|-----------|----------------------------------------------------------------|---------|
| 1       | Renders MyAccount page with all components      | Render    | All components on the MyAccount page are visible and functional| Pass @04/30/2024  |
| 2      | Checks responsiveness on mobile devices              | Responsive   | UI elements adjust properly on mobile viewports                  | Pass @04/30/2024|
| 3       | Validates accessibility standards                    | Accessibility| Focusable elements meet accessibility standards                  | Pass @04/30/2024  |
| 4       | Checks the visibility and functionality of UI elements for updating account info | Functional  | UI elements for updating information are visible and operational | Pass @04/30/2024  |

#### Tests for Transactions Component
| Test ID | Description                                | Method    | Expected Outcome                                            | Result  |
|---------|--------------------------------------------|-----------|-------------------------------------------------------------|---------|
| 1       | Renders Transactions page with all elements| Render    | All main components of the Transactions page are visible    |  Pass @04/30/2024 |
| 2       | Displays the correct initial month         | Date Check| Current month is displayed correctly on the Transactions page|  Pass @04/30/2024 |
| 3       | Sorts transactions by amount               | Sort Check| Transactions are sortable by amount                         |  Pass @04/30/2024 |
