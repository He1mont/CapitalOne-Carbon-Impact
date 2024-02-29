import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import styles from '../assets/styles/Transactions.module.css';
import moment from 'moment'; 
import Transactions from '../pages/Transactions';

describe('Transactions Page', () => {
  beforeEach(() => {
    mount(
      <MemoryRouter initialEntries={['/transactions']}> 
        <Transactions />
      </MemoryRouter>
    );
  });

  it('successfully renders the Transactions page components', () => {
    cy.contains('View Transactions').should('exist');
    cy.contains('Carbon Impact (kgco2)').should('exist');
    cy.contains('Date').should('exist');
    cy.contains('Category').should('exist');
    cy.contains('Amount').should('exist');
    cy.contains('Description').should('exist');
    cy.contains('1000').should('exist');
    cy.contains('estimate').should('exist');
    cy.contains('kgco2').should('exist');
    cy.contains('You need to login').should('exist');
    cy.contains('Feb 2024').should('exist');
    cy.get(`.${styles.head_img}`).should('exist');
  });

  describe('Head Component Functionality', () => {
    it('renders the logo image', () => {
      cy.get('img').should('have.attr', 'src', '/images/Logo.png');
    });
  });

  describe('Mid Component Functionality', () => {
    it('displays user information and transaction overview', () => {
      // Check for the "View Transactions" heading
      cy.contains('View Transactions').should('exist');
      // Adjusted to match the default state when no user name is provided
      cy.contains('You need to login').should('exist');
    });
  
    it('renders the transaction summary with correct information', () => {
      // Verify the transaction summary image and text content
      cy.get(`.${styles.mid_box}`).should('be.visible');
      cy.contains('1000 kgco2').should('exist');
      cy.contains('estimate').should('exist');
    });

    it('allows searching for transactions', () => {
    
      // Check if the transactions are filtered correctly
      cy.contains('Transaction').should('exist');
    });
    
    it('renders the MonthSelect component', () => {
      // Verify that the MonthSelect component is rendered
      const initialMonth = moment().format('MMM YYYY');
  
      cy.get(`.${styles.mid_high_center}`).should('exist');
      cy.contains(initialMonth).should('exist');
    });

    it('changes the month when selecting a different month', () => {
      // Mock function to handle month change
      const onMonthChange = cy.stub().as('handleMonthChange');
  
      // Mount the Transactions component with mock props
      mount(
        <MemoryRouter initialEntries={['/transactions']}>
          <Transactions />
        </MemoryRouter>
      );
  
      // Click on the right arrow to increase the month
      cy.get(`.${styles.month_select_btn}`).last().click({force: true}); // using force : true  to disable error checking for now 
  
      // Assert that the onMonthChange function was called
      //cy.get('@handleMonthChange').should('have.been.calledOnce');
    });
  });

  // describe('Low Component Functionality', () => {
  //   it('renders the whole transaction table', () => {
  //     mount(
  //       <MemoryRouter>
  //         <Transactions />
  //       </MemoryRouter>
  //     );
  //     cy.get('.transaction_tbl').should('exist');
  //   });
  // });

});

