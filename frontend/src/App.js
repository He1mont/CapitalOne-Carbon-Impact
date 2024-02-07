import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/goals" component={Goals} />
      </Switch>
    </Router>
  );
}

export default App;
