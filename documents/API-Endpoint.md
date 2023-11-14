# API Design

>   **Data Access from Capital One's Developer API**	([*reference*](https://developer.capitalone.co.uk/docs/dataAccess))
>
>  -   Customer Accounts
>         - Bulk account data: POST `/accounts/create` GET `/accounts/`
>         - Specific account data: GET `/accounts/$account-id`
>  -   Customer Transactions
>         - Bulk account data: POST`/transactions/accounts/$accountID/create` POST`/transactions/accounts/$accountID/create` GET`transactions/accounts/$accountID/transactions`
>         - Specific account data: GET`transactions/accounts/$accountID/transactions/$transactionID`
>  -   Pseudo Fraudulent Transactions
>         - Bulk account data: POST`/fraud/transactions/accounts/$accountId/create`



## 1. Customer Accounts



#### 1) CREATE : A Random Account

-  Router: POST `/accounts/create`

-  Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`authJWT` (required)| The JWT you were issued when you submit your code on the profile page.|
|`quantity` (required)| The number of accounts you wish to create. You can create up to 25 at one time.|
|`numTransactions` (optional)| The number of transactions you wish to create. You can create up to 25 at one time. Missing parameter generates 0 transactions.|
|`liveBalance` (optional)| A Boolean flag denoting whether the account balance should be affected by the transactions generated. Missing parameter sets this to true by default.|

-  Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`ccountId`| The unique account ID for the account.|
|`firstname`| The first name of the account holder.|
|`phoneNumber`|	A fake phone number for the account.|
|`developerId`|	The Developer ID associated with you JWT.|
|`uci`|	A Unique Customer Identifier associated with the account.|
|`riskScore`| A risk score associated with the account.|
|`creditScore`|	The credit score associated with the account holder.|
|`currencyCode`| The main currency type for the account.|
|`productType`|	The product type associated with the account.|
|`email`| The fake email addresses associated with the account.|
|`lastname`| The last name of the account holder.|
|`homeAddress`|	Fake home address of the account holder.|
|`state`| The state of the account.|
|`creditLimit`|	The credit limit associated with the account.|
|`balance`|	The balance associated with the debit account.|
|`liveBalance`| A flag denoting whether transactions generated on this account will affect its balance.|

-   Example Output

```JSON
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



#### 2) CREATE: A Custom Account

-   Router: POST `/accounts/create`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`authJWT` (required)| The JWT you were issued when you submit your code on the profile page.|
|`quantity` (required)|	The number of accounts you wish to create. You can create up to 25 at one time.|
|`numTransactions` (optional)|	The number of transactions you wish to create. You can create up to 25 at one time. Missing parameter generates 0 transactions.|
|`liveBalance` (optional)|	A Boolean flag denoting whether the account balance should be affected by the transactions generated. Missing parameter sets this to true by default.|
|`balance` (optional)|	The balance associated with the debit account.|
|`creditScore` (optional)	|The credit score associated with the account holder.|
|`currencyCode` (optional)|	The main currency type for the account.|
|`productType` (optional)|	The product type associated with the account. The value can only be either Credit or Debit.|
|`riskScore` (optional)| A risk score associated with the account.|
|`state` (optional)| The state of the account. The value can only be one of open, closed, suspended or flagged.|
|`creditLimit` (optional)|	The credit limit associated with the account.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountId`| The unique account ID for the account.|
|`firstname`| The first name of the account holder.|
|`phoneNumber`|	A fake phone number for the account.|
|`developerId`|	The Developer ID associated with you JWT.|
|`uci`|	A Unique Customer Identifier associated with the account.|
|`riskScore`| A risk score associated with the account.|
|`creditScore`|	The credit score associated with the account holder.|
|`currencyCode`| The main currency type for the account.|
|`productType`|	The product type associated with the account.|
|`email`| The fake email addresses associated with the account.|
|`lastname`| The last name of the account holder.|
|`homeAddress`|	Fake home address of the account holder.|
|`state`| The state of the account.|
|`creditLimit`|	The credit limit associated with the account.|
|`balance`|	The balance associated with the debit account.|
|`liveBalance`|	A flag denoting whether transactions generated on this account will affect its balance.|

