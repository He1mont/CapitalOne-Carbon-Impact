# Creating Accounts & Transactions

## Accounts

1) To create accounts go into the `/accounts` folder using the command `cd accounts`.

2) From there enter `python account-create-random.py`. You will then be asked how many account you would like created and how many transactions you want each account to have.

3) Once you have entered the required details the accounts will be created and will be printed in in JSON format to the console

## Transactions

1) To create transactions go into the `/transactions` folder using the command `cd transactions`.

2) From there enter `python tran-create-random.py`. You will then be asked for the account ID of the account you would like to add transactions to and how many transactions you want added to the account. **Note that transactions cannot be added to accounts with a 'suspended' or 'closed' status.**

3) Once you have entered the required details the transactions will be created and will be printed in in JSON format to the console 

# Getting Accounts & Transactions Created From API

## Accounts

1) To get account info go into the `/accounts` folder using the command `cd accounts`.

### Viewing All Accounts

2) Enter `python account-get-all.py`.

3) All accounts and their information will then be printed to the terminal.

### Viewing Account By ID

2) Enter `python account-get-by-id.py`. You will then be prompted to enter an account ID.

3) All information for that specific account will then be printed out to the console.

## Transactions

1) To view transaction information go into the `/transactions` folder using the command `cd transactions`.

### Viewing All Transactions from One Account

2) Enter `python tran-get-all.py`. You will then be prompted to enter an account ID.

3) All transactions related to the account (if found) entered will then be printed to the console.

### Vieiwng A Specific Transaction On A Specific Account

2) Enter `python tran-get-all.py`. You will then be prompted to enter an account ID and transaction ID.

3) Once all required information is entered, the details of the specific transaction (if found) in the account specified will be printed to the terminal


