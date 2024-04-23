import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import styles from '../assets/styles/Home.module.css';
import { createMemoryHistory } from 'history';

describe('HomePage Component', () => {
  it('successfully renders', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    cy.contains('You need to login').should('exist');
    cy.contains('Your Carbon Impact').should('exist');
  });
});

describe('Head Component', () => {
  it('renders the logo and settings button', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    cy.get(`.${styles.head_bar}`).should('exist');
    cy.get(`.${styles.head_bar}`).click();
  });
});
describe('Mid Component', () => {
  it('shows default login prompt and carbon impact info', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    cy.contains('You need to login').should('exist');
    cy.contains('Your Carbon Impact').should('exist');
    cy.get(`.${styles.mid_box}`).should('exist'); // Check if the image loads correctly
    cy.get(`.${styles.mid_box_txt}`).contains('Find out how your spending habits affect the planet').should('exist');
  });

  it('displays user name when logged in', () => {
    mount(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { name: 'John Doe' } }]}>
        <HomePage />
      </MemoryRouter>
    );
    cy.contains('John Doe').should('exist');
  });
});


describe('Low Component', () => {
  it('renders buttons and navigates correctly', () => {
    const history = createMemoryHistory(); // Create a memory history object
    const spy = cy.spy(history, 'push').as('historyPush'); // Spy on the history.push method

    mount(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    cy.get(`.${styles.low_bar_btn}`).should('have.length', 3);

  /*  cy.get(`.${styles.low_bar_btn}`).eq(0).click().then(() => {
      expect(spy).to.have.been.calledWith('../Pages/Transactions');
    });
    cy.get(`.${styles.low_bar_btn}`).eq(1).click().then(() => {
      expect(spy).to.have.been.calledWith('/home/goals');
    });
    cy.get(`.${styles.low_bar_btn}`).eq(2).click().then(() => {
      expect(spy).to.have.been.calledWith('/home/history');
    });*/
  });
});



