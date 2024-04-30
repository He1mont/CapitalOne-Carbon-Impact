import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import FAQS from '../pages/FAQS';
import styles from '../assets/styles/FAQ.module.css';

describe('<FAQS />', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <FAQS />
            </MemoryRouter>
        );
    });

    it('successfully renders', () => {
        cy.contains('Frequently asked questions (FAQs)').should('exist');
    });


    it('navigates on logo click', () => {
        cy.get(`.${styles.headImg}`).click();
        cy.url().should('include', '/');
    });

    it('displays all questions', () => {
        cy.get(`.${styles.question}`).should('have.length', 6);
    });

   it('updates content when questions are interacted with', () => {
        // clicking to expand the question
        cy.get(`.${styles.question}`).first().click({ force: true });

        // Checks if content is  visible
        cy.contains('Our platform analyses transaction data').should('be.visible');
    });
    it('verifies that all audio play buttons are functional', () => {
        
        const spy = cy.spy(window.speechSynthesis, 'speak');
        mount(
            <MemoryRouter>
                <FAQS />
            </MemoryRouter>
        );
    
        // Click each play button and check if the audio is triggered
        cy.get(`.${styles.play_button}`).each((button, index, list) => {
           cy.wrap(button).click({ force: true });
            cy.wrap(spy).should('be.called');
        });
    });
   
    it('handles browser history correctly', () => {
        cy.get(`.${styles.headImg}`).click();
        cy.url().should('include', '/');
        cy.go('back');
        cy.url().should('include', '/faqs');
    });
    

   
    
  

    it('checks that the footer is correctly displayed', () => {
        cy.contains('© 2023-2024 Team7. All rights reserved.').should('exist');
    });
});