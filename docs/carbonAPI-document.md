# Carbon API

For this project, we will be using an API provided by [Carbon Interface](https://docs.carboninterface.com/#/) to provide us with carbon impact estimates for our transactions. They have a dedicated feature in the API named `Carbon Ledger` which allows us to input data about a transaction (amount spent, merchant data, etc.) and in return we get a carbon score in grams.

The image below shows the data model for the Carbon Ledger. All of our data will be stored in a Program, which contains Card Profiles, which is the equivalent of an account in the Hackathon API. Each Card Profile contains transactions, where a carbon impact estimate is also stored. The model is the underlying algorithm that calculates the carbon emissions for transactions. At the moment, we are only able to use one test model provided by Carbon Interface themselves. Furthermore, the Carbon Ledger is in Beta, so it likely doesn't produce the most accurate carbon impact estimate.
![Carbon Ledger Data Model](assets/carbon_ledger_data_model.png)

By default, accounts and transactions are created in the Carbon API when running the commands listed in [Account and Transaction](#Account-and-Transaction), providing us with a carbon impact score for every transaction, but you could also do the same (and more) with the provided Python files:

 - [Creating Card Profile (Account)](Carbon-API/create_card_profile.py)
 - [Deleting Card Profile](Carbon-API/delete_card_profile.py)
 - [Retrieve all Card Profiles](Carbon-API/get_all_card_profiles.py)
 - [Retrieve Card Profile by ID](Carbon-API/get_card_profile_by_id.py)
 - [Create Transaction](Carbon-API/add_transaction.py)
 - [Retrieve all Transactions on a specific account](Carbon-API/get_all_transactions.py)
 - [Retrieve a Transaction by ID](Carbon-API/get_transaction_by_id.py)
 - [Retrieve Carbon Impact Score of specific Transaction](Carbon-API/get_carbon_impact_from_transaction.py)

 > **Note:** Transactions cannot be deleted once they have been created

 To run these files enter `python {path_of_file}` and follow the prompts.