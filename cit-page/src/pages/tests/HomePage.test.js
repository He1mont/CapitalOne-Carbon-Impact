import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders the HomePage component', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  expect(screen.getByAltText('Logo')).toBeInTheDocument();
  expect(screen.getByAltText('Login')).toBeInTheDocument();
  expect(screen.getByText('Fahad... 1234')).toBeInTheDocument();
  expect(screen.getByText('Your Carbon Impact')).toBeInTheDocument();
  expect(screen.getByText('View your Carbon Impact')).toBeInTheDocument();
  expect(screen.getByText('Find out how your spending habits affect the planet and how you can reduce your carbon footprint.')).toBeInTheDocument();
  expect(screen.getByText('? Help')).toBeInTheDocument();
  expect(screen.getByText('View Transactions')).toBeInTheDocument();
  expect(screen.getByText('Carbon Goals')).toBeInTheDocument();
  expect(screen.getByText('Carbon History')).toBeInTheDocument();
  expect(screen.getByText('© 2023-2024 Team7. All rights reserved.')).toBeInTheDocument();
});

test('redirects to /Login when Login button is clicked', () => {
  const { history } = render(
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>
  );

 
  fireEvent.click(screen.getByAltText('Login'));
  expect(history.location.pathname).toBe('/Login');
});

test('redirects to /Transactions when Transactions button is clicked', () => {
  const { history } = render(
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('View Transactions'));
  expect(history.location.pathname).toBe('/Transactions');
});
