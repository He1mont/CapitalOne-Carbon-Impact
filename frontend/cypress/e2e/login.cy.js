// spec.cy.js

describe('Login Test #1', () => {
  it('Checks router directs to login page', () => {
    // Access the website
    cy.visit('http://localhost:3000')

    // Check if router redirects to login page
    cy.url().should('include', '/login')
  })
})

describe('Login Test #2', () => {
  it('Checks if no input is rejected with error message on login', () => {
    // Go to login page
    cy.visit('http://localhost:3000/login')

    // Click 'Log in' button
    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    // Check if error message appears
    cy.contains('Invalid Email or Password!')
  })
})

describe('Login Test #3', () => {
  it('Checks if incorrect email input is rejected with error message on login', () => {
    // Go to login page
    cy.visit('http://localhost:3000/login')

    // Enter email not stored in database & check if it has been entered correctly
    cy.get(':nth-child(1) > .Login_formControl__CS63v').type('incorrect@email.com')
    cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','incorrect@email.com')

    // Enter password (can be anything except empty) & check if it has been entered correctly
    cy.get(':nth-child(2) > .Login_formControl__CS63v').type('rejectThisPassword')
    cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','rejectThisPassword')

    // Click 'Log in' button
    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    // Check if error message appears
    cy.contains('Email Not Found!')

  })
})

describe('Login Test #4', () => {
  it('Checks if correct email input is accepted on login', () => {
    // Go to login page
    cy.visit('http://localhost:3000/login')

    // Enter email stored in database & check if it has been entered correctly
    cy.get(':nth-child(1) > .Login_formControl__CS63v').type('Ahmed.King@freeemailservice.com')
    cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','Ahmed.King@freeemailservice.com')

    // Enter password (can be anything except empty) & check if it has been entered correctly
    cy.get(':nth-child(2) > .Login_formControl__CS63v').type('acceptThisPassword')
    cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','acceptThisPassword')

    // Click 'Log in' button
    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    // Check if user is taken to the home page
    cy.url().should('include', '/home')

    //Check if the username on the homepage matches what is stored on the database to ensure the correct user is logged in
    cy.contains('AhmedK60774')

  })
})

describe('Log out Test #1', () => {
  it('Checks if user is able to sign out', () => {

  // Go to login page
  cy.visit('http://localhost:3000/login')

  // Enter email stored in database & check if it has been entered correctly
  cy.get(':nth-child(1) > .Login_formControl__CS63v').type('Ahmed.King@freeemailservice.com')
  cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','Ahmed.King@freeemailservice.com')

  // Enter password (can be anything except empty) & check if it has been entered correctly
  cy.get(':nth-child(2) > .Login_formControl__CS63v').type('acceptThisPassword')
  cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','acceptThisPassword')

  // Click 'Log in' button
  cy.get('.Login_loginBtnSubmit__yaBcb').click()
  
  // Click settings icon
  cy.get('.CommonComponent_settings_btn__M-NTH').click()

  // Click sign out button
  cy.get('[style="top: 180px;"]').click()

  // Check if router redirects to login page
  cy.url().should('include', '/login')
  })
})