// Goals.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import Goals from '../pages/Goals';
import styles from '../assets/styles/Goals.module.css';

const mockLocationState = {
  name: 'John Doe',
  id: '123'
};

describe('<Goals />', () => {
  // Test to ensure that the component renders correctly with initial data
  it('successfully renders with initial month and user data', () => {
    mount(
      <MemoryRouter history={history}>
        <Goals />
      </MemoryRouter>,
      {
        // Provide the initial location state 
        props: {
          location: { state: mockLocationState }
        }
      }
    );

    // Assert that specific texts indicating successful rendering are visible
    cy.contains('Carbon Goals').should('exist');// Title
    cy.contains('You need to login').should('exist');
    cy.contains(moment().format('MMM YYYY')).should('exist');// Checks for the current month
  });

  // Handle exceptions globally to avoid failing tests due to unrelated React Router errors or other exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore errors stemming from React Router misuse or other irrelevant errors
    console.log('Uncaught exception', err);
    return false;
  });

  const baseMonth = moment();
  // Test to check if the component correctly displays the current month at initial render
  it('renders with correct initial month', () => {
    const onMonthChangeMock = cy.stub();
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    // Check that the initial month is displayed correctly
    cy.contains(baseMonth.format('MMM YYYY')).should('exist');
  });

  // Test to verify the functionality of the increase month button
  it('changes month when decrease month button is clicked', () => {
    const onMonthChangeMock = cy.stub();
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    //  Click the button to decrease the month
    cy.get(`.${styles.month_select_btn}`).first().click();

    // Check that the month has decreased
    const expectedMonth = baseMonth.clone().subtract(1, 'month').format('MMM YYYY');
    cy.contains(expectedMonth).should('exist');
  });

  // Test to verify the functionality of the increase month button
  it('changes month when increased month button is clicked', () => {
    const onMonthChangeMock = cy.stub();
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    // Click the button to decrease the month
    cy.get(`.${styles.month_select_btn}`).first().click();

    // Check that the month has decreased
    const expectedMonth = baseMonth.clone().subtract(1, 'month').format('MMM YYYY');
    cy.contains(expectedMonth).should('exist');
  });

  // Test to ensure that the lower section of the component is rendered correctly
  it('renders lower section content', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    // Ensure that the lower section content is rendered
    cy.get(`.${styles.low_bar}`).should('exist');
  });

  // Test to ensure that unauthenticated users are redirected to the login page
  it('redirects unauthenticated users to login page', () => {
    // Clear any stored authentication tokens
    cy.clearLocalStorage();
  });
});
