import json
import requests

authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5NzhjYjY0ZjVmZDJhMDQ2NDgzNzBlMTJhZDAxN2JkYjdjN2Q1OTIxYjM2ZGUxNTJmMThmY2U2YjdiNjY4M2IyMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOTc4Y2I2NGY1ZmQyYTA0NjQ4MzcwZTEyYWQwMTdiZGI3YzdkNTkyMWIzNmRlMTUyZjE4ZmNlNmI3YjY2ODNiMiJ9.aTKPvM0QnphbSflH2V70njsrezBiAzSVD6MVs4Ylh9euNME81NExCj9kVhWRrzpegPMowhW_onnP-qFtv-JE0mk-fqNMufEgmQRd2wk-ij4wkJwr4UCHk0U9fw8a3tOvn9l1FamfKEzaD0rtDENtnaU05_cJ9RyiSC1bvVS1CsFoNQFH5K7zrCMYU0rHrDryGDQxW1CAcp1ugzrnvGB0y8AwAtjb6egDjzfPglrroVRKgypbNIyu6NjUKl1JR_0gHSZVPI4Ad3kNhRymAyOw-3cxEq9btmVPTzho9DlsrHU23BQO20XQ-gcMaKYp-hFNhmB6-CtlVrPO2ZgQL3GhOw'

headers = {
    'Authorization': f'Bearer {authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

quantity = input("Please enter the number of accounts: ")
numTransactions = input("Please enter the number of transactions: ")

liveBalance = False
payload = json.dumps({"quantity": quantity, "numTransactions": numTransactions, "liveBalance": liveBalance})

response = requests.post("https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create", headers=headers, data=payload).text
json_response = json.loads(response)
print(json_response)
