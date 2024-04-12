// HomePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  // Test case to check if HomePage components are rendered correctly
  it('render HomePage components', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    // Check Head 
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Login')).toBeInTheDocument();

    // Check Mid 
    expect(screen.getByText('Fahad... 1234')).toBeInTheDocument();
    expect(screen.getByText('Your Carbon Impact')).toBeInTheDocument();
    expect(screen.getByAltText('Mid Box')).toBeInTheDocument();

    // Check Low
    expect(screen.getByAltText('Transactions')).toBeInTheDocument();
    expect(screen.getByAltText('Goals')).toBeInTheDocument();
    expect(screen.getByAltText('History')).toBeInTheDocument();

    // Check Footer
    expect(screen.getByText(/© 2023-2024 Team7. All rights reserved./i)).toBeInTheDocument();
  });

  // Test case to check navigation to the login page on login button click
  it('navigate to login page on login button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    // By default, settings toggle is not visible
    expect(screen.queryByText('My Account')).not.toBeInTheDocument();

    // Click on settings button to toggle settings
    const settingsButton = screen.getByAltText('Settings');
    settingsButton.click();

    // After clicking, settings dropdown should be visible
    expect(screen.getByText('My Account')).toBeInTheDocument();

    // Identify and simulate a click event on the login button
    const loginButton = screen.getByAltText('Login');
    fireEvent.click(loginButton);

    // Assert that the URL has changed to the login page's route
    expect(history.location.pathname).toBe('/Login');
  });

  // Test case to check navigation to the transactions page on transactions button click
  it('navigate to transactions page on transactions button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    // Identify and simulate a click event on the transactions button
    const transactionsButton = screen.getByAltText('Transactions');
    fireEvent.click(transactionsButton);

    // Assert that the URL has changed to the transactions page's route
    expect(history.location.pathname).toBe('/Transactions');
  });
});

