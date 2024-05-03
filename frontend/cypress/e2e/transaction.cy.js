// transaction.cy.js
describe('Transaction Tests', () => {
  beforeEach(() => {
    // Go to login page
    cy.visit('http://localhost:3000/login')

    // Enter email stored in database & check if it has been entered correctly
    cy.contains('div', 'Email').next('input').type('Ahmed.King@freeemailservice.com')
    cy.contains('div', 'Email').next('input').should('have.value', 'Ahmed.King@freeemailservice.com')

    // Enter password (can be anything except empty) & check if it has been entered correctly
    cy.contains('div', 'Password').next('input').type('acceptThisPassword')
    cy.contains('div', 'Password').next('input').should('have.value', 'acceptThisPassword')

    // Click 'Log in' button
    cy.contains('button', 'Log in').click();

    cy.wait(2000); // Adjust the wait time as per your application

    cy.get('button:has(img[alt="Transactions"])').click();

    cy.wait(2000);
  });

  it('Checks if router redirects to transaction page', () => {
    cy.url().should('include', '/transactions')
  });
});