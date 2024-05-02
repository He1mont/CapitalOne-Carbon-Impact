import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../src/App';
import '../../src/assets/styles/App.css';

describe('<App />', () => {
  beforeEach(() => {
    // Use the correctly named component for mounting
    mount(
      <Router>
        <App />  
      </Router>
    );
  });

  // Render loging should exist
  it('redirects to "/login" by default', () => {
    cy.url().should('include', '/login');
    cy.get('form').should('exist');
  });

  // Render transaction  not be existing 
  it('Should not renderthe transactions page at "/home/transactions"', () => {

    cy.contains('Transactions').should('not.exist');
  });

  // Render goals  not be existing 
  it('Should not render the goals page at "/home/goals"', () => {
    cy.contains('Goals').should('not.exist');
  });

  // Render history not be existing 
  it('Should not render the history page at "/home/history"', () => {

    cy.contains('History').should('not.exist');
  });

  // Render friends not be existing 
  it('Should not render the friends page at "/home/friends"', () => {
    cy.contains('Friends').should('not.exist');
  });

  // Render account not be existing 
  it('Should not render the account page at "/home/account"', () => {
    cy.contains('My Account').should('not.exist');
  });

});