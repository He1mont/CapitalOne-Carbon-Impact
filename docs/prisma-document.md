# Prisma Database

## Setup

### Install Packages

 ```shell
 cd backend
 npm install prisma
 ```

 If this is your first time using prisma, use the following command to generate the client from the schema:
 ```shell
 npx prisma generate
 ```

### Configuration

There is a `.env` file in the `backend` directory, containing configuration information for connecting to the Amazon cloud database.

### Create Connection in MySQL Workbench

- Connection Name: team7
- Connection Method: Standard(TCP/IP)
- Host name: `grp-database.cdk4m0ww43dq.eu-west-2.rds.amazonaws.com`
- Port: 3306
- Username: `admin`
- Password: `hello-world`
- Click `Test Connection` and `OK`
- The official document could be found [here](https://repost.aws/knowledge-center/connect-rds-mysql-workbench)

## Interact with database

### View Current tables

View the current database locally in a web browser:
```shell
npx prisma studio
```

### Make Changes

if you made changes to the schema, you need to create a migrations using the command:
```shell
npx prisma migrate dev --name "comment on the change"
```

Push the generated migration files to the remote database:
```shell
npx prisma db push
```

### Apply Changes

Applying the remote database to the Prisma model:
```shell
npx prisma db pull
```

Apply migrations to update the local database:
```shell
npx prisma migrate deploy
npx prisma generate
```

## Managing the database

The database schema is written in [`schema.prisma`](../backend/prisma/schema.prisma).

Our own API have been created to handle CREATE, UPDATE, DELETE, GET. More details can be found in [`api-document`](api-document.md).
