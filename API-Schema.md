# API Design

## Account

### 1. Create a random account

- POST `/accounts/create-random`

- sample output

    ```json
    {
        "Accounts": [
            {
                "accountId": "66512652",
                "firstname": "Blondell",
                "phoneNumber": "+44873425431",
                "developerId": "123",
                "uci": "103583",
                "riskScore": "22",
                "creditScore": "450",
                "currencyCode": "GBP",
                "productType": "Credit",
                "email": "Blondell.Bartell@emailservice.co.uk",
                "lastname": "Bartell",
                "homeAddress": "72 Richard Road, Oxford, United Kingdom",
                "state": "open",
                "creditLimit": "1000",
                "balance": "1000",
                "liveBalance": "true"
            }
        ]
    }
    ```


### 2. Get all accounts

- GET `/accounts/get-all`

- sample output

    ```json
    {
        "Accounts":[
            {
                "creditScore":"390",
                "firstname":"Jackqueline",
                "liveBalance":"false",
                "lastname":"Reichel",
                "accountId":"26639675",
                "phoneNumber":"+44896761206",
                "developerId":"9febea5fd5281f66cd106858432ff4fc55c3150ec10e33ccfdbee9c81fe019db",
                "balance":"781",
                "creditLimit":"781",
                "uci":"307156",
                "riskScore":"30",
                "state":"suspended",
                "currencyCode":"GBP",
                "productType":"Credit",
                "email":"Jackqueline.Reichel@freeemailservice.com",
                "homeAddress":"78 Country Drive, Thornbury, United Kingdom"
            },
            {
                "creditScore":"489",
                "firstname":"Marine",
                "liveBalance":"false",
                "lastname":"Block",
                "accountId":"52434597",
                "phoneNumber":"+44881492542",
                "developerId":"9febea5fd5281f66cd106858432ff4fc55c3150ec10e33ccfdbee9c81fe019db",
                "balance":"224",
                "creditLimit":"0",
                "uci":"421302",
                "riskScore":"80",
                "state":"closed",
                "currencyCode":"EUR",
                "productType":"Debit",
                "email":"Marine.Block@emailshere.com",
                "homeAddress":"94 Oliver Street, Irvine, United Kingdom"
            },
            {
                "creditScore":"332",
                "firstname":"Shakira",
                "liveBalance":"false",
                "lastname":"Von",
                "accountId":"11948520",
                "phoneNumber":"+44806755286",
                "developerId":"9febea5fd5281f66cd106858432ff4fc55c3150ec10e33ccfdbee9c81fe019db",
                "balance":"1462",
                "creditLimit":"1462",
                "uci":"084989",
                "riskScore":"42",
                "state":"flagged",
                "currencyCode":"EUR",
                "productType":"Credit",
                "email":"Shakira.Von@bmail.com",
                "homeAddress":"79 Fairbank Close, Durham, United Kingdom"
            }
        ]
    }
    ```


### 3. Get an account by accountID

- GET `/accounts/get-by-id/:accountID`

- sample output
    - by account `00428702`

    ```json
        {
            "Accounts": [
                {
                    "accountId": "00428702",
                    "firstname": "Orval",
                    "phoneNumber": "+44863579571",
                    "developerId": "123",
                    "uci": "856747",
                    "riskScore": "35",
                    "creditScore": "600",
                    "currencyCode": "GBP",
                    "productType": "Debit",
                    "email": "Orval.Schuster@sendemails.com",
                    "lastname": "Schuster",
                    "homeAddress": "18 Fairbank Avenue, Bexleyheath, United Kingdom",
                    "state": "open",
                    "creditLimit": "0",
                    "balance": "1000",
                    "liveBalance": "false"
                }
            ]
        }
    ```

### 4. Get an account by email

- GET `/accounts/get-by-email/:email`
- Return the corresponding accountID if the email is found; otherwise print an error message.

- sample output
    - by email `Hunter.Schroeder@emailshere.com`

    ```json
        "04295728"
    ```


## Transaction
### 5. Create 3 random transactions by accountID

- POST `/transaction/create-random/:accountID`

- sample output
    - by account `21950161`

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


### 6. Get all transactions by accountID

- GET `/transaction/get-all/:accountID`

- sample output
    - by account `72965642`

    ```json
        {
            "Transactions": [
                {
                    "transactionUUID": "0673bca4-fbb2-46bd-aa76-36243305ceed",
                    "accountUUID": "72965642",
                    "merchant": {
                        "name": "Capital Two",
                        "category": "Bills & Utilities",
                        "description": "Credit Card Company",
                        "pointOfSale": ["Online"]
                    },
                    "amount": 843.92,
                    "creditDebitIndicator": "Debit",
                    "currency": "GBP",
                    "timestamp": "2019-05-20 10:51:33",
                    "emoji": "🤑",
                    "latitude": -4.38849,
                    "longitude": 52.33594,
                    "status": "Successful",
                    "message": "Weekly groceries shopping",
                    "pointOfSale": "Online"
                },
                {
                    "transactionUUID": "093c805f-31c1-4721-8642-b7e9a09964f0",
                    "accountUUID": "72965642",
                    "merchant": {
                        "name": "Blahbucks",
                        "category": "Food & Dining",
                        "description": "Supplying all your coffee needs",
                        "pointOfSale": ["In-store"]
                    },
                    "amount": 517.06,
                    "creditDebitIndicator": "Credit",
                    "currency": "GBP",
                    "timestamp": "2019-07-09 11:47:47",
                    "emoji": "🥰",
                    "latitude": -1.86852,
                    "longitude": 53.39733,
                    "status": "Successful",
                    "message": "Holiday souvenirs",
                    "pointOfSale": "In-store"
                }
            ]
        }
    ```

