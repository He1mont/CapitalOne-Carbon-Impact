// friend.cy.js
describe('Friend page tests Tests', () => {
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

    // Click settings icon
    cy.get('button:has(img[alt="Settings"])').click()

    // Wait for the login process to complete, for example:
    cy.wait(2000); // Adjust the wait time as per your application

    // Click 'friends' button
    cy.get('[style="top: 80px;"]').click()

    cy.wait(2000);
  });

  it('Checks if router redirects to friends page', () => {
    cy.url().should('include', '/friends')
  });
});