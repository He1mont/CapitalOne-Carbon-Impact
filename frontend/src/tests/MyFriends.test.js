import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MyFriends from './MyFriends';

describe('MyFriends', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MyFriends />
      </MemoryRouter>
    );
  });

  it('renders expected elements in the header', () => {
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Back')).toBeInTheDocument();
  });

  it('renders the expected elements in the mid section', () => {
    expect(screen.getByText('My Friends')).toBeInTheDocument();
  });

  it('renders the list of friends', () => {
    const friendsList = ['Friend1', 'Friend2', 'Friend3'];
    render(
      <MemoryRouter>
        <MyFriends friendsList={friendsList} />
      </MemoryRouter>
    );

    friendsList.forEach((friend) => {
      expect(screen.getByText(friend)).toBeInTheDocument();
    });
  });

  it('removes a friend when the "Remove" button is clicked', () => {
    const friendsList = ['Friend1', 'Friend2', 'Friend3'];
    render(
      <MemoryRouter>
        <MyFriends friendsList={friendsList} />
      </MemoryRouter>
    );

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]); // Remove the first friend

    expect(screen.queryByText('Friend1')).not.toBeInTheDocument();
    expect(screen.getByText('Friend2')).toBeInTheDocument();
    expect(screen.getByText('Friend3')).toBeInTheDocument();
  });

  it('navigates back to the home page when "Back" button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MyFriends />
      </Router>
    );

    fireEvent.click(screen.getByAltText('Back'));
    expect(history.location.pathname).toBe('/HomePage');
  });

  
});