### 7. Get a transaction by accountID and transactionID

- GET `/transaction/get-by-id/:accountID/:transactionID`

- sample output
    - by account `72965642`
    - by transaction `69082761-2c4e-450b-90bb-5570cd76881e`

    ```json
        {
            "Transactions": [
                {
                    "transactionUUID": "69082761-2c4e-450b-90bb-5570cd76881e",
                    "accountUUID": "72965642",
                    "merchant": {
                        "name": "Capital Two",
                        "category": "Bills & Utilities",
                        "description": "Credit Card Company",
                        "pointOfSale": ["Online"]
                    },
                    "amount": 12.98,
                    "creditDebitIndicator": "Credit",
                    "currency": "INR",
                    "timestamp": "2019-10-25 08:19:03",
                    "emoji": "🧐",
                    "latitude": -3.67859,
                    "longitude": 53.6952,
                    "status": "Pending",
                    "message": "Back to school essentials",
                    "pointOfSale": "Online"
                }
            ]
        }
    ```

### 8. Group daily transactions by accountID

- GET `/transactions/group-by-date/:accountID`

- sample output
    - by account `41495172`

    ```json
        {
            "2023-08-05":[
                {
                    "transactionUUID":"946a7fb9-5840-44c2-b345-8f7c956bb485",
                    "accountUUID":"41495172",
                    "merchantUUID":"10",
                    "merchant":{
                        "name":"Car Stickers",
                        "category":"Auto & Transport",
                        "description":"High quality car racing stickers, that are used at races.",
                        "pointOfSale":["Online","In-store"]
                    },
                    "amount":-119.99,
                    "creditDebitIndicator":"Debit",
                    "currency":"GBP",
                    "timestamp":"2023-08-05 00:45:04",
                    "emoji":"🤑",
                    "latitude":54.57446014496158,
                    "longitude":-2.0238078261677312,
                    "status":"Successful",
                    "message":"Weekly wage of 119.99 (GBP, positive) from Car Stickers",
                    "pointOfSale":"In-store"
                }
            ],
            "2023-07-07":[
                {
                    "transactionUUID":"5ae57e7a-7736-4070-9ae1-155f16d3545a",
                    "accountUUID":"41495172",
                    "merchantUUID":"10",
                    "merchant":{
                        "name":"Car Stickers",
                        "category":"Auto & Transport",
                        "description":"High quality car racing stickers, that are used at races.",
                        "pointOfSale":["Online","In-store"]
                    },
                    "amount":-166.25,
                    "creditDebitIndicator":"Debit",
                    "currency":"GBP",
                    "timestamp":"2023-07-07 07:03:38",
                    "emoji":"💸",
                    "latitude":53.74239147512421,
                    "longitude":-0.815154545152708,
                    "status":"Successful",
                    "message":"Weekly wage of 166.25 (GBP, positive) from Car Stickers",
                    "pointOfSale":"Online"
                }
            ]
        }
    ```


## Friends
### 9. Create a username

- POST `/friend/create-username/:accountID`

    - Automatically generate a username: `firstname + lastname + '_' + accountID`
    - Store in the database `Friend`
    - If the user already has a username, an error will be reported:
        ```json
            {
                errorCode: 130,
                message: "This user has already have a username.",
            }
        ```

- sample output
    - by account `48151457`
    ```json
        {"id":1,"username":"FelipeMcLaughlin_48151457","accountID":"48151457"}
    ```

### 10. Get the accountID by username

- GET `/friend/get-id/:username`

    - If the username is not exist in the database, an error will be reported:
    ```json
        {
            errorCode: 131,
            message: "Can't find this friend.",
        }
    ```

- sample output
    - by username `FelipeMcLaughlin_48151457`
    ```json
        {"accountID":"48151457"}
    ```

## User Goals

### 11. Create a user goal

- POST `/userGoal/create-goal/:id/:goal`
- if the there already is a goal for that id update the goal else create a new one

- sample output
    -  id `48151457` goal `5000`

```json 
{
    "message":"User goal created successfully" 
}
```

### 12. Delete a user goal

- DELETE `/userGoal/delete-goal/:id`
- id `48151457`
 ```json 
 {
    "message":"User goal deleted successfully" 
}
 ```

### 13. Get a users goal from the database

- id `48151457`
 ```json 
{
    "id": 1,
    "accountID": "48151457",
    "goal": "5000"
}
```

## Carbon Goal
### Create a goal

- POST `/carbon-goal/create/:accountID/{goal}`

    - `goal`: Int
    - Store in the database `UserGoals`

### Get the goal by accountID

- GET `/carbon-goal/get/:accountID`

### Modify the goal

- POST `/carbon-goal/update/:accountID/{goal}`

### Delete the goal

- DELETE `/carbon-goal/delete/:accountID`


## Carbon Impact
### Calculate the carbon impact for one transaction

- POST `/carbon-footprint/calculate-one/:accountID/:transactionID`

    - Store in the database `Transaction`

### Calculate the total carbon impact

- GET `/carbon-footprint/get-all/:accountID`

    - Using the carbon score stored in the database `Transaction`



