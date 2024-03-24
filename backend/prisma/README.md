# Prisma Database

## Setup

- Create a connection in mySQL workbench
  - Connection Name: team7
  - Connection Method: Standard(TCP/IP)
  - Host name: `grp-database.cdk4m0ww43dq.eu-west-2.rds.amazonaws.com`
  - Port: 3306
  - Username: `admin`
  - Password: `hello-world`
  - Click `Test Connection` and `OK`
  - The official document could be found [here](https://repost.aws/knowledge-center/connect-rds-mysql-workbench)

- Make sure you have a `.env` file in the `backend` directory.

- To get all the tables created to show in SQL workbench

 ```shell
 npx prisma db push
 ```

- if you made changes to the schema have to create a migrations using the command

```shell
npx prisma migrate dev --name comment on the change
```

- to see the database in a web browser use command

```shell
npx prisma studio
```

## Managing the database

- Creating our own API to CREATE, UPDATE, DELETE, GET information

- More details can be found [here](/API-Schema.md).

## Tables

- userGoals which stores the `accountID` and  `goal` (carbon goal)

- Friends which has all the `usernames` of the users (a combination of firstname, surname, and random int)

- Transaction which has the `transactionUUID`, `accountID` and `carbon score` which is populpated using the third party API

- The database schema is written in [`schema.prisma`](./schema.prisma)
