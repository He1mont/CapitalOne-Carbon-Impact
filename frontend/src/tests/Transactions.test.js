import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Transactions from '../pages/Transactions';

describe('Transactions Component', () => {
  it('renders the transaction page components', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Transactions />
      </Router>
    );

    // check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // check Mid
    expect(screen.getByText('Benjamin ... 1234')).toBeInTheDocument();
    expect(screen.getByText('View Transactions')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('kgco2')).toBeInTheDocument();
    expect(screen.getByText('estimate')).toBeInTheDocument();

    // check Low
    // expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    // expect(screen.getByText('Filter')).toBeInTheDocument();
    // expect(screen.getByText('Date')).toBeInTheDocument();
    // expect(screen.getByText('Description')).toBeInTheDocument();
    // expect(screen.getByText('Category')).toBeInTheDocument();
    // expect(screen.getByText('Carbon Impact (kgco2)')).toBeInTheDocument();
    // expect(screen.getByText('Cost')).toBeInTheDocument();
    // expect(screen.getByText('1')).toBeInTheDocument(); // Example row data
  });

  it('renders the Mid component with transaction details', () => {
    render(<Transactions />);

  });

  it('renders the TransactionTbl component with table', () => {
    render(<Transactions />);

  });

  // Additional tests can be written to cover other aspects or interactions in the component
});
