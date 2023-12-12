// Transactions.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Transactions from '../pages/Transactions';

describe('Transactions Component', () => {
  // Test case for rendering the main components of the Transactions page
  it('renders the transaction page components', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Transactions />
      </Router>
    );

    // Check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check Mid
    expect(screen.getByText('Benjamin ... 1234')).toBeInTheDocument();
    expect(screen.getByText('View Transactions')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('kgco2')).toBeInTheDocument();
    expect(screen.getByText('estimate')).toBeInTheDocument();

    // Check Low
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();

    // Check Table
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Carbon Impact (kgco2)')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Example row data
  });
});
