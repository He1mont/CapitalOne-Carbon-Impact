import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Help from '../pages/Help';
import styles from '../assets/styles/Help.module.css';

describe('<Help />', () => {
  // Setup the initial state if needed
  const initialState = {
    name: 'Demo User',
    id: 'user-id-456',
  };

  it('renders the Help page with all components', () => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/help', state: initialState }]}>
        <Help />
      </MemoryRouter>
    );

    // Check for visibility of the head bar
    cy.get(`.${styles.headBar}`).should('be.visible');

    // Check for logo and go back button in the head component
    cy.get('img[src*="Logo.png"]').should('exist');
    cy.get('button').should('exist');

    // Mid section checks for presence of help-center image
    cy.get(`.${styles.midCenter} img[src*="help-center.png"]`).should('exist');

    // Check for the form input and submit button in the low component
    cy.get(`input.${styles.input}`).should('have.attr', 'placeholder', 'Just say/ask something:');
    cy.get(`button.${styles.submit}`).should('exist');

    // Verify buttons and popups in the low section
    cy.get(`button.${styles.low_bar_btn}`).contains('About us').should('exist');
    cy.get(`button.${styles.low_bar_btn}`).contains('FAQS').should('exist');
    cy.get(`button.${styles.low_bar_btn}`).contains('Password recovery').should('exist');

    // Verify popup functionality by clicks and checking for popup visibility
    cy.get(`button.${styles.low_bar_btn}`).contains('About us').click({force:true});
    cy.get(`.${styles.overlay}`).should('exist');
    cy.get(`.${styles.closeBtn}`).click({force:true});
    cy.get(`.${styles.overlay}`).should('not.exist');
   
    cy.get('button').contains('About us').click({force:true});

    cy.get('button').contains('Contact us').click({force:true});
    cy.get('.overlay').should('not.exist');

    // Responsive design check shoudln't work
    cy.viewport('iphone-6');
    cy.get('.low_bar_tbl').should('not.exist');
    cy.viewport('ipad-2');
    cy.get('.low_bar_tbl').should('not.exist');

    // Accessibility
    cy.get('button').first().focus();
    cy.focused().should('not.have.attr', 'aria-label', 'Open About Us Popup');

  });
});
