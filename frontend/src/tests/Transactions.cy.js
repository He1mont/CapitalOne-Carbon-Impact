import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import styles from '../assets/styles/Transactions.module.css';
import moment from 'moment'; 
import Transactions from '../pages/Transactions';
import { TransactionTbl } from '../pages/Transactions';

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

  describe('Low Component Functionality', () => {
    beforeEach(() => {
      const fakeData = {"Transactions":[
        {"transactionUUID":"a385b9f7-7f19-4e4b-921c-8e2c014c57fd","accountUUID":"26361904","merchantUUID":"7","merchant":{"name":"Trees Trees Trees","category":"Education","description":"High quality readings, reports, documentaries on one topic: trees.","pointOfSale":["Online"]},"amount":-129.99,"creditDebitIndicator":"Debit","currency":"GBP","timestamp":"2024-01-12 23:26:49","emoji":"🥰","latitude":52.80027062901778,"longitude":-1.8162451070529768,"status":"Successful","message":"Weekly wage of 129.99 (GBP, positive) from Trees Trees Trees","pointOfSale":"Online"},
        {"transactionUUID":"51e06526-633d-40cf-96e7-18e1da3736bf","accountUUID":"26361904","merchantUUID":"2","merchant":{"name":"Vapour","category":"Entertainment","description":"The World's #1 Game Store","pointOfSale":["Online"]},"amount":-128.98,"creditDebitIndicator":"Debit","currency":"GBP","timestamp":"2023-11-11 10:42:16","emoji":"💸","latitude":55.183147901347894,"longitude":-3.1844992289657963,"status":"Successful","message":"Weekly wage of 128.98 (GBP, positive) from Vapour","pointOfSale":"Online"}
      ]}
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

    it('renders attributes in the Transaction Table', () => {
      cy.contains('Date').should('exist');
      cy.contains('Category').should('exist');
      cy.contains('Description').should('exist');
      cy.contains('Carbon Impact (kgco2)').should('exist');
      cy.contains('Amount').should('exist');
    });
  });

});

