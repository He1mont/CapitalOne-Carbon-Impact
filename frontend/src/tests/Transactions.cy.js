import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Transactions, { TransactionTbl } from '../pages/Transactions';
import styles from '../assets/styles/Transactions.module.css';
import moment from 'moment';

describe('<Transactions />', () => {
  const initialState = {
    name: 'Demo User',
    id: 'user-id-456',
  };

  beforeEach(() => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/transactions', state: initialState }]}>
        <Transactions />
      </MemoryRouter>
    );
  });

  it('successfully renders the transactions page', () => {
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

  it('sorts transactions by amount', () => {
    // Should display a sorting icon indicating the direction of sort
    cy.get(`.${styles.sort_arrow}`).should('not.exist');

    // Check if transactions are sorted 
  //  cy.get(`.${styles.transaction_tbl}`).find('tr').eq(1).find('td').eq(3).should('contain', '50.00');
  });


 /* it('updates the month when arrows are clicked', () => {
    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    cy.get(`.${styles.month_select_btn}`).first().click();
    cy.get(`.${styles.month_select_btn}`).last().click();
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
  });*/


});

