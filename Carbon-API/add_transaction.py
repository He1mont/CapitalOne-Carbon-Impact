import json
import requests

# Constants to access Carbon API & Hackathon API
PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869" #"5010a4d0-bd3e-4c08-83f6-7ca0a3a33098"
authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5NzhjYjY0ZjVmZDJhMDQ2NDgzNzBlMTJhZDAxN2JkYjdjN2Q1OTIxYjM2ZGUxNTJmMThmY2U2YjdiNjY4M2IyMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOTc4Y2I2NGY1ZmQyYTA0NjQ4MzcwZTEyYWQwMTdiZGI3YzdkNTkyMWIzNmRlMTUyZjE4ZmNlNmI3YjY2ODNiMiJ9.aTKPvM0QnphbSflH2V70njsrezBiAzSVD6MVs4Ylh9euNME81NExCj9kVhWRrzpegPMowhW_onnP-qFtv-JE0mk-fqNMufEgmQRd2wk-ij4wkJwr4UCHk0U9fw8a3tOvn9l1FamfKEzaD0rtDENtnaU05_cJ9RyiSC1bvVS1CsFoNQFH5K7zrCMYU0rHrDryGDQxW1CAcp1ugzrnvGB0y8AwAtjb6egDjzfPglrroVRKgypbNIyu6NjUKl1JR_0gHSZVPI4Ad3kNhRymAyOw-3cxEq9btmVPTzho9DlsrHU23BQO20XQ-gcMaKYp-hFNhmB6-CtlVrPO2ZgQL3GhOw'
CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA" #"Q1C3WbWtKuxKa3a2DDC3Q"

# Headers for Carbon API & Hackathon API
Carbon_API_headers = {
    'Authorization': f'Bearer {CARBON_API_KEY}',
    'Content-Type': 'application/json',
}

Hackathon_API_headers = {
    'Authorization': f'Bearer {authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

# Get user input for account ID
accountID = input("Please enter the account_id: ")

# Send request to Hackathon API to get account details
response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{accountID}", headers=Hackathon_API_headers)
# account = json.loads(response.text)

if(response.status_code == 200): # If account exists

    # Send request to Carbon API to get card profiles
    accounts = requests.get(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles",headers=Carbon_API_headers)
    accounts = json.loads(accounts.text)
    
    # Check if a card profile exists for the account
    accountCarbonID = -1
    for account in accounts:
        if(account['data']['attributes']['external_id'] == accountID):
            accountCarbonID = account['data']['id']
            break
    if(accountCarbonID == -1):
        print("Card Profile hasn't been created for this account. Create a Card Profile first.")
        exit(1)

    # Get user input for transaction ID
    transactionID = input("Please enter the transaction_id: ")

    # Send request to Hackathon API to get transaction details
    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions/{transactionID}", headers=Hackathon_API_headers)
    
    if(response.status_code == 200): # Check if transaction exists

        # Send request to Carbon API to get transactions for the card profile
        transactions = requests.get((f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles/{accountCarbonID}/transactions"),headers=Carbon_API_headers).text
        transactions = json.loads(transactions)
        
        # Check if the transaction already exists in Carbon API
        for transaction in transactions:
            if(transaction['data']['attributes']['external_id'] == transactionID):
                print("Transaction already exists.")
                exit(1)

        response=response.text
        json_response = json.loads(response)

        # Map merchant category to MCC
        match json_response['merchant']['category']:
            case "Entertainment":
                mcc = "7996"
            case "Education":
                mcc = "5942"
            case "Shopping":
                mcc = "5691"
            case "Personal Care":
                mcc = "8050"
            case "Health & Fitness":
                mcc = "7298"
            case "Food & Dining":
                mcc = "5812"
            case "Gifts & Donations":
                mcc = "5947"
            case "Bills & Utilities":
                mcc = "4900"
            case "Auto & Transport":
                mcc = "4111"
            case "Travel":
                mcc = "4582"
            case _:
                mcc = "5399"
        
        # Prepare data for Carbon API request
        data = {
            "amount_cents": json_response['amount']*100,
            "currency": "USD",
            "external_id": json_response['transactionUUID'],
            "merchant_category": json_response['merchant']['category'],
            "merchant_category_code": mcc,
            "merchant_name": json_response['merchant']['name'],
            "merchant_country": "US",
            "merchant_state": "CA",
            "merchant_city": "San Fransisco",
            "merchant_postal_code": "90210"
        }

        # Send request to Carbon API to add transaction
        response = requests.post(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles/{accountCarbonID}/transactions",headers=Carbon_API_headers,data=json.dumps(data))

        print(json.loads(response.text))


    else:
        print("This transaction ID doesn't exist.\n")
else:
    print("This account doesn't exist.\n")