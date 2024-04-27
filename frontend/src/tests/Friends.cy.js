import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Friends from '../pages/Friends';
import styles from '../assets/styles/Friends.module.css';


describe('<Friends />', () => {
  // Setup the initial state
  const initialState = {
    name: 'Test User',
    id: 'user-id-123',
  };

  it('renders the Friends page', () => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/friends', state: initialState }]}>
        <Friends />
      </MemoryRouter>
    );
    
    cy.get(`.${styles.mid_high_txt_left}`).contains('Test User').should('exist');// user info
    cy.get(`.${styles.head_bar}`).should('be.visible'); // Header 
   

    // Check for GoBackBtn and Logo components
    cy.get('img[src*="home.png"]').should('exist'); // Check for the GoBack button image
    cy.get('img[src*="/images/Logo.png"]').should('exist'); // Check for the Logo image

   
    cy.get(`.${styles.leaderboard_addfriend}`).should('exist'); // Add friend input box
    cy.get(`button.${styles.button_confirm}`).should('exist'); // Confirm button
    
    cy.get(`.${styles.leaderboard_container}`).contains('To view friends, add them by entering their username').should('exist');
  });
});

/*describe('<Friends />', () => {
  // Setup the initial state and path for API calls
  const initialState = {
    name: 'Test User',
    id: 'user-id-123',
  };

  it('handles friend addition', () => {
    // Intercept API call for adding a friend
    cy.intercept('POST', '/api/path_to_add_friend_endpoint', {
      statusCode: 200,
      body: { message: 'Friend added successfully' },
    }).as('addFriend');

    // Mount the Friends component within the MemoryRouter
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/Friends', state: initialState }]}>
        <Friends />
      </MemoryRouter>
    );

    // Simulate typing a new friend's username and clicking confirm
    cy.get(`input.${styles.leaderboard_addfriend}`).type('newfriend');
    cy.get(`button.${styles.button_confirm}`).click();

    // Wait for the API call to complete
    cy.wait('@addFriend');

   

  });
});*/