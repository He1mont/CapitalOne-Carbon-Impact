import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import styles from '../assets/styles/Transactions.module.css';
import moment from 'moment'; 
import Transactions from '../pages/Transactions';
import { TransactionTbl } from '../pages/Transactions';

describe('<Transactions />', () => {
  it('successfully renders the transactions page', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.get(`.${styles.head_bar}`).should('be.visible');
    cy.get(`.${styles.mid_bar}`).should('be.visible');
    cy.get(`.${styles.low_bar}`).should('be.visible');
  });

  it('displays the correct initial month', () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.contains(currentMonth).should('exist');
  });

  it('updates the month when arrows are clicked', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    //cy.get(`.${styles.month_select_btn}`).first().click();
    //cy.get(`.${styles.month_select_btn}`).last().click();
    // Additional checks could be implemented to verify the month has actually updated.
  });

  it('allows searching transactions', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.get(`input.${styles.transaction_btns_search}`).type('coffee');
    cy.get(`button.${styles.transaction_btns_download}`).click();
    // Check if the table contains transactions related to "coffee"
    cy.get('table').contains('td', 'coffee', { matchCase: false});
  });

  /*it('sorts transactions when column headers are clicked', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.get('th').contains('Date').click();
    // Checks would be needed here to confirm sort order changes on the displayed transactions.
  });*/

 /* it('navigates to the home page on logo click', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.get(`.${styles.head_bar} img`).click({multiple: true});
    cy.url().should('include', '/');
  });*/
  

});

