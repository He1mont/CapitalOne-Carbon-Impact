import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Help from '../pages/Help'
import styles from '../assets/styles/Help.module.css';

describe('Help Component', () => {
  it('successfully renders', () => {
    mount(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    // Check for headbar to exist
    cy.get(`.${styles.headBar}`).should('exist');
  });

  it('collapsible tests, on click open & close ', () => {
    mount(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    // Initially, content inside should not be visible
    cy.get(`.${styles.content}`).should('not.be.visible');

    // Click to expand a section and check if content becomes visible
    cy.get(`.${styles.header}`).first().click();
    cy.get(`.${styles.content}`).first().should('be.visible');

    // Click again and check if content is not visible
    cy.get(`.${styles.header}`).first().click();
    cy.get(`.${styles.content}`).first().should('not.be.visible');
  });

  it('navigates to home page on logo click', () => {
    mount(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    
    // Check if the headImg is clicked goes back to homepage
    cy.get(`.${styles.headImg}`).click();
    cy.url().should('include', '/');
  });

  it('displays user guide sections', () => {
    mount(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    // Check for the Profile Help & Site Help
    cy.contains('Profile Help').should('exist');
    cy.contains('Site Help').should('exist');
  });

  it('renders footer displayed', () => {
    mount(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    // Footer text content exist
    cy.get(`.${styles.footer}`).contains('© 2023-2024 Team7. All rights reserved.').should('exist');
  });


});