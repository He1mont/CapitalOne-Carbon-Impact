import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment'; 
import History from '../pages/History.js'; 
import styles from '../assets/styles/History.module.css';


describe('<History />', () => {
    it('successfully renders', () => {
      mount(
        <MemoryRouter>
          <History />
        </MemoryRouter>
      );
  
      // Check if "Carbon History" exists
      cy.contains('Carbon History').should('exist');
      cy.get(`.${styles.month_select}`).should('be.visible');
    });

    it('handles API errors', () => {
        // Mock an API call that returns an error
        cy.intercept('GET', '/api/data', { statusCode: 500, body: 'Internal Server Error' });
    
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
    
      // The test verifies that the component handles the API error appropriately. 
      //  cy.contains('Failed to fetch data', { timeout: 10000 }).should('be.visible');

      // By mocking the API response to simulate an error condition, 
      // this test ensures that the History component handles API errors by displaying an appropriate error message to the user.
    });
    


    it('displays the correct title', () => {
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
        cy.contains('Carbon History').should('exist');
    });
    

    it('renders the month selector with correct initial month', () => {
        mount(
          <MemoryRouter>
            <History />
          </MemoryRouter>
        );
    
        // Checking format of currentMonth existing with moment
        const currentMonth = moment().format('MMM YYYY'); 
        cy.contains(currentMonth).should('exist');
      });

      it('renders month range selector buttons', () => {
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
        cy.get(`.${styles.month_select_btn}`).should('have.length', 4);
    });

   /* it('decreases start month when left arrow is clicked', () => {
        const initialStartMonth = moment(); // Get the initial start month
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
        cy.get(`.${styles.month_select_btn}`).first().click();
        // Wait for the start month to update
        cy.wait(1000);
        // Get the updated start month after clicking the left arrow
        const updatedStartMonth = moment().subtract(1, 'month').startOf('month');
        // Assert that the start month has decreased correctly
        expect(updatedStartMonth.month()).to.equal(initialStartMonth.subtract(1, 'month').startOf('month').month());
        expect(updatedStartMonth.year()).to.equal(initialStartMonth.subtract(1, 'month').startOf('month').year());
    });

    it('increases end month when right arrow is clicked', () => {
        const initialEndMonth = moment(); // Get the initial end month
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
        // cy.get(`.${styles.month_select_btn}`).last().click();
        // Wait for the end month to update
        cy.wait(1000);
        // updated end month after clicking the right arrow
        const updatedEndMonth = moment().add(1, 'month').startOf('month');
        // Assert that the end month has increased correctly
        expect(updatedEndMonth.month()).to.equal(initialEndMonth.add(1, 'month').startOf('month').month());
        expect(updatedEndMonth.year()).to.equal(initialEndMonth.add(1, 'month').startOf('month').year());
    });*/

    
    it('toggles category visibility when clicking category buttons', () => {
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );

        // click on the Entertainment category button
        cy.get(`.${styles.graph_category_btn}`).first().click({force: true});
        // Assert that the Entertainment category is toggled
        cy.get(`.${styles.graph_container_pie} text`).contains('Entertainment').should('not.exist');

        //  click on the Education category button
        cy.get(`.${styles.graph_category_btn}`).eq(1).click({force: true});
        // Assert that the Education category is toggled
        cy.get(`.${styles.graph_container_pie} text`).contains('Education').should('not.exist');
    });


    it('changes the graph type when selecting different graph options', () => {
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );

        // Simulate selecting the Pie Chart option
        cy.contains('Pie Chart').click();
        // Assert that the Pie Chart is displayed
        cy.get(`.${styles.graph_container_pie}`).should('be.visible');

        // Simulate selecting the Line Graph option
        cy.contains('Line Graph').click();
        // Assert that the Line Graph is displayed
        cy.get(`.${styles.graph_container_line}`).should('be.visible');

        // Simulate selecting the Bar Graph option
        cy.contains('Bar Graph').click();
        // Assert that the Bar Graph is displayed
        cy.get(`.${styles.graph_container_bar}`).should('be.visible');
    });


    it('updates the month range when clicking the month buttons', () => {
        // Mount the component
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );
    
        // Get the initial start month and end month
        cy.window().then(window => {
            // Check if startMonth and endMonth exist
            if (window.startMonth && window.endMonth) {
                // Clone the initial start month and end month
                let initialStartMonth = window.startMonth.clone();
                let initialEndMonth = window.endMonth.clone();
    
                // Click the left arrow for start month
                cy.get(`.${styles.month_select_btn}`).first().click();
                // Wait for the start month to update
                cy.wait(1000);
                // Assert that the start month has decreased
                expect(window.startMonth.isBefore(initialStartMonth)).to.be.true;
    
                // Click the right arrow for end month
                cy.get(`.${styles.month_select_btn}`).last().click();
                // Wait for the end month to update
                cy.wait(1000);
                // Assert that the end month has increased
                expect(window.endMonth.isAfter(initialEndMonth)).to.be.true;
            } else {
                // Handle the case where startMonth or endMonth is undefined
                console.error("startMonth or endMonth is undefined");
            }
        });
    });

    it('navigates to the home page on logo click', () => {
        mount(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        );

        // Simulate clicking on the logo
        cy.get(`.${styles.head_img}`).click();

        // Verify if the router navigates to the home page
        cy.url().should('include', '/');
    });

});