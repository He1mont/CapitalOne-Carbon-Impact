import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import { GoBackBtn, Logo, SettingBtn, Footer } from '../pages/CommonComponents';
import styles from '../assets/styles/CommonComponent.module.css';
import * as reactRouter from 'react-router-dom';

describe('Common Components', () => {
  /*context('GoBackBtn', () => {
    it('navigates to the home page on click', () => {
      // Stub the useHistory hook to control navigation behavior
      const historyPush = cy.spy();
      cy.stub(reactRouterDom, 'useHistory').returns({ push: historyPush });

      // Mount the component within the MemoryRouter
      mount(
        <MemoryRouter initialEntries={['/?prevPage=home']}>
          <GoBackBtn name="Test User" id="123" />
        </MemoryRouter>
      );

      // Simulate the button click
      cy.get(`button.${styles.go_back_btn}`).click();

      // Assert that history.push was called with the correct arguments
      expect(historyPush).to.have.been.calledWith({
        pathname: '/home',
        state: { name: 'Test User', id: '123' }
      });
    });
  });*/

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

