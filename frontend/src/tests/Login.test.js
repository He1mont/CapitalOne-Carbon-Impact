import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

describe('Login Component', () => {
  it('renders Login page component', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // check Mid
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Username (email)')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Forgot your username?')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();

    // check Footer
    expect(screen.getByText(/© 2023-2024 Team7. All rights reserved./i)).toBeInTheDocument();
  });

  it('navigate back to homepage on logo button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const logo = screen.getByAltText('Logo');
    fireEvent.click(logo);

    // Check if the login route is changed correctly
    expect(history.location.pathname).toBe('/');
  });

  it('allows entering email and password', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Simulate user typing into email and password fields
    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the input values have been updated
    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and shows login message on valid input', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Logged in successfully!')).toBeInTheDocument();
  });

  it('toggles remember me checkbox', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <Login />
        </Router>
    );

    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).not.toBeChecked();

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });

  it('shows error message on incorrect login', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Username or password is incorrect.')).toBeInTheDocument();
  });
});
