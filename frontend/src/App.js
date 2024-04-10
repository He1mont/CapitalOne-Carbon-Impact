import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import History from './pages/History';
import Help from './pages/Help';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home/transactions" component={Transactions} />
        <Route path="/home/goals" component={Goals} />
        <Route path="/home/history" component={History} />
        <Route path="/home" component={HomePage} />
        <Route path="/help" component={Help} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
