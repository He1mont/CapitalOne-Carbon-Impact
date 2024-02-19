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

## 1. Project Initialization

### Backend 

The backend is developed using the [Egg.js](https://www.eggjs.org) framework and we use `npm install` to install dependencies listed in `package.json` file, or to install a specific package into the project's `node_modules` directory. 

```shell
cd backend
npm install
```

In backend, we use the library `axios` to interact with [Hackathon API](https://hackathon.capitalone.co.uk). So we need to install `axios` beforehand.

The `egg-mock` framework and `mocha` library is adopted as the test tools for backend. It could be installed by the following command

### Frontend

The frontend is built with the [React](https://github.com/facebook/create-react-app) library. Likewise, we use `npm install` to add all dependencies.

```shell
cd frontend
npm install
```

## 2. Launch the Project

### Backend

In [backend](./backend/) directory, the project could be started by running the following command:

```shell
npm run dev
```

After starting the server, access it via http://localhost:7001/.

The currently implemented APIs are detailed in the [router configuration file](./backend/app/router.js). And the full API document could be found [here](./API-Schema.md)

### Frontend

In [frontend](./frontend/) directory, the project could be started by running the following command:

```shell
npm start
```

The website would be available at http://localhost:3000

## 3. Testing

### Backend

To run all tests for backend, use the following command
```shell
npm test
```

### Frontend

The frontend has been thoroughly tested, and all tests have successfully passed. To run the tests, use the following command:

```shell
npm test /src/tests
```

