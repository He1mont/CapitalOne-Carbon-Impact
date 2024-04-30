import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import { GoBackBtn, Logo, SettingBtn, Footer } from '../pages/CommonComponents';
import styles from '../assets/styles/CommonComponent.module.css';
import * as reactRouter from 'react-router-dom';

describe('Common Components', () => {
 

  describe('SettingBtn', () => {
    it('navigates on clicking different settings options', () => {
      // Assuming reactRouter.useHistory is already stubbed as shown above
      mount(
        <MemoryRouter>
          <SettingBtn name="Test User" id="123" />
        </MemoryRouter>
      );
  
   
    });
  });
  

  context('Footer', () => {
    it('renders the footer text correctly', () => {
      mount(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      cy.get(`div.${styles.footer}`).contains('© 2023-2024 Team7. All rights reserved.');
    });
  });
});

