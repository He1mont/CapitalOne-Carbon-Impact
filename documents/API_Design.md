## API Design

>   **Data Access from Capital One's Developer API**	([*reference*](https://developer.capitalone.co.uk/docs/dataAccess))
>
>   -   Accounts
>       -   Bulk account data: GET `/accounts`
>       -   Specific account data: GET `/accounts/{Account_id}`
>   -   Balences
>       -   Bulk balence data: GET `/balences`
>       -   Specific balence data: GET `/accounts/{Account_id}/Balences`
>   -   Transaction
>       -   Bulk transaction data: GET `/transactions`
>       -   Specific transaction data: `/accounts/{Account_id}/transactions`



##### 1. GET: Account data

-   Router: `/accounts/{Account_id}`

-   Requested Argument

    | Parameters    | Description                         |
    | ------------- | ----------------------------------- |
    | `accessToken` | The access token you were provided. |
    | `accountId`   | The ID of the account to retrieve.  |
    
-   Response Argument

    | Parameter        | Description                                                  |
    | ---------------- | ------------------------------------------------------------ |
    | `AccountId`      | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `Currency`       | Capital One accounts are always reported in GBP.             |
    | `AccountType`    | Although the OpenBanking specification supports values of 'Personal' and 'Business' for this data field, Capital One APIs will only ever report 'Personal' accounts. |
    | `AccountSubType` | Although the OpenBanking specification supports a number of allowed values for this data field, Capital One APIs will only ever report accounts with a subtype of 'CreditCard'. |
    | `Description`    | A textual description of the account.                        |
    | `SchemeName`     | Although the OpenBanking specification supports a number of allowed values for this data field, Capital One APIs will only ever report accounts for the 'UK.OBIE.PAN' scheme. |
    | `Identification` | A masked version of the Primary Account Number (PAN).        |
    
-   Example Output
    
    
    ```JSON
    {
      "Data": {
        "Account": [
          {
            "AccountId": "string",
            "Currency": "GBP",
            "AccountType": "Personal",
            "AccountSubType": "CreditCard",
            "Description": "string",
            "Account": {
              "SchemeName": "UK.OBIE.PAN",
              "Identification": "string"
            }
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```



##### 2. GET: Balence data

-   Router: `/accounts/{Account_id}/balences`

-   Requested Argument

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `accessToken` Required | The access token you were provided.                          |
    | `AccountId` Required   | The ID of the account for which to retrieve balance information. |

