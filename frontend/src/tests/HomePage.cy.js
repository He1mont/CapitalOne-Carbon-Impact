import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

describe('HomePage Component', () => {
  it('successfully renders', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    
    // Check if the Head component renders correctly
    cy.get('.head-bar').should('exist');

    cy.get('.login-btn').should('exist');

    // Check if the Mid component renders with default name
    cy.contains('You need to login').should('exist');
    cy.contains('Your Carbon Impact').should('exist');

    // Check if the Low component renders buttons correctly
    cy.get('.low-bar-btn').should('have.length', 3); 

    // Check if the Footer component renders correctly
    cy.get('.footer').contains('© 2023-2024 Team7. All rights reserved.').should('exist');
  });

});
