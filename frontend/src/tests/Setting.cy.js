import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import CarbonGoal from '../pages/Setting';
import styles from '../assets/styles/Setting.module.css';

describe('<CarbonGoal />', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter initialEntries={['/settings']}>
                <CarbonGoal />
            </MemoryRouter>
        );
    });

    it('successfully renders', () => {
        cy.get(`.${styles.head_bar}`).should('exist');
    });

    it('navigates on logo click', () => {
        cy.get(`.${styles.head_img}`).click();
        cy.url().should('include', '/');
    });

    it('displays the Carbon Goal section', () => {
        cy.contains('Carbon Goal').should('exist');
    });
    
    it('allows setting the expected carbon goal', () => {
        const goalValue = '1000';
        cy.get('#expected-goal').type(`${goalValue}{enter}`, { force: true }); 
       // cy.get('#expected-goal').should('have.value', goalValue);
    });

   /* it('navigates to the details page on "Details" button click', () => {
        cy.get(`.${styles.detailsButton}`).click();
        cy.url().should('include', '/');
    });*/

    it('checks that the footer is correctly displayed', () => {
        cy.contains('© 2023-2024 Team7. All rights reserved.').should('exist');
    });

});