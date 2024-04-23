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
    // Check for presence of key components
    cy.get(`.${styles.mid_high_txt_left}`).contains('Test User').should('exist');
  });

 
});

