// Friends.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Friends from '../../src/pages/Friends';
import styles from '../../src/assets/styles/Friends.module.css';

describe('<Friends /> Component Tests', () => {
  // Before each test, mount the Friends component within a MemoryRouter to handle routing
  beforeEach(() => {
    mount(
      <MemoryRouter>
        <Friends />
      </MemoryRouter>
    );
  });

  // Test to ensure that the Friends page renders with all intended components visible
  it('renders the Friends page with all components visible', () => {
    // Check for visibility of the header bar
    cy.get(`.${styles.head_bar}`).should('be.visible');

    // Verify home and logo images are present as expected
    cy.get('img[src*="home.png"]').should('exist');
    cy.get('img[src*="/images/Logo.png"]').should('exist');

    // Confirm presence of components like add friend section and confirm button
    cy.get(`.${styles.leaderboard_addfriend}`).should('exist');
    cy.get(`button.${styles.button_confirm}`).should('exist');

    // Ensure the leaderboard container displays the correct default text
    cy.get(`.${styles.leaderboard_container}`).contains('To view friends, add them by entering their username').should('exist');
  });

  // Test to check if the Friends component is responsive on mobile devices
  it('checks responsiveness on mobile devices', () => {

    // Set the viewport to iPhone 6 size and check for visibility of the add friend section
    cy.viewport('iphone-6');
    cy.get(`.${styles.leaderboard_addfriend}`).should('exist');

    // Set the viewport to iPad 2 size and check for the same component
    cy.viewport('ipad-2');
    cy.get(`.${styles.leaderboard_addfriend}`).should('exist');
  });

  // Test to verify that the layout adjusts correctly for mobile view 
  it('should adjust layout for mobile view', () => {
    cy.viewport('iphone-6');

    // Check that the middle container adjusts its width and no data grid is present.
    cy.get(`.${styles.mid_center}`).should('have.css', 'width').and('match', /px/);
    cy.get('.MuiDataGrid-root').should('not.exist');
  });
});