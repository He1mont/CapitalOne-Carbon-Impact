// Login.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

describe('Login Component', () => {
  // Test case for rendering the Login page components correctly
  it('renders Login page component', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check Mid
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Username (email)')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Forgot your username?')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();

    // Check Footer
    expect(screen.getByText(/© 2023-2024 Team7. All rights reserved./i)).toBeInTheDocument();
  });

  // Test case for checking navigation to the homepage on clicking the logo
  it('navigate back to homepage on logo button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Simulate a click event on the logo
    const logo = screen.getByAltText('Logo');
    fireEvent.click(logo);

    // Assert that the navigation has occurred to the home page
    expect(history.location.pathname).toBe('/');
  });

  // Test case for checking if user can input email and password
  it('allows entering email and password', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Simulate user input for email and password fields
    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the values have been updated in the input fields
    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Test case for checking successful form submission and login message display
  it('submits the form and shows login message on valid input', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Simulate user input and submit the form
    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.click(submitButton);

    // Assert that the login success message is displayed
    expect(screen.getByText('Logged in successfully!')).toBeInTheDocument();
  });

  // Test case for checking the functionality of the remember me checkbox
  it('toggles remember me checkbox', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <Login />
        </Router>
    );

    // Interact with the remember me checkbox
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).not.toBeChecked();

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });

  // Test case for verifying that an error message is displayed on incorrect login
  it('shows error message on incorrect login', () => {
    render(<Login />);

    // Simulate incorrect user input and submit the form
    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    // Assert that the error message is displayed
    expect(screen.getByText('Username or password is incorrect.')).toBeInTheDocument();
  });
});
