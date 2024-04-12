import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AccountID from './AccountID';

describe('AccountID', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AccountID />
      </MemoryRouter>
    );
  });

  it('renders expected elements in the header', () => {
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Back')).toBeInTheDocument();
  });

  it('renders the expected elements in the mid section', () => {
    expect(screen.getByText('Account ID')).toBeInTheDocument();
  });

  it('renders the expected elements in the low section', () => {
    expect(screen.getByLabelText('New AccountID')).toBeInTheDocument();
    expect(screen.getByText('Change Account ID')).toBeInTheDocument();
  });

  it('updates the account ID when input changes', () => {
    const accountIDInput = screen.getByLabelText('New AccountID');
    fireEvent.change(accountIDInput, { target: { value: 'newAccount123' } });
    expect(accountIDInput.value).toBe('newAccount123');
  });

  it('navigates back to the home page when "Back" button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <AccountID />
      </Router>
    );

    fireEvent.click(screen.getByAltText('Back'));
    expect(history.location.pathname).toBe('/HomePage');
  });

  it('calls setAccountID function with new value when "Change Account ID" button is clicked', () => {
    const mockSetAccountID = jest.fn();
    render(<AccountID setAccountID={mockSetAccountID} />);

    const accountIDInput = screen.getByLabelText('New AccountID');
    fireEvent.change(accountIDInput, { target: { value: 'newAccount123' } });

    const changeButton = screen.getByText('Change Account ID');
    fireEvent.click(changeButton);

    expect(mockSetAccountID).toHaveBeenCalledWith('newAccount123');
  });

  
});