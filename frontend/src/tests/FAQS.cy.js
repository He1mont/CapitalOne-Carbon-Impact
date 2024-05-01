import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import FAQS from '../pages/FAQS';
import styles from '../assets/styles/FAQ.module.css';

// FAQS Tests
describe('<FAQS />', () => {
    // Before each test, mount the FAQS component within a MemoryRouter to handle any routing.
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <FAQS />
            </MemoryRouter>
        );
    });
    // Test to ensure the FAQS page renders successfully
    it('successfully renders', () => {
        // Check if the main heading of the page is present
        cy.contains('Frequently asked questions (FAQs)').should('exist');
    });

     // Test to verify all predefined questions are displayed on the page
    it('displays all questions', () => {
        // Assert that the exact number of question elements expected are rendered
        cy.get(`.${styles.question}`).should('have.length', 6);
    });

    // Test to check if content updates when questions are clicked
   it('updates content when questions are interacted with', () => {
        // clicking to expand the question
        cy.get(`.${styles.question}`).first().click({ force: true });

        // Checks if content is  visible
        cy.contains('Our platform analyses transaction data').should('be.visible');
    });

    // Test to ensure that audio play buttons are functional
    it('verifies that all audio play buttons are functional', () => {
          // Spy on the speech synthesis function to detect when it is called
        const spy = cy.spy(window.speechSynthesis, 'speak');
        mount(
            <MemoryRouter>
                <FAQS />
            </MemoryRouter>
        );
    
        // Click each play button and check if the audio is triggered
        cy.get(`.${styles.play_button}`).each((button, index, list) => {
        // Verify that the URL is as expected when FAQS page is loaded
           cy.wrap(button).click({ force: true });
            cy.wrap(spy).should('be.called');
        });
    });

     // Test to check if the initial page URL is correct
    it('handles browser history correctly', () => {
        cy.url().should('include', '/');
    });
    
    // Test to check if the footer is displayed with the correct text
    it('checks that the footer is correctly displayed', () => {
        // Check if the footer contains the correct copyright notice
        cy.contains('© 2023-2024 Team7. All rights reserved.').should('exist');
    });
});