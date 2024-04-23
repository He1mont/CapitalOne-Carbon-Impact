import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import { GoBackBtn, Logo, SettingBtn, Footer } from '../pages/CommonComponents';
import styles from '../assets/styles/CommonComponent.module.css';
import * as reactRouter from 'react-router-dom';

describe('Common Components', () => {
  context('GoBackBtn', () => {
    it('navigates to the home page on click', () => {
      const pushSpy = cy.spy();
      mount(
        <MemoryRouter>
          <GoBackBtn name="Test User" id="123" history={{ push: pushSpy }} />
        </MemoryRouter>
      );
      cy.window().then((win) => {
        win.location.search = '?prevPage=home'; // Mocking URL search params
      });
      cy.get(`button.${styles.go_back_btn}`).click();
      expect(pushSpy).to.have.been.calledWith({
        pathname: '/home',
        state: { name: 'Test User', id: '123' }
      });
    });
  });

  context('Logo', () => {
    it('renders the logo image', () => {
      mount(
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      );
      cy.get(`img.${styles.head_img}`).should('have.attr', 'src').and('include', 'Logo.png');
    });
  });

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

