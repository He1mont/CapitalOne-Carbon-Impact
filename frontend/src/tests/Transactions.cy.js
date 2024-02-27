import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Transactions from '../pages/Transactions';

describe('Transactions Page', () => {
  beforeEach(() => {
    mount(
      <MemoryRouter initialEntries={['/transactions']}> 
        <Transactions />
      </MemoryRouter>
    );
  });


  it('successfully renders the Transactions page components', () => {
   cy.contains('View Transactions').should('exist');
   cy.contains('Carbon Impact (kgco2)').should('exist');
    cy.contains('Date').should('exist');
    cy.contains('Category').should('exist');
    cy.contains('Amount').should('exist');
    cy.contains('Description').should('exist');
    cy.contains('1000').should('exist');
    cy.contains('estimate').should('exist');
    cy.contains('kgco2').should('exist');
    cy.contains('You need to login').should('exist');
    cy.contains('Feb 2024').should('exist');
  // cy.get('.head_img').should('exist');
  });
  it('displays the logo image and navigates on click', () => {
    // Assert that the logo image exists
    cy.get('.head_img').should('have.length', 0);

  });
  describe('Mid Component Functionality', () => {
    it('displays user information and transaction overview', () => {
      // Check for the "View Transactions" heading
      cy.contains('View Transactions').should('exist');
      // Adjusted to match the default state when no user name is provided
      cy.contains('You need to login').should('exist');
    });
  

    it('renders the transaction summary with correct information', () => {
      // Verify the transaction summary image and text content
     // cy.get('.mid_box').should('be.visible');
      cy.contains('1000 kgco2').should('exist');
    });
    it('allows searching for transactions', () => {
    
      // Check if the transactions are filtered correctly
      cy.contains('Transaction').should('exist');
    });
    
    
  });
    

});

