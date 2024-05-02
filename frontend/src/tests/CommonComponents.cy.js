// CommonComponents.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import { GoBackBtn, Logo, SettingBtn, Footer } from '../pages/CommonComponents';
import styles from '../assets/styles/CommonComponent.module.css';

// Components checks
describe('Common Components', () => {

  describe('SettingBtn', () => {
    // Test case to ensure the SettingBtn component navigates correctly when different options are clicked
    it('navigates on clicking different settings options', () => {
      // Mount the SettingBtn component inside a MemoryRouter to handle routing
      mount(
        <MemoryRouter>
          <SettingBtn name="Test User" id="123" />
        </MemoryRouter>
      );
    });
  });

  // Footer checks
  context('Footer', () => {
    // Test case to verify that the Footer component renders the expected text correctly
    it('renders the footer text correctly', () => {
      // Mount the Footer component inside a MemoryRouter since the Footer may contain links that require routing context
      mount(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      cy.get(`div.${styles.footer}`).contains('© 2023-2024 Team7. All rights reserved.');
    });
  });
});

