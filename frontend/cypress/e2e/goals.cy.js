describe('Carbon Goal Tests', () => {
    beforeEach(() => {
        // Execute login process here
        cy.visit('http://localhost:3000')
      
        cy.get(':nth-child(1) > .Login_formControl__CS63v').type('Ahmed.King@freeemailservice.com')
        cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','Ahmed.King@freeemailservice.com')

        cy.get(':nth-child(2) > .Login_formControl__CS63v').type('acceptThisPassword')
        cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','acceptThisPassword')

        cy.get('.Login_loginBtnSubmit__yaBcb').click()

        // Wait for the login process to complete, for example:
        cy.wait(2000); // Adjust the wait time as per your application

        cy.get(':nth-child(2) > .Home_low_bar_btn__fcZ4w').click()

        cy.wait(2000);
    });

    it('Checks if router redirects to carbon goals page', () => {
        cy.url().should('include', '/goals')
      });
});