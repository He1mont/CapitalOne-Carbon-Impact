// login.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login Component', () => {
  // Before each test, mount the Login component wrapped in a MemoryRouter
  beforeEach(() => {
    mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  // Ensure all crucial elements are rendered correctly on the Login page
  it('renders Login page with logo and form elements', () => {
    cy.contains('Log in to your account').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Password').should('be.visible');
    cy.contains('Remember me').should('be.visible');
    cy.contains('Log in').should('be.visible');
    cy.contains('Forgot your email?').should('be.visible');
    cy.contains('Forgot your password?').should('be.visible');
    cy.contains('? Help').should('be.visible');
    cy.get('img[alt="Logo"]').should('be.visible');
  });

  // Check the functionality of the Remember Me checkbox
  it('toggles remember me checkbox', () => {
    cy.get('input[type="checkbox"]').as('checkbox');
    cy.get('@checkbox').click().should('be.checked');
    cy.get('@checkbox').click().should('not.be.checked');
  });
});
