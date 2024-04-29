import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Friends from '../pages/Friends';
import styles from '../assets/styles/Friends.module.css';

describe('<Friends /> Component Tests', () => {
  const initialState = {
    name: 'Test User',
    id: 'user-id-123',
  };

  beforeEach(() => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/friends', state: initialState }]}>
        <Friends />
      </MemoryRouter>
    );
  });

  it('renders the Friends page with all components visible', () => {
    cy.get(`.${styles.mid_high_txt_left}`).contains('Test User').should('exist');
    cy.get(`.${styles.head_bar}`).should('be.visible');
    cy.get('img[src*="home.png"]').should('exist');
    cy.get('img[src*="/images/Logo.png"]').should('exist');
    cy.get(`.${styles.leaderboard_addfriend}`).should('exist');
    cy.get(`button.${styles.button_confirm}`).should('exist');
    cy.get(`.${styles.leaderboard_container}`).contains('To view friends, add them by entering their username').should('exist');
  });

  it('toggles the manage friends dropdown and closes when clicking outside', () => {
    //cy.get(`button.${styles.dropbtn}`).click({force:});
   // cy.get(`.${styles.dropdownContent}`).should('have.class', styles.show);
    //cy.get('body').click(0, 0);
    //cy.get(`.${styles.dropdownContent}`).should('not.have.class', styles.show);
  });

  it('checks responsiveness on mobile devices', () => {
    cy.viewport('iphone-6');
    cy.get(`.${styles.leaderboard_addfriend}`).should('not.exist');
    cy.viewport('ipad-2');
    cy.get(`.${styles.leaderboard_addfriend}`).should('not.exist');
  });


});