-   Example Output

``` JSON
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



#### 3) GET: All Accounts

-   Router: GET `\accounts`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`authJWT` (required)| The JWT you were issued when you submit your code on the profile page.|

-   Account Filtering

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`filterKey`| The transaction field you want to filter by. Currently supported fields: `state`, `currencyCode`, `productType`, `balance`, `creditScore`, `creditLimit`, `riskScore`.|
|`filterRelation`|	One of the following filters: `eq` - equal, `lt` - less than, `lte` - less than or equal, `gt` - greater than, `gte` - greater than or equal.|
|`filterValue`|	The value used to filter the account.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountId`| The unique account ID for the account.|
|`firstname`| The first name of the account holder.|
|`phoneNumber`|	A fake phone number for the account.|
|`developerId`|	The Developer ID associated with you JWT.|
|`uci`|	A Unique Customer Identifier associated with the account.|
|`riskScore`| A risk score associated with the account.|
|`creditScore`|	The credit score associated with the account holder.|
|`currencyCode`| The main currency type for the account.|
|`productType`|	The product type associated with the account.|
|`email`| The fake email addresses associated with the account.|
|`lastname`| The last name of the account holder.|
|`homeAddress`|	Fake home address of the account holder.|
|`state`| The state of the account.|
|`creditLimit`|	The credit limit associated with the account.|
|`balance`|	The balance associated with the debit account.|
|`liveBalance`|	A flag denoting whether transactions generated on this account will affect its balance.|

-   Example Output

```JSON
{
    "Accounts": [
        {
            "accountId": "74758678",
            "firstname": "Arlie",
            "phoneNumber": "+44832803017",
            "developerId": "123",
            "uci": "721025",
            "riskScore": "36",
            "creditScore": "500",
            "currencyCode": "GBP",
            "productType": "Debit",
            "email": "Arlie.Hane@emailprovider.com",
            "lastname": "Hane",
            "homeAddress": "9 Denver Road, Southend-on-Sea, United Kingdom",
            "state": "open",
            "creditLimit": "0",
            "balance": "2390",
            "liveBalance": "true"
        },
        {
            "accountId": "55709917",
            "firstname": "Renita",
            "phoneNumber": "+44856211602",
            "developerId": "123",
            "uci": "296089",
            "riskScore": "26",
            "creditScore": "390",
            "currencyCode": "GBP",
            "productType": "Credit",
            "email": "Renita.Schowalter@freeemailservice.com",
            "lastname": "Schowalter",
            "homeAddress": "85 Young Street, Carlisle, United Kingdom",
            "state": "open",
            "creditLimit": "1200",
            "balance": "1200",
            "liveBalance": "false"
        }
    ]
}
```



#### 4) GET: An account by ID

-   Router: GET `/accounts/$account-id`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`authJWT` (required)|	The JWT you were issued when you submit your code on the profile page.|
|`accountID` (required)| The Account ID of the account you're looking for.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountId`| The unique account ID for the account.|
|`firstname`| The first name of the account holder.|
|`phoneNumber`|	A fake phone number for the account.|
|`developerId`|	The Developer ID associated with you JWT.|
|`uci`|	A Unique Customer Identifier associated with the account.|
|`riskScore`| A risk score associated with the account.|
|`creditScore`|	The credit score associated with the account holder.|
|`currencyCode`| The main currency type for the account.|
|`productType`|	The product type associated with the account.|
|`email`| The fake email addresses associated with the account.|
|`lastname`| The last name of the account holder.|
|`homeAddress`|	Fake home address of the account holder.|
|`state`| The state of the account.|
|`creditLimit`|	The credit limit associated with the account.|
|`balance`|	The balance associated with the debit account.|
|`liveBalance`|	A flag denoting whether transactions generated on this account will affect its balance.|

