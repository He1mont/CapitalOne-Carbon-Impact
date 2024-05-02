import json
import requests

# Constants to access Carbon API
PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869" #"5010a4d0-bd3e-4c08-83f6-7ca0a3a33098"
CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA" #"Q1C3WbWtKuxKa3a2DDC3Q"

# Headers for Carbon API
Carbon_API_headers = {
    'Authorization': f'Bearer {CARBON_API_KEY}',
    'Content-Type': 'application/json',
}

cardProfileID = input("Please enter the Card Profile ID: ")

try:
    # Check if Card Profile exists
    response = requests.get(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles/{cardProfileID}",headers=Carbon_API_headers)
    response.raise_for_status()
except requests.exceptions.HTTPError:
    print("Card Profile doesn't exist.")
    exit(1)

# Delete Card Profile
response = requests.delete(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{PROGRAM_UUID}/card_profiles/{cardProfileID}",headers=Carbon_API_headers)
if(response.status_code == 204):
    print(f"Card Profile {cardProfileID} deleted successfully")
else:
    print("Something went wrong.")