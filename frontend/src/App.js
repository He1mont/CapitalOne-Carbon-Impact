import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import History from './pages/History';
import Help from './pages/Help';
import FAQS from './pages/FAQS';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={HomePage} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/goals" component={Goals} />
        <Route path="/history" component={History} />
        <Route path="/help" component={Help} />
        <Route path="/FAQS" component={FAQS} />
      </Switch>
    </Router>
  );
}

export default App;