-   Example Output

```JSON
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



## 2. Customer Transactions



#### 1) CREATE: A Transaction

-   Router: POST `/transactions/accounts/$accountID/create`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountID` (required)| The Account ID of the account you're looking to populate with transactions.|
|`authJWT` (required)|	The JWT you were issued when you submit your code on the profile page.|
|`quantity` (required)|	The number of transactions you wish to create. You can create up to 25 at one time.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`transactionUUID`|	A unique transaction ID.|
|`accountUUID`|	A unique account ID.|
|`merchant`| The merchant associated with the transaction.|
|`amount`|	The amount of money associated with the transaction.|
|`creditDebitIndicator`| Indicated whether the transaction is a credit or debit entry.|
|`currency`| Currency of the transaction.|
|`timestamp`| A timestamp of when the transaction was made.|
|`emoji`| An emoji generated depending on the status of the transaction.|
|`latitude`| Latitude of the transaction location.|
|`longitude`| Longitude of the transaction location.|
|`status`|	The transaction status.|
|`message`|	A message associated with the transaction.|
|`pointOfSale`|	The location of where the transaction took place.|

-   Example Output

```JSON
{
    "Transactions": [
        {
            "transactionUUID": "69082761-2c4e-450b-90bb-5570cd76881e",
            "accountUUID": "72965642",
            "merchant": {
                "name": "Blahbucks",
                "category": "Food & Dining",
                "description": "Supplying all your coffee needs",
                "pointOfSale": ["In-store"]
            },
            "amount": 12.98,
            "creditDebitIndicator": "Credit",
            "currency": "INR",
            "timestamp": "2019-10-25 08:19:03",
            "emoji": "🧐",
            "latitude": -3.67859,
            "longitude": 53.6952,
            "status": "Pending",
            "message": "Weekly groceries shopping",
            "pointOfSale": "Online"
        },
        {
            "transactionUUID": "093c805f-31c1-4721-8642-b7e9a09964f0",
            "accountUUID": "72965642",
            "merchant": {
                "name": "Capital Two",
                "category": "Bills & Utilities",
                "description": "Credit Card Company",
                "pointOfSale": ["Online"]
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
        },
        {
            "transactionUUID": "aab19435-cbf4-41ba-afbb-f6c3f534b61c",
            "accountUUID": "72965642",
            "merchant": {
                "name": "Pear Retail",
                "category": "Shopping",
                "description": "Computers, phones and other shiny electrical things",
                "pointOfSale": ["Online", "In-store"]
            },
            "amount": 7.29,
            "creditDebitIndicator": "Debit",
            "currency": "EUR",
            "timestamp": "2019-06-24 15:52:22",
            "emoji": "😭",
            "latitude": 1.06146,
            "longitude": 52.53199,
            "status": "Declined",
            "message": "Housewarming gift",
            "pointOfSale": "In-store"
        }
    ]
}
```



#### 2) CREATE: A Custom Transaction

