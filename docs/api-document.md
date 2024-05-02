# API Schema

- [API Schema](#api-schema)
  - [Account](#account)
    - [Create a random account](#create-a-random-account)
    - [Get all accounts](#get-all-accounts)
    - [Get an account by username](#get-an-account-by-username)
    - [Get an account by email](#get-an-account-by-email)
    - [Get an account by accountID](#get-an-account-by-accountid)
    - [Update the color theme for an account](#update-the-color-theme-for-an-account)
    - [Update the currency mode for an account](#update-the-currency-mode-for-an-account)
  - [Transaction](#transaction)
    - [Create random transactions for an account](#create-random-transactions-for-an-account)
    - [Get all transactions by accountID](#get-all-transactions-by-accountid)
    - [Get transactions by month](#get-transactions-by-month)
    - [Get a transaction by accountID and transactionID](#get-a-transaction-by-accountid-and-transactionid)
    - [Get carbon score by month](#get-carbon-score-by-month)
    - [Get carbon score by month in categories](#get-carbon-score-by-month-in-categories)
  - [Friends](#friends)
    - [Add a friend by their IDs](#add-a-friend-by-their-ids)
    - [Get all following users for an account](#get-all-following-users-for-an-account)
    - [Delete a following relationship](#delete-a-following-relationship)
  - [User Goals](#user-goals)
    - [Create a user goal](#create-a-user-goal)
    - [Get all goals for an account](#get-all-goals-for-an-account)

## Account
### Create a random account

- POST `/accounts`
- Sample Output
    ```json
    {
        "firstname": "Dudley",
        "creditScore": "343",
        "liveBalance": "false",
        "lastname": "Beahan",
        "accountId": "42636885",
        "developerId": "9febea5fd5281f66cd106858432ff4fc55c3150ec10e33ccfdbee9c81fe019db",
        "phoneNumber": "+44838528746",
        "balance": "1173.0",
        "creditLimit": "0.0",
        "uci": "836632",
        "riskScore": "36",
        "state": "flagged",
        "currencyCode": "GBP",
        "email": "Dudley.Beahan@emailprovider.com",
        "productType": "Debit",
        "homeAddress": "96 Oak Drive, Glasgow, United Kingdom"
    }
    ```

### Get all accounts

- GET `/accounts`
- Sample Output
    ```json
    {
        "Accounts":[
            {
                "id": 10,
                "accountID": "35984412",
                "username": "NaomiC39266",
                "firstName": "Naomi",
                "lastName": "Cassin",
                "email": "Naomi.Cassin@freeemailservice.com",
                "phone": "+44839663691",
                "address": "45 Bank Road, Sheffield, United Kingdom",
                "currency": "GBP",
                "state": "closed",
                "colorMode": 0
            },
            {
                "id": 11,
                "accountID": "84528128",
                "username": "AhmedK60774",
                "firstName": "Ahmed",
                "lastName": "King",
                "email": "Ahmed.King@freeemailservice.com",
                "phone": "+44836122509",
                "address": "37 South Avenue, Ayr, United Kingdom",
                "currency": "GBP",
                "state": "open",
                "colorMode": 0
            },
            {
                "id": 12,
                "accountID": "60905847",
                "username": "WillisG15897",
                "firstName": "Willis",
                "lastName": "Goldner",
                "email": "Willis.Goldner@sendemails.com",
                "phone": "+44834506673",
                "address": "94 Orchard Street, Romford, United Kingdom",
                "currency": "GBP",
                "state": "closed",
                "colorMode": 0
            },
        ]
    }
    ```

### Get an account by username

- GET `/accounts/username`
    - Query Params: `username`
- Sample Output
    ```json
    [
        {
            "id": 10,
            "accountID": "35984412",
            "username": "NaomiC39266",
            "firstName": "Naomi",
            "lastName": "Cassin",
            "email": "Naomi.Cassin@freeemailservice.com",
            "phone": "+44839663691",
            "address": "45 Bank Road, Sheffield, United Kingdom",
            "currency": "GBP",
            "state": "closed",
            "colorMode": 0
        }
    ]
    ```


### Get an account by email

- GET `/accounts/email`
    - Query Params: `email`
- Sample Output
    ```json
    [
        {
            "id": 13,
            "accountID": "25197003",
            "username": "GeorgeannW83460",
            "firstName": "Georgeann",
            "lastName": "Weimann",
            "email": "Georgeann.Weimann@sendemails.com",
            "phone": "+44855659809",
            "address": "36 Lower Drive, Peterborough, United Kingdom",
            "currency": "EUR",
            "state": "flagged",
            "colorMode": 0
        }
    ]
    ```

### Get an account by accountID

- GET `/accounts/:id`
- Sample Output
    ```json
    [
        {
            "id": 16,
            "accountID": "45843190",
            "username": "WhitneyK13015",
            "firstName": "Whitney",
            "lastName": "Koelpin",
            "email": "Whitney.Koelpin@booglemail.co.uk",
            "phone": "+44854344242",
            "address": "8 Richmond Drive, Port Talbot, United Kingdom",
            "currency": "GBP",
            "state": "open",
            "colorMode": 0
        }
    ]
    ```


### Update the color theme for an account

- PATCH `/accounts/:id/color-theme`
    - Body: `newTheme`
- Sample Output
    ```json
    {
        "id": 16,
        "accountID": "45843190",
        "username": "WhitneyK13015",
        "firstName": "Whitney",
        "lastName": "Koelpin",
        "email": "Whitney.Koelpin@booglemail.co.uk",
        "phone": "+44854344242",
        "address": "8 Richmond Drive, Port Talbot, United Kingdom",
        "currency": "GBP",
        "state": "open",
        "colorMode": 2
    }
    ```

### Update the currency mode for an account

- PATCH `/accounts/:id/currency`
    - Body: `newCurr`
- Sample Output
    ```json
    {
        "id": 16,
        "accountID": "45843190",
        "username": "WhitneyK13015",
        "firstName": "Whitney",
        "lastName": "Koelpin",
        "email": "Whitney.Koelpin@booglemail.co.uk",
        "phone": "+44854344242",
        "address": "8 Richmond Drive, Port Talbot, United Kingdom",
        "currency": "USD",
        "state": "open",
        "colorMode": 2
    }
    ```

## Transaction
### Create random transactions for an account

- POST `accounts/:id/transactions`
- Sample Output
    ```json
    {
        "Transactions": [
            {
                "transactionUUID":"02a05558-d94a-42d5-917e-fae9f40eccec",
                "accountUUID":"21950161",
                "merchantUUID":"9",
                "merchant":{
                    "name":"MoonHog",
                    "category":"Gifts & Donations",
                    "description":"Beautiful personal cards for every occasion.",
                    "pointOfSale":["Online"]
                },
                "amount":-1752.43,
                "creditDebitIndicator":"Debit",
                "currency":"AUD",
                "timestamp":"2023-12-24 17:18:05",
                "emoji":"🤑",
                "latitude":-25.031748903392394,
                "longitude":136.29744800030647,
                "status":"Successful",
                "message":"Court damage of 1752.43 (AUD, positive) from MoonHog",
                "pointOfSale":"Online"
            },
            {
                "transactionUUID":"751d6e8c-44f7-408b-8ae4-fbca0a2897ec",
                "accountUUID":"21950161",
                "merchantUUID":"5",
                "merchant":{
                    "name":"Capital Two",
                    "category":"Bills & Utilities",
                    "description":"Credit Card Company",
                    "pointOfSale":["Online"]
                },
                "amount":349.99,
                "creditDebitIndicator":"Debit",
                "currency":"AUD",
                "timestamp":"2024-02-03 21:46:28",
                "emoji":"💸",
                "latitude":-25.741535853065624,
                "longitude":130.63109903034177,
                "status":"Successful",
                "message":"Bills & Utilities purchase of 349.99 (AUD, negative) at Capital Two",
                "pointOfSale":"Online"
            },
            {
                "transactionUUID":"20134545-a6a5-46f9-a5ea-c99508dd5185",
                "accountUUID":"21950161",
                "merchantUUID":"14",
                "merchant":{
                    "name":"Boardwalk Games",
                    "category":"Entertainment",
                    "description":"Events company specialising in board games near the sea.",
                    "pointOfSale":["Online"]
                },
                "amount":210.26,
                "creditDebitIndicator":"Debit",
                "currency":"AUD",
                "timestamp":"2023-09-07 22:51:28",
                "emoji":"🥰",
                "latitude":-27.648646211296764,
                "longitude":134.07231799868683,
                "status":"Successful",
                "message":"Entertainment purchase of 210.26 (AUD, negative) at Boardwalk Games",
                "catointOfSale":"Online"
            },
        ]
    }
    ``` 


### Get all transactions by accountID

- GET `accounts/:id/transactions`
- Sample Output
    ```json
    [
        {
            "id": 71,
            "transactionUUID": "d3077864-973c-4c84-b232-2c987280eb49",
            "accountID": "42636885",
            "merchantName": "McFairbank",
            "category": "Food & Dining",
            "currency": "GBP",
            "amount": -125.9,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2024-01-05T03:31:05.000Z",
            "carbonScore": 139
        },
        {
            "id": 72,
            "transactionUUID": "895380ad-186f-4bdb-b652-d5a2aa3e5995",
            "accountID": "42636885",
            "merchantName": "Masalas",
            "category": "Shopping",
            "currency": "GBP",
            "amount": -58.17,
            "status": "Successful",
            "indicator": "Credit",
            "date": "2024-02-28T22:52:42.000Z",
            "carbonScore": 65
        },
        {
            "id": 73,
            "transactionUUID": "be54d4ee-c640-4b14-affa-6ed238d98adc",
            "accountID": "42636885",
            "merchantName": "Fact News",
            "category": "Education",
            "currency": "GBP",
            "amount": -119.99,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2023-12-15T02:01:24.000Z",
            "carbonScore": 66
        }
    ]
    ```

### Get transactions by month

- GET `accounts/:id/transactions/monthly`
    - Query Params: `month`, `year`
- Sample Output
    ```json
    [
        {
            "id": 3,
            "transactionUUID": "ffb27d0a-654b-4850-9ada-084063a3e82a",
            "accountID": "84528128",
            "merchantName": "CatShoes",
            "category": "Personal Care",
            "currency": "GBP",
            "amount": -79.99,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2024-04-13T06:50:38.000Z",
            "carbonScore": 44
        },
        {
            "id": 7,
            "transactionUUID": "4fd732ea-8d70-411b-9998-77b94b83c635",
            "accountID": "84528128",
            "merchantName": "Car Stickers",
            "category": "Auto & Transport",
            "currency": "GBP",
            "amount": 8829.5,
            "status": "Successful",
            "indicator": "Credit",
            "date": "2024-04-18T17:05:02.000Z",
            "carbonScore": 4856
        },
        {
            "id": 17,
            "transactionUUID": "9600d8f5-1b00-487a-ae09-7c6bc1de135e",
            "accountID": "84528128",
            "merchantName": "Trees Trees Trees",
            "category": "Education",
            "currency": "GBP",
            "amount": -45.61,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2024-04-19T06:13:31.000Z",
            "carbonScore": 26
        },
        {
            "id": 35,
            "transactionUUID": "98674e6d-ac66-4e6e-b6ce-77dadbea9b26",
            "accountID": "84528128",
            "merchantName": "McFairbank",
            "category": "Food & Dining",
            "currency": "GBP",
            "amount": -10.56,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2024-04-08T15:16:33.000Z",
            "carbonScore": 7
        },
    ]
    ```

### Get a transaction by accountID and transactionID

- GET `accounts/:accountID/transactions/:transactionID`
- Sample Output
    ```json
    [
        {
            "id": 1,
            "transactionUUID": "377dee7b-3e28-492f-bba3-e857ba07f92a",
            "accountID": "84528128",
            "merchantName": "Fact News",
            "category": "Education",
            "currency": "GBP",
            "amount": -124.42,
            "status": "Successful",
            "indicator": "Debit",
            "date": "2024-01-22T17:30:07.000Z",
            "carbonScore": 69
        }
    ]
    ```

### Get carbon score by month

- GET `/accounts/:accountID/carbonScores/monthly`
   - Query Params: `month`, `year`
- Sample Output
  ```json
  0
  ```

### Get carbon score by month in categories

- GET `/accounts/:accountID/carbonScores/monthly/allCategories`
   - Query Params: `month`, `year`
- Sample Output
    ```json
    {
        "Entertainment": 71,
        "Education": 33,
        "Shopping": 120,
        "Personal Care": 0,
        "Health & Fitness": 0,
        "Food & Dining": 57,
        "Gifts & Donations": 21,
        "Bills & Utilities": 0,
        "Auto & Transport": 72,
        "Travel": 0
    }
    ```

## Friends
### Add a friend by their IDs

- POST `/accounts/:accountID/friends/:friendID`
- Sample Output
    ```json
    {
        "id": 36,
        "accountID": "31325266",
        "followingID": "84528128"
    }
    ```

### Get all following users for an account

- GET `/accounts/:id/friends`
- Sample Output
    ```json
    [
        {
            "id": 11,
            "accountID": "84528128",
            "username": "AhmedK60774",
            "firstName": "Ahmed",
            "lastName": "King",
            "email": "Ahmed.King@freeemailservice.com",
            "phone": "+44836122509",
            "address": "37 South Avenue, Ayr, United Kingdom",
            "currency": "GBP",
            "state": "open",
            "colorMode": 0
        }
    ]
    ```

### Delete a following relationship

- DELETE `/accounts/:accountID/friends/:friendID`
- Sample Output
    ```json
    null
    ```

## User Goals
### Create a user goal

- POST `/accounts/:id/userGoal`
    - Body: `goal`, `year`, `month`
- Sample Output
    ```json 
    {
        "id": 57,
        "accountID": "25197003",
        "goal": 100,
        "year": "2024",
        "month": "March"
    }
    ```

### Get all goals for an account

- GET `accounts/:id/userGoal`
- Sample Output
    ```json 
    [
        {
            "id": 13,
            "accountID": "84528128",
            "goal": 3000,
            "year": "2022",
            "month": "January"
        },
        {
            "id": 25,
            "accountID": "84528128",
            "goal": 300,
            "year": "2023",
            "month": "April"
        },
        {
            "id": 5,
            "accountID": "84528128",
            "goal": 3000,
            "year": "2023",
            "month": "December"
        }
    ]
    ```
