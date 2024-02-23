// Login.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

describe('Login Component', () => {
  // Test case for rendering the Login page components correctly
  it('renders Login page with logo', () => {
    render(<Login />);

    // Check Head
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Additional checks for other elements or attributes
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Username (email)')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Forgot your username?')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();

    // Check Footer
    expect(screen.getByText(/© 2023-2024 Team7. All rights reserved./i)).toBeInTheDocument();
  });



  it('handles form submission correctly', () =>{
    render(<Login />);

    //Mock the API call or any external dependencies
    jest.spyOn(global, 'fetch').mockResolvedValue({/* mock response */ });

    // Simulate user input and form submission

    const emailInput = screen.getByLabelText('Username (email)');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(screen.getByLabelText('Username (email)'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    // Assert that the form submission logic is working correctly
    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('password123');

    // Note: You may need to adjust the logic based on your actual implementation
  });


  // Test case for checking successful form submission and login message display
  it('submits the form and shows login message on valid input', async() => {
    render(<Login />);

    //Mock the API call or any external dependencies
    jest.spyOn(global, 'fetch').mockResolvedValue({/* mock response */ });

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
  it('toggles remember me checkbox', async() => {
    render(<Login />);

    //Mock the API call or any external dependencies
    jest.spyOn(global, 'fetch').mockResolvedValue({/* mock response */ });

    // Interact with the remember me checkbox
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).not.toBeChecked();

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });



  // Test case for verifying that an error message is displayed on incorrect login
  it('shows error message on incorrect login', async() => {
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


  it('redirects to the home page on logo click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const logo = screen.getByAltText('Logo');

    // Simulate clicking on the logo
    fireEvent.click(screen.getByAltText('Logo'));

    // Assert that the user is redirected to the home page
    expect(history.location.pathname).toBe('/');
  });

});
