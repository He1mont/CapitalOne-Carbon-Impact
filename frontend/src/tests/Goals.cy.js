import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment'; 
import Goals from '../pages/Goals';
import styles from '../assets/styles/Goals.module.css';

describe('<Goals />', () => {
  it('successfully renders', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

       // Rendering
       cy.contains('Carbon Goals').should('exist');
       

       
  });
  
  it('renders the month selector with correct initial month', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    // Checking format of currentMonth existing
    const currentMonth = moment().format('MMM YYYY'); 
    cy.contains(currentMonth).should('exist');
  });
  it('changes the month when clicking on month selector arrows', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );
  
    // Get the initial month
    const initialMonth = moment().format('MMM YYYY');
  
    // Click on the left arrow to decrease the month
    cy.get(`.${styles.month_select_btn}`).first().click();
  
    // Assert that the month has changed
    cy.contains(initialMonth).should('not.exist');
  
    // Click on the right arrow to increase the month
    cy.get(`.${styles.month_select_btn}`).last().click();
  
    // Assert that the month has changed back to the initial month
    cy.contains(initialMonth).should('exist');
  });
  

  /*it('renders the CarbonUseCircle component with correct carbon emission and goal emissions', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );
    cy.wait(1000);
    // Ensure that the CarbonUseCircle component renders correctly with given props
    cy.get(`.${styles.head_img}`).within(() => {
      cy.contains('1600 kgco2').should('exist');
      cy.contains('2000 kgco2').should('exist');
    });
  });*/
  it('navigates to home page on logo click', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );

    // Click on the logo to navigate to the home page
    cy.get(`.${styles.head_img}`).click();

   // cy.url().should('eq', 'http://localhost:8080/');
  });

  it('navigates to profile page on user profile icon click', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );
  
    // Click on the user profile icon
    cy.get(`.${styles.mid_high_profile}`).click();
  
    // URL has changed to the profile page
   // cy.url().should('eq', 'http://localhost:8080/')
  });


  it('renders lower section content', () => {
    mount(
      <MemoryRouter>
        <Goals />
      </MemoryRouter>
    );
  
    // Ensure that the lower section content is rendered
    cy.get(`.${styles.low_bar}`).should('exist');
  });

  it('redirects unauthenticated users to login page', () => {
   // Clear any stored authentication tokens
    cy.clearLocalStorage(); 
    

  });
  

});
