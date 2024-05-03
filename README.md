# Group 7 Project Repository

## Team Contributors

- [Lucas](contributors/lucas.md)
- [Tanaya](contributors/tanaya.md)
- [Andy](contributors/andy.md)
- [Fahad](contributors/fahad.md)
- [Timi](contributors/timi.md)
- [Benji](contributors/benji.md)
- [Anqi](contributors/anqi.md)
- [Yanqian](contributors/yanqian.md)

## 1. Project Overview

### Backend 

The backend is developed using the [Egg.js](https://www.eggjs.org) framework and we use `npm install` to install dependencies listed in `package.json` file, or to install a specific package into the project's `node_modules` directory. 

```shell
cd backend
npm install
```

### Frontend

The frontend is built with the [React](https://github.com/facebook/create-react-app) library. Likewise, we use `npm install` to add all dependencies.

```shell
cd frontend
npm install # or npm install --force
```

### Database
This project utilizes [Prisma](https://www.prisma.io/docs) as the development tool. Detailed implementations of how to use prisma could be found the [Prisma Document](./docs/prisma-document.md).


The database is deployed on [Amazon RDS](https://aws.amazon.com/rds/). Please note that some networks, such as `eduroam`, may block access to Amazon RDS. If you encounter any other errors accessing Amazon RDS, please contact scygs2@nottingham.ac.uk.

### APIs
The APIs utilised in this project are listed below.

#### 1. Hackathon API

The [Hackathon API](https://hackathon.capitalone.co.uk) is used in this project to create accounts and transactions, and it is implemented in `backend/app/service/` directory using JavaScript. Additionally, a set of Python files for interacting with the Hackathon API is located in the [Hack-API](./Hack-API/) directory. For detailed implementation, please refer to [Hackathon API document](./docs/hackAPI-document.md).

#### 2. Carbon API

The [CarbonAPI](https://docs.carboninterface.com/#/?id=estimates-api) is used in this project to calculate the carbon impact of each transaction. Python files that call the Carbon API are available in the [Carbon-API](./Carbon-API/) directory. For detailed implementation, please refer to [Carbon API document](./docs/carbonAPI-document.md).

#### 3. OpenAI API

The [OpenAI API](https://platform.openai.com/docs/assistants/overview) is used in this project to generate a AI assistant on the help page, providing useful information about this project. For detailed implementation, please refer to [OpenAI API document](./docs/openAI-document.md).

#### 4. Currency Converter API

The [Currency Converter API](https://exchangeratesapi.io/documentation/) is used in this project to convert the amount of each transaction into a uniform currency. 

#### 5. Our Own API

The currently implemented APIs are detailed in the [router configuration file](./backend/app/router.js). The full API document could be found [API document](./docs/api-document.md)

## 2. Launch the Project

### Backend

In [backend](./backend/) directory, the project could be started by running the following command:

```shell
npm run dev
```

The backend server is started on http://localhost:7001/.

### Frontend

In [frontend](./frontend/) directory, the project could be started by running the following command:

```shell
npm start
```

The frontend server is started on http://localhost:3000/.

### Database
In [backend](./backend/) directory, the prisma could be started by running the following command:

```shell
npx prisma studio
```

The prisma server is started on http://localhost:5555/.

### OpenAI

In [openAI](./openAI/) directory, the chatGPT could be started by running the following command:

```shell
npm install
node index.js
```

The openAI server is started at http://localhost:8080

## 3. Test

### Backend

To run all tests for backend, make sure you're in `backend/` directory, and use the following command
```shell
npm test
```

### Frontend: Cypress

[Cypress](https://docs.cypress.io/guides/overview/why-cypress) is implemented for the frontend testing. In the `frontend/` directory, it can be launched by using either following command:

```shell
npx cypress open
```

Once Cypress is launched, you will be presented with two testing options: **End-to-End Tests** and **Component Tests**. Click on either option to access a list of test files available for execution.

All end-to-end and component tests have been successfully passed using **Chrome version 124**.

