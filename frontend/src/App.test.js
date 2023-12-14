import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Test whether the home page renders properly
test('renders home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
});

// Test whether the login page renders properly
test('renders login page', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
});

// Test whether the transactions page renders properly
test('renders transactions page', () => {
  render(
    <MemoryRouter initialEntries={['/transactions']}>
      <App />
    </MemoryRouter>
  );
});
