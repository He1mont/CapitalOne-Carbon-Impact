## API Design

### Account

#### 1. Create a random account

- GET `/accounts/create-random`

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


#### 2. Get all accounts

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


#### 3. Get an account by accountID

- GET `/accounts/get-by-id/:accountID`

- sample output
    - by account 00428702

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


### Transaction

#### 4. Get all transactions by accountID

- GET `/transaction/get-all/:accountID`

- sample output
    - by account 72965642

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


#### 5. Get a transaction by accountID and transactionID

- GET `/transaction/get-by-id/:accountID/:transactionID`

- sample output
    - by account 72965642
    - by transaction 69082761-2c4e-450b-90bb-5570cd76881e

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

#### 6. Group transaction by date

- GET `/transactions/group-by-date/:accountID`

- sample output
    - by account 41495172 

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


### Login

#### 7. Request for login

- POST `/login/{login_content}`



### Carbon emission goal

#### 8. Get the goal by ?

- GET `/user/goal/?`

#### 9. Set the goal

- POST `/user/goal/:?/{goal}`

#### 10. Modify the goal

- POST `/user/goal/:?/{goal}`

#### 11. Delete the goal

- DELETE `/user/goal/:?`



### Emission factor

#### 12. Store emission factor into database

- POST `/factor/update`

#### 13. Get em from db by factorID

- GET `/factor/:factorID`

#### 14. Calculate carbon emissions for a certain transaction

- GET `/transaction/footprint/:accountID/:transactionID`


