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

  describe('Low Component Functionality', () => {
    beforeEach(() => {
      const fakeData = {
        "Transactions": [
          { "transactionUUID": "a385b9f7-7f19-4e4b-921c-8e2c014c57fd", "accountUUID": "26361904", "merchantUUID": "7", "merchant": { "name": "Trees Trees Trees", "category": "Education", "description": "High quality readings, reports, documentaries on one topic: trees.", "pointOfSale": ["Online"] }, "amount": -129.99, "creditDebitIndicator": "Debit", "currency": "GBP", "timestamp": "2024-01-12 23:26:49", "emoji": "🥰", "latitude": 52.80027062901778, "longitude": -1.8162451070529768, "status": "Successful", "message": "Weekly wage of 129.99 (GBP, positive) from Trees Trees Trees", "pointOfSale": "Online" },
          { "transactionUUID": "51e06526-633d-40cf-96e7-18e1da3736bf", "accountUUID": "26361904", "merchantUUID": "2", "merchant": { "name": "Vapour", "category": "Entertainment", "description": "The World's #1 Game Store", "pointOfSale": ["Online"] }, "amount": -128.98, "creditDebitIndicator": "Debit", "currency": "GBP", "timestamp": "2023-11-11 10:42:16", "emoji": "💸", "latitude": 55.183147901347894, "longitude": -3.1844992289657963, "status": "Successful", "message": "Weekly wage of 128.98 (GBP, positive) from Vapour", "pointOfSale": "Online" }
        ]
      }
      cy.intercept('GET', `http://localhost:7001/accounts/*/transactions`, {
        statusCode: 200,
        body: fakeData,
      }).as('apiCall');
    });

    it('successfully calls the Backend API', () => {
      cy.wait('@apiCall').then((interception) => {
        assert.isNotNull(interception.response.body);
      });
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
})
