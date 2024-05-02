import json
import requests

PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869" #"5010a4d0-bd3e-4c08-83f6-7ca0a3a33098"
CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA" #"Q1C3WbWtKuxKa3a2DDC3Q"

Carbon_API_headers = {
    'Authorization': f'Bearer {CARBON_API_KEY}',
    'Content-Type': 'application/json',
}

accounts = requests.get(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles",headers=Carbon_API_headers)
accounts = json.loads(accounts.text)
print(accounts)