-   Response Argument

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId`            | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `Amount`               | A numeric value indicating the current balance for the account. |
    | `Currency`             | The currency in which the balance value is being reported.   |
    | `CreditDebitIndicator` | An indicator as to whether the account balance is in credit or debit. |
    | `Type`                 | Balance type, in a coded form. Capital One will only ever report `OpeningBooked`. |
    | `DateTime`             | The Date/Time of the balance.                                |
    | `Included`             | Indicates whether or not the credit line is included in the balance of the account. |
    | `Type`                 | The type of the credit limit.                                |
    | `Amount`               | A numeric value indicating the monetary units to describe the credit line. |
    | `Currency`             | The currency in which the credit line amount is being reported. |

-   Example Output

    ```JSON
    {
      "Data": {
        "Balance": [
          {
            "AccountId": "string",
            "Amount": {
              "Amount": "string",
              "Currency": "string"
            },
            "CreditDebitIndicator": "Credit",
            "Type": "OpeningBooked",
            "DateTime": "string",
            "CreditLine": {
              "Included": true,
              "Type": "Credit",
              "Amount": {
                "Amount": "string",
                "Currency": "string"
              }
            }
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```

    

##### 3. GET: Transaction data

-   Router: `/accounts/{Account_id}/transactions`

-   Requested Argument

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId` Required   | The ID of the account for which to retrieve balance information. |
    | `accessToken` Required | The access token you were provided.                          |
    | `fromBookingDateTime`  | A filtering parameter to restrict the returned transaction data. Only transactions booked after the specified time will be returned in the response.  **Note:** Transactions may be further restricted based upon the `TransactionFromDateTime`specified in the consent agreed with the customer. |
    | `toBookingDateTime`    | A filtering parameter to restrict the returned transaction data. Only transactions booked before the specified time will be returned in the response.  **Note:** Transactions may be further restricted based upon the `TransactionToDateTime`specified in the consent agreed with the customer. |

-   Response Arguments

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId`            | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `Amount`               | A numeric value indicating the monetary units for the transaction. |
    | `Currency`             | The currency in which the transaction amount is being reported. |
    | `CreditDebitIndicator` | Indicator of whether the transaction was a credit or debit.  |
    | `Status`               | The status of the transaction.                               |
    | `BookingDateTime`      | The Date/Time that the transaction was booked against the account. |
    | `AddressLine`          | Information that locates and identifies a specific address for the transaction entry. |
    | `MerchantName`         | The name of the merchant involved in the transaction.        |

-   Example Output

    ```JSON
    {
      "Data": {
        "Transaction": [
          {
            "AccountId": "string",
            "Amount": {
              "Amount": "string",
              "Currency": "string"
            },
            "CreditDebitIndicator": "string",
            "Status": "Booked",
            "BookingDateTime": "string",
            "AddressLine": "string",
            "MerchantDetails": {
              "MerchantName": "string"
            }
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```

    

##### 4. GET: Carbon Footprint for each transaction

-   Router: `/accounts/{Account_id}/transactions/carbon-footprint`

-   Requested Argument

    | Parameter                | Description                                                  |
    | ------------------------ | ------------------------------------------------------------ |
    | `AccountId` Required     | The ID of the account for which to retrieve balance information. |
    | `accessToken` Required   | The access token you were provided.                          |
    | `TransactionId` Required | The ID of this specific transaction                          |

-   Response Arguments

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId`            | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `TransactionId`        | An identifier for the this transaction.                      |
    | `Amount`               | A numeric value indicating the monetary units for the transaction. |
    | `Currency`             | The currency in which the transaction amount is being reported. |
    | `CreditDebitIndicator` | Indicator of whether the transaction was a credit or debit.  |
    | `Status`               | The status of the transaction.                               |
    | `BookingDateTime`      | The Date/Time that the transaction was booked against the account. |
    | `AddressLine`          | Information that locates and identifies a specific address for the transaction entry. |
    | `MerchantName`         | The name of the merchant involved in the transaction.        |
    | `CarbonFootprint`      | The carbon footprint calculated by AI                        |

-   Example Output

    ```JSON
    {
      "Data": {
        "Transaction": [
          {
            "AccountId": "string",
            "Amount": {
              "Amount": "string",
              "Currency": "string"
            },
            "CreditDebitIndicator": "string",
            "Status": "Booked",
            "BookingDateTime": "string",
            "AddressLine": "string",
            "MerchantDetails": {
              "MerchantName": "string"
            },
            "CarbonFootprint": "double"
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```



##### 5. GET: Carbon Footprint trend within a period of time

-   Router: `/accounts/{Account_id}/transactions/carbon-footprint/trend`

-   Requested Argument

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId` Required   | The ID of the account for which to retrieve balance information. |
    | `accessToken` Required | The access token you were provided.                          |
    | `fromBookingDateTime`  | A filtering parameter to restrict the returned transaction data. Only transactions booked after the specified time will be returned in the response.  **Note:** Transactions may be further restricted based upon the `TransactionFromDateTime`specified in the consent agreed with the customer. |
    | `toBookingDateTime`    | A filtering parameter to restrict the returned transaction data. Only transactions booked before the specified time will be returned in the response.  **Note:** Transactions may be further restricted based upon the `TransactionToDateTime`specified in the consent agreed with the customer. |

-   Response Arguments

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId`            | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `fromBookingDateTime`  | Start time of the period                                     |
    | `toBookingDateTime`    | End time of the period                                       |
    | `TotalAmount `         | Total amount within this period                              |
    | `Currency`             | The currency in which the transaction amount is being reported. |
    | `TotalCarbonFootprint` | Total carbon footprint within this period                    |

-   Example Output

    ```JSON
    {
      "Data": {
        "Transaction": [
          {
            "AccountId": "string",
            "fromBookingDateTime": "timestamp",
            "toBookingDateTime": "timestamp",
            "TotalAmount": {
              "TotalAmount": "string",
              "Currency": "string"
            },
    		"TotalCarbonFootprint": "double"
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```



##### 6. GET: User Carbon Footprint Index

-   Router: `/accounts/{Account_id}/carbon-footprint`

-   Requested Argument

    | Parameter              | Description                                                  |
    | ---------------------- | ------------------------------------------------------------ |
    | `AccountId` Required   | The ID of the account for which to retrieve balance information. |
    | `accessToken` Required | The access token you were provided.                          |

-   Response Arguments

    | Parameter             | Description                                                  |
    | --------------------- | ------------------------------------------------------------ |
    | `AccountId`           | An identifier for the customer account. This is guaranteed to be unique and persistent for a given `ConsentId`. |
    | `Currency`            | Capital One accounts are always reported in GBP.             |
    | `AccountType`         | Although the OpenBanking specification supports values of 'Personal' and 'Business' for this data field, Capital One APIs will only ever report 'Personal' accounts. |
    | `AccountSubType`      | Although the OpenBanking specification supports a number of allowed values for this data field, Capital One APIs will only ever report accounts with a subtype of 'CreditCard'. |
    | `Description`         | A textual description of the account.                        |
    | `UserCarbonFootprint` | The total carbon footprint so far created by this user.      |

-   Example Output

    ```JSON
    {
      "Data": {
        "Account": [
          {
            "AccountId": "string",
            "Currency": "GBP",
            "AccountType": "Personal",
            "AccountSubType": "CreditCard",
            "Description": "string",
            "UserCarbonFootprint": "double"
            }
          }
        ]
      },
      "Links": {
        "Self": "string"
      },
      "Meta": {
        "TotalPages": 1
      }
    }
    ```























