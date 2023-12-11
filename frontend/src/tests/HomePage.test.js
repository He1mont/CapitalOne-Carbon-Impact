import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('render HomePage components', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    // check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Login')).toBeInTheDocument();

    // check Mid
    expect(screen.getByText('Fahad... 1234')).toBeInTheDocument();
    expect(screen.getByText('Your Carbon Impact')).toBeInTheDocument();
    expect(screen.getByAltText('Mid Box')).toBeInTheDocument();

    // check Low
    expect(screen.getByAltText('Transactions')).toBeInTheDocument();
    expect(screen.getByAltText('Goals')).toBeInTheDocument();
    expect(screen.getByAltText('History')).toBeInTheDocument();

    // check Footer
    expect(screen.getByText(/© 2023-2024 Team7. All rights reserved./i)).toBeInTheDocument();
  });

  it('navigate to login page on login button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    const loginButton = screen.getByAltText('Login');
    fireEvent.click(loginButton);

    // Check if the login route is changed correctly
    expect(history.location.pathname).toBe('/Login');
  });

  it('navigate to transactions page on transactions button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    const transactionsButton = screen.getByAltText('Transactions');
    fireEvent.click(transactionsButton);

    // Check if the login route is changed correctly
    expect(history.location.pathname).toBe('/Transactions');
  });
});
