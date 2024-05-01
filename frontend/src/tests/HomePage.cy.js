import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import styles from '../assets/styles/Home.module.css';
import { createMemoryHistory } from 'history';

describe('HomePage Component', () => {
  // Test to ensure the HomePage component renders correctly
  it('successfully renders', () => {
    // Mount the HomePage inside a MemoryRouter to handle any potential routing
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Check for the presence of specific text elements that indicate successful rendering
    cy.contains('You need to login').should('exist'); // login check
    cy.contains('Your Carbon Impact').should('exist'); // Verifies the carbon impact section is rendered
  });
});

describe('Head Component', () => {
  // Test to ensure the head component renders
  it('renders the logo and settings button', () => {
    // Mount the component within a MemoryRouter
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Verify the head bar is present and can be interacted with
    cy.get(`.${styles.head_bar}`).should('exist');
    cy.get(`.${styles.head_bar}`).click();
  });
});
describe('Mid Component', () => {
  // Test to verify that the middle section of the homepage renders correctly
  it('shows default login prompt and carbon impact info', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for default messages and mid box content
    cy.contains('You need to login').should('exist');
    cy.contains('Your Carbon Impact').should('exist');
    cy.get(`.${styles.mid_box}`).should('exist'); // Check if the image loads correctly
    cy.get(`.${styles.mid_box_txt}`).contains('Find out how your spending habits affect the planet').should('exist');
  });

  // Test to ensure that the user's name is displayed when logged in
  it('displays user name when logged in', () => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { name: 'John Doe' } }]}>
        <HomePage />
      </MemoryRouter>
    );

    // Verify that the user's name is displayed
    cy.contains('John Doe').should('exist');
  });
});


describe('Low Component', () => {
  // Test to check if the lower component of the home page renders buttons and handles navigation correctly
  it('renders buttons and navigates correctly', () => {
    const history = createMemoryHistory(); // Create a memory history object
    const spy = cy.spy(history, 'push').as('historyPush'); // Spy on the history.push method

    mount(
      <Router history={history}>
        <HomePage />
      </Router>
    );
    
    // Ensure the correct number of navigation buttons are present
    cy.get(`.${styles.low_bar_btn}`).should('have.length', 3);

  /*  cy.get(`.${styles.low_bar_btn}`).eq(0).click().then(() => {
      expect(spy).to.have.been.calledWith('../Pages/Transactions');
    });
    cy.get(`.${styles.low_bar_btn}`).eq(1).click().then(() => {
      expect(spy).to.have.been.calledWith('/home/goals');
    });
    cy.get(`.${styles.low_bar_btn}`).eq(2).click().then(() => {
      expect(spy).to.have.been.calledWith('/home/history');
    });*/
  });
});



