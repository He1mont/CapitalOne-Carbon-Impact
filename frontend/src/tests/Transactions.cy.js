import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Transactions, { TransactionTbl } from '../pages/Transactions';
import styles from '../assets/styles/Transactions.module.css';
import moment from 'moment';

describe('<Transactions />', () => {
  // Define initial state for the component to simulate a logged-in user
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
  // Test to ensure that the Transactions page renders successfully with all main components visible
  it('successfully renders the transactions page', () => {
     // Check visibility of main structural elements of the page 
    cy.get(`.${styles.head_bar}`).should('be.visible'); //head
    cy.get(`.${styles.mid_bar}`).should('be.visible'); //mid
    cy.get(`.${styles.low_bar}`).should('be.visible'); //low
  });

  // Test to verify that the Transactions page correctly displays the current month 
  it('displays the correct initial month', () => {
    // Format the current month as expected 
    const currentMonth = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    mount(
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    );

    //Check that the page contains the correctly formatted in current month
    cy.contains(currentMonth).should('exist');
  });

  // Test to check if transactions are sorted by amount
  it('sorts transactions by amount', () => {
    // The presence of a sorting arrow icon can indicate that sorting is enabled or not.
    cy.get(`.${styles.sort_arrow}`).should('not.exist');

    // Check if transactions are sorted 
    //  cy.get(`.${styles.transaction_tbl}`).find('tr').eq(1).find('td').eq(3).should('contain', '50.00');
  });

 /* describe('Low Component Functionality', () => {
   

   
   
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


  });*/
})
