import json
import requests

PROGRAM_UUID = "5010a4d0-bd3e-4c08-83f6-7ca0a3a33098"
CARBON_API_KEY = "Q1C3WbWtKuxKa3a2DDC3Q"

Carbon_API_headers = {
    'Authorization': f'Bearer {CARBON_API_KEY}',
    'Content-Type': 'application/json',
}

cardProfileID = input("Please enter the Card Profile ID: ")

transactionID = input("Please enter the Transaction ID: ")

try:
    response = requests.get(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles/{cardProfileID}/transactions/{transactionID}",headers=Carbon_API_headers)
    response.raise_for_status()
except requests.exceptions.HTTPError:
    print("Card Profile or Transaction doesn't exist")
    exit(1)

print(json.loads(response.text))