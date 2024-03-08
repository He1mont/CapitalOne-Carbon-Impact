import json
import random
import string

def getFirstName():
    firstnames = [
        "Blondell", "John", "Jane", "Robert", "Michael", "James", "Mary", "Patricia",
        "Jennifer", "Linda", "Elizabeth", "Emma", "William", "David", "Richard",
        "Joseph", "Charles", "Thomas", "Christopher", "Daniel", "Matthew", "Anthony",
        "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "George", "Joshua",
        "Kevin", "Brian", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan",
        "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin",
        "Scott", "Brandon", "Benjamin", "Samuel"
    ]
    return firstnames

def getLastName():
    lastnames = [
        "Bartell", "Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller",
        "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor",
        "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White",
        "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker",
        "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green",
        "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts",
        "Carter", "Phillips", "Evans"
    ]
    return lastnames

def getCurrency():
    return ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD", "CHF", "MYR", "JPY", "CNY"]

def generate_random_data():
    return {
        "accountId": ''.join(random.choices(string.digits, k=8)),
        "firstname": random.choice(getFirstName),
        "phoneNumber": "+" + ''.join(random.choices(string.digits, k=12)),
        "developerId": ''.join(random.choices(string.digits, k=3)),
        "uci": ''.join(random.choices(string.digits, k=6)),
        "riskScore": str(random.randint(1, 100)),
        "creditScore": str(random.randint(300, 850)),
        "currencyCode": random.choice(getCurrency()),
        "productType": random.choice(["Credit", "Debit"]),
        "email": ''.join(random.choices(string.ascii_lowercase, k=10)) + "@emailservice.com",
        "lastname": random.choice(getLastName),
        "homeAddress": ''.join(random.choices(string.ascii_letters + string.digits + " ", k=40)),
        "state": random.choice(["open", "closed", "suspended"]),
        "creditLimit": str(random.randint(1000, 10000)),
        "balance": str(random.randint(0, 5000)),
        "liveBalance": random.choice(["true", "false"])
    }

def main():
    numOfAccounts = 5

    data = {
        "Accounts": [generate_random_data() for _ in range(numOfAccounts)]  # Generate data for one account
    }
    file_name = 'Accounts.json'
    with open(file_name, 'w') as file:
        json.dump(data, file, indent=4)

    print(f"Generated JSON data saved to {file_name}")

if __name__ == "__main__":
    main()