-   Router: POST `/transactions/accounts/$accountID/create`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountID` (required)| The Account ID of the account you're looking to populate with transactions.|
|`authJWT` (required)|	The JWT you were issued when you submit your code on the profile page.|
|`transactions` (required)|	Custom transaction data sent by the user that will be used to generate transactions with custom values. This field cannot be provided when the quantity is also provided. The transactions value should be a list of dictionaries, where each dictionary contains the custom data for 1 transaction. i.e. `{"transactions": [{"amount": 3.45}]}` would generate 1 transaction with amount equal to 3.45. All other fields remain randomised.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`transactionUUID`|	A unique transaction ID.|
|`accountUUID`|	A unique account ID.|
|`merchant`| The merchant associated with the transaction.|
|`amount`|	The amount of money associated with the transaction.|
|`creditDebitIndicator`| Indicated whether the transaction is a credit or debit entry.|
|`currency`| Currency of the transaction.|
|`timestamp`| A timestamp of when the transaction was made.|
|`emoji`| An emoji generated depending on the status of the transaction.|
|`latitude`| Latitude of the transaction location.|
|`longitude`| Longitude of the transaction location.|
|`status`|	The transaction status.|
|`message`|	A message associated with the transaction.|
|`pointOfSale`|	The location of where the transaction took place.|

-   Example Output

```JSON
{
    "Transactions": [
        {
            "transactionUUID": "69082761-2c4e-450b-90bb-5570cd76881e",
            "accountUUID": "72965642",
            "merchant": {
                "name": "Blahbucks",
                "category": "Food & Dining",
                "description": "Supplying all your coffee needs",
                "pointOfSale": ["In-store"]
            },
            "amount": 1.23,
            "creditDebitIndicator": "Credit",
            "currency": "USD",
            "timestamp": "2019-10-25 08:19:03",
            "emoji": "🧐",
            "latitude": -3.67859,
            "longitude": 53.6952,
            "status": "Pending",
            "message": "Weekly groceries shopping",
            "pointOfSale": "Online"
        },
        {
            "transactionUUID": "093c805f-31c1-4721-8642-b7e9a09964f0",
            "accountUUID": "72965642",
            "merchant": {
                "name": "Capital Two",
                "category": "Bills & Utilities",
                "description": "Credit Card Company",
                "pointOfSale": ["Online"]
            },
            "amount": 517.06,
            "creditDebitIndicator": "Credit",
            "currency": "INR",
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



#### 3) GET: All Transcations

-   Router: GET `transactions/accounts/$accountID/transactions`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountID` (required)| The Account ID of the account you're looking to fetch all transactions for.|
|`authJWT` (required)| The JWT you were issued when you submit your code on the profile page.|

-   Transaction Filtering

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`filterKey`| The transaction field you want to filter by. Currently supported fields: merchantUUID, amount, creditDebitIndicator, currency, status.|
|`filterRelation`| One of the following filters: eq - equal, lt - less than, lte - less than or equal, gt - greater than, gte - greater than or equal.|
|`filterValue`|	The value used to filter the transactions.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`transactionUUID`|	A unique transaction ID.|
|`accountUUID`|	A unique account ID.|
|`merchant`| The merchant associated with the transaction.|
|`amount`|	The amount of money associated with the transaction.|
|`creditDebitIndicator`| Indicated whether the transaction is a credit or debit entry.|
|`currency`| Currency of the transaction.|
|`timestamp`| A timestamp of when the transaction was made.|
|`emoji`| An emoji generated depending on the status of the transaction.|
|`latitude`| Latitude of the transaction location.|
|`longitude`| Longitude of the transaction location.|
|`status`|	The transaction status.|
|`message`|	A message associated with the transaction.|
|`pointOfSale`|	The location of where the transaction took place.|

-   Example Output

```JSON
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



#### 4) GET: Transactions By ID

-   Router: GET `transactions/accounts/$accountID/transactions/$transactionID`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountID` (required)| The Account ID of the account you're looking to fetch a specific transaction for.|
|`transactionID` (required)| The Transaction ID of the transaction you're looking for within the account.|
|`authJWT` (required)| The JWT you were issued when you submit your code on the profile page.|

-   Response Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`transactionUUID`|	A unique transaction ID.|
|`accountUUID`|	A unique account ID.|
|`merchant`| The merchant associated with the transaction.|
|`amount`|	The amount of money associated with the transaction.|
|`creditDebitIndicator`| Indicated whether the transaction is a credit or debit entry.|
|`currency`| Currency of the transaction.|
|`timestamp`| A timestamp of when the transaction was made.|
|`emoji`| An emoji generated depending on the status of the transaction.|
|`latitude`| Latitude of the transaction location.|
|`longitude`| Longitude of the transaction location.|
|`status`|	The transaction status.|
|`message`|	A message associated with the transaction.|
|`pointOfSale`|	The location of where the transaction took place.|

-   Example Output

```JSON
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



#### 5) Transaction Merchant

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`name`| The name of the merchant.|
|`category`| The merchant's area of business. Will be one of: `Entertainment`, `Education`, `Shopping`, `Personal Care`, `Health & Fitness`, `Food & Dining`, `Gifts & Donations`, `Bills & Utilities`, `Auto & Transport` or `Travel`|
|`description`|	A short description of the merchant.|
|`pointOfSale`|	Where the merchant accepts payments, either In-store, Online or both.|

-   Example Output

```JSON
{
    "name": "Capital Two",
    "category": "Bills & Utilities",
    "description": "Credit Card Company",
    "pointOfSale": ["Online"]
}
```



## 3. Pseudo Fraudulent Transactions



#### 1) CREATE: Pseudo Fraudulent Transactions

-   Router: POST `/fraud/transactions/accounts/$accountId/create`

-   Request Arguments

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`accountID` (required)| The Account ID of the account you're looking to populate with transactions.|
|`authJWT` (required)| The JWT you were issued when you submitted your code on the profile page.|
|`fraudType` (optional)| The type of pseudo fraudulent transaction(s) you wish to create. Available values: overseasSpending, multipleDeclined, unusuallyLarge.|

-   Fraud Type Options

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`overseasSpending`| Creates a transaction with mismatching currency and latitude/longitude.|
|`multipleDeclined`| Creates 3-25 transactions with status set as "Declined".|
|`unusuallyLarge`| Creates a transaction with a larger than usual amount.|

-   Response Content

| Parameters    | Description                         |
| ------------- | ----------------------------------- |
|`transactionUUID`|	A unique transaction ID.|
|`accountUUID`|	A unique account ID.|
|`merchant`| The merchant associated with the transaction.|
|`amount`|	The amount of money associated with the transaction.|
|`creditDebitIndicator`| Indicated whether the transaction is a credit or debit entry.|
|`currency`| Currency of the transaction.|
|`timestamp`| A timestamp of when the transaction was made.|
|`emoji`| An emoji generated depending on the status of the transaction.|
|`latitude`| Latitude of the transaction location.|
|`longitude`| Longitude of the transaction location.|
|`status`|	The transaction status.|
|`message`|	A message associated with the transaction.|
|`pointOfSale`|	The location of where the transaction took place.|

-   Example Output

```JSON
{
    "Transactions": [
        {
            "transactionUUID": "69082761-2c4e-450b-90bb-5570cd76881e",
            "accountUUID": "72965642",
            "merchantUUID": "36273823",
            "amount": 12.98,
            "creditDebitIndicator": "Credit",
            "currency": "INR",
            "timestamp": "2019-10-25 08:19:03",
            "emoji": "🧐",
            "latitude": -3.67859,
            "longitude": 53.6952,
            "status": "Declined",
            "message": "Weekly groceries shopping",
            "pointOfSale": "Online"
        },
        {
            "transactionUUID": "093c805f-31c1-4721-8642-b7e9a09964f0",
            "accountUUID": "72965642",
            "merchantUUID": "36273823",
            "amount": 517.06,
            "creditDebitIndicator": "Credit",
            "currency": "GBP",
            "timestamp": "2019-07-09 11:47:47",
            "emoji": "🥰",
            "latitude": -1.86852,
            "longitude": 53.39733,
            "status": "Declined",
            "message": "Holiday souvenirs",
            "pointOfSale": "In-store"
        },
        {
            "transactionUUID": "aab19435-cbf4-41ba-afbb-f6c3f534b61c",
            "accountUUID": "72965642",
            "merchantUUID": "36273823",
            "amount": 7.29,
            "creditDebitIndicator": "Debit",
            "currency": "EUR",
            "timestamp": "2019-06-24 15:52:22",
            "emoji": "😭",
            "latitude": 1.06146,
            "longitude": 52.53199,
            "status": "Declined",
            "message": "Housewarming gift",
            "pointOfSale": "In-store"
        }
    ]
}
```