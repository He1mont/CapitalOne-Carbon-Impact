import json
import random
import uuid
from datetime import datetime, timedelta

def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

def getDate():
    start_date = datetime.strptime('2020-01-01 00:00:00', '%Y-%m-%d %H:%M:%S')
    end_date = datetime.now()
    return random_date(start_date, end_date).strftime('%Y-%m-%d %H:%M:%S')

def getEmoji():
    return ["🤑", "💸", "🥰", "😭", "💩", "🧐"]

def getCurrency():
    return ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD", "CHF", "MYR", "JPY", "CNY"]

def getCategory():
    return [
        "Entertainment", "Education", "Shopping", "Personal Care",
        "Health & Fitness", "Food & Dining", "Gifts & Donations",
        "Bills & Utilities", "Auto & Transport", "Travel"
    ]

def getMerchantName():
    return [
        "Blahbucks", "Capital Two", "Pear Retail", "MegaStore", "QuickTech", "HealthHub",
        "BookNest", "GadgetWorld", "FashionFront", "HomeEssentials", "SportyGood",
        "EduCare", "ToyTown", "GroceryGate", "PetPals", "EcoEarth", "TravelTrek",
        "BeautyBarn", "ArtisanAvenue", "MusicMeadow", "GardenGrow", "FoodFiesta",
        "CarryCraft", "ToolTime", "FitnessFactory", "ShoeShack", "AccessoryAlley",
        "MovieMart", "GameGrid", "JewelJunction", "OutdoorOasis", "BabyBoutique",
        "LuxuryLooms", "TechTrend", "OfficeOps", "BikeBay", "CulinaryCorner",
        "PlantPlace", "AutoAvenue", "FashionFiesta", "HealthHaven", "EcoEssentials",
        "BrewBistro", "SnackStop", "DineDivine", "SleepSuite", "GiftGallery"
    ]

def getDescription():
    return [
        "Supplying all your coffee needs",
        "Credit Card Company",
        "Computers, phones and other shiny electrical things",
        "Entertainment and electronics",
        "Your one-stop fashion destination",
        "Leading provider of health and wellness products",
        "Educational materials for all ages",
        "Innovative gadgets at your fingertips",
        "Eco-friendly solutions for a sustainable future",
        "The ultimate sports and fitness gear shop",
        "Luxury and comfort in home furnishings",
        "Organic and fresh food market",
        "Handcrafted gifts and unique artifacts",
        "Comprehensive utility services provider",
        "Automotive excellence and services",
        "Global travel and adventure planner",
        "Beauty and personal care essentials",
        "Premium jewelry and accessories collection",
        "Outdoor and camping equipment specialists",
        "Baby and children's needs covered",
        "Gourmet delights and culinary tools",
        "Your neighborhood book and media store",
        "Pet care and supplies for your furry friends",
        "Advanced tech products and support",
        "Office supplies and business solutions"
    ]

def generate_transaction(account_id):
    return {
        "transactionUUID": str(uuid.uuid4()),
        "accountUUID": account_id,
        "merchant": {
            "name": random.choice(getMerchantName()),
            "category": random.choice(getCategory()),
            "description": random.choice(getDescription()),
            "pointOfSale": random.choice([["In-store"], ["Online"], ["Online", "In-store"]])
        },
        "amount": round(random.uniform(0.01, 1000), 2),
        "creditDebitIndicator": random.choice(["Credit", "Debit"]),
        "currency": random.choice(getCurrency()),
        "timestamp": getDate(),
        "emoji": random.choice(getEmoji()),
        "latitude": round(random.uniform(-90, 90), 5),
        "longitude": round(random.uniform(-180, 180), 5),
        "status": random.choice(["Successful", "Pending", "Flagged", "Declined"]),
        "message": random.choice(["Weekly groceries shopping", "Holiday souvenirs", "Housewarming gift", "Tech gadgets"]),
        "pointOfSale": random.choice(["Online", "In-store"])
    }

def main():
    numOfTransactions = 5
    account_id = '12345678'

    transactions_data = {
        "Transactions": [generate_transaction(account_id) for _ in range(numOfTransactions)]
    }
    with open('Transaction.json', 'w') as file:
        json.dump(transactions_data, file, indent=4)

if __name__ == "__main__":
    main()
