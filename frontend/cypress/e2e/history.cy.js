// history.cy.js
describe('Carbon Impact History Tests', () => {
  beforeEach(() => {
    // Go to login page
    cy.visit('http://localhost:3000/login')

    // Enter email stored in database & check if it has been entered correctly
    cy.get(':nth-child(1) > .Login_formControl__r-i1w').type('Ahmed.King@freeemailservice.com')
    cy.get(':nth-child(1) > .Login_formControl__r-i1w').should('have.value', 'Ahmed.King@freeemailservice.com')

    // Enter password (can be anything except empty) & check if it has been entered correctly
    cy.get(':nth-child(2) > .Login_formControl__r-i1w').type('acceptThisPassword')
    cy.get(':nth-child(2) > .Login_formControl__r-i1w').should('have.value', 'acceptThisPassword')

    // Click 'Log in' button
    cy.get('.Login_loginBtnSubmit__llfLu').click()

    // Wait for the login process to complete, for example:
    cy.wait(2000); // Adjust the wait time as per your application

    cy.get(':nth-child(3) > .Home_low_bar_btn__WZwiA').click()

    cy.wait(2000);
  });

  it('Checks if router redirects to history page', () => {
    cy.url().should('include', '/history')
  });
});