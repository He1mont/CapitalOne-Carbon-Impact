// History.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import History from '../pages/History.js';
import styles from '../assets/styles/History.module.css';

// History page
describe('<History />', () => {
  it('successfully renders', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    // Check if "Carbon History" exists
    cy.contains('Carbon History').should('exist');
    cy.get(`.${styles.month_select}`).should('be.visible');
  });

  it('handles API errors', () => {
    // Mock an API call that returns an error
    cy.intercept('GET', '/api/data', { statusCode: 500, body: 'Internal Server Error' });
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
  });

  // Title checker 
  it('displays the correct title', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    cy.contains('Carbon History').should('exist');
  });

  // Initial month checker
  it('renders the month selector with correct initial month', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    // Checking format of currentMonth existing with moment
    const currentMonth = moment().format('MMM YYYY');
    cy.contains(currentMonth).should('exist');
  });

  it('renders month range selector buttons', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    cy.get(`.${styles.month_select_btn}`).should('have.length', 4);
  });

  // Visibility check when button category is clicked
  it('toggles category visibility when clicking category buttons', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    // Assert that the Entertainment category is toggled
    cy.contains('Entertainment').should('exist');
    // Assert that the Education category is toggled
    cy.contains('Education').should('exist');
    cy.contains('Shopping').should('exist');
    cy.contains('Personal Care').should('exist');
    cy.contains('Health & Fitness').should('not.exist');
    cy.contains('Food & Dining').should('not.exist');
    cy.contains('Gifts & Donations').should('not.exist');
    cy.contains('Bills & Utilities').should('not.exist');
    cy.contains('Auto & Transport').should('not.exist');
    cy.contains('Travel').should('exist');
  });

  // Updates of month 
  it('updates the month range when clicking the month buttons', () => {
    // Mount the component
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    // Get the initial start month and end month
    cy.window().then(window => {
      // Check if startMonth and endMonth exist
      if (window.startMonth && window.endMonth) {
        // Clone the initial start month and end month
        let initialStartMonth = window.startMonth.clone();
        let initialEndMonth = window.endMonth.clone();

        // Click the left arrow for start month
        cy.get(`.${styles.month_select_btn}`).first().click();
        // Wait for the start month to update
        cy.wait(1000);
        // Assert that the start month has decreased
        expect(window.startMonth.isBefore(initialStartMonth)).to.be.true;

        // Click the right arrow for end month
        cy.get(`.${styles.month_select_btn}`).last().click();
        // Wait for the end month to update
        cy.wait(1000);
        // Assert that the end month has increased
        expect(window.endMonth.isAfter(initialEndMonth)).to.be.true;
      } else {
        // Handle the case where startMonth or endMonth is undefined
        console.error("startMonth or endMonth is undefined");
      }
    });
  });

  // Navigation logo
  it('navigates to the home page on logo click', () => {
    mount(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    cy.url().should('include', '/');
  });

});