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
    
    cy.get('.login-btn').should('exist');
    cy.contains('Your Carbon Impact').should('exist');
    cy.get('.low-bar-btn').should('have.length', 3);
    cy.get('.footer').should('contain', '© 2023-2024 Team7. All rights reserved.');
  });
});
