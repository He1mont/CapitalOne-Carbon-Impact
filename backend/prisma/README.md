# Prisma Database

## Setup

- Create a connection in mySQL workbend

- using port `127.0.0.1:3306`

- create user with privelleges to edit the SQL database the username and password will be needed fpr the `DATABASE-URL`

- create a `.env` file

- add this line to the file `DATABASE_URL="mysql://username:password@127.0.0.1:3306/databaseName"`

## Managing the database

- Creating our own API to CREATE, UPDATE, DELETE, GET information

- More details can be found [here](/backend/app/external/OwnAPI.md).

## Tables

- userGoals which stores the `accountID` and  `goal` (carbon goal)

- Friends which has all the `usernames` of the users (a combination of firstname, surname, and random int)

- Transaction which has the `transactionUUID`, `accountID` and `carbon score` which is populpated using the third party API
