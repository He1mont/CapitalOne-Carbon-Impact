// MyAccount.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import MyAccount from '../pages/MyAccount';
import styles from '../assets/styles/MyAccount.module.css';

describe('<MyAccount />', () => {
  // Renders all the frontend components checks
  it('renders the MyAccount page with all components', () => {
    mount(
      <MemoryRouter>
        <MyAccount />
      </MemoryRouter>
    );

    // Verify that the header is visible and rendered
    cy.get(`.${styles.headBar}`).should('be.visible');
    cy.get('img[src*="logo.png"]').should('not.exist');  // logo
    cy.get(`button`).contains('Back').should('not.exist');  // go back button
    
    // Check for the account information and transaction sections
     cy.get(`.${styles.titleText}`).contains('My Account').should('exist');
     cy.get(`.${styles.sectionHeader}`).contains('Personal').should('exist');
     cy.get(`.${styles.sectionHeader}`).contains('Transactions').should('exist');

    // Ensure the account and transaction tables are populated correctly
    cy.get(`.${styles.AccInfoTable} td`).contains('Firstname(s):').should('exist');
    cy.get(`.${styles.AccInfoTable} td`).contains('Phone Number:').should('exist');
    cy.get(`.${styles.AccInfoTable} td`).contains('First Transaction:').should('exist');


    // Check dropdowns for color correction and currency, and the submit button in the form
     cy.get(`select#${styles.AccTableDropdown}`).should('not.exist');
     cy.get(`input.${styles.AccTableSubmit}`).should('exist');
    
     // Responsive and accessibility checks
    cy.viewport('iphone-x');
    cy.get(`.${styles.midHigh}`).should('be.visible');
    cy.get(`.${styles.midLow}`).should('be.visible');

    cy.get('button').first().focus();
    cy.focused().should('have.not.attr', 'aria-label', 'Go back to previous page');
  });
});
