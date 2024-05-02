describe('Login Test #1', () => {
  it('Checks router directs to login page', () => {
    cy.visit('http://localhost:3000')

    cy.url().should('include', '/login')
  })
})

describe('Login Test #2', () => {
  it('Checks if no input is rejected with error message on login', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    cy.contains('Invalid Email or Password!')
  })
})

describe('Login Test #3', () => {
  it('Checks if incorrect email input is rejected with error message on login', () => {
    cy.visit('http://localhost:3000/login')

    cy.get(':nth-child(1) > .Login_formControl__CS63v').type('incorrect@email.com')
    cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','incorrect@email.com')


    cy.get(':nth-child(2) > .Login_formControl__CS63v').type('rejectThisPassword')
    cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','rejectThisPassword')

    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    cy.contains('Email Not Found!')

  })
})

describe('Login Test #4', () => {
  it('Checks if correct email input is accepted on login', () => {
    cy.visit('http://localhost:3000/login')

    cy.get(':nth-child(1) > .Login_formControl__CS63v').type('Ahmed.King@freeemailservice.com')
    cy.get(':nth-child(1) > .Login_formControl__CS63v').should('have.value','Ahmed.King@freeemailservice.com')


    cy.get(':nth-child(2) > .Login_formControl__CS63v').type('acceptThisPassword')
    cy.get(':nth-child(2) > .Login_formControl__CS63v').should('have.value','acceptThisPassword')

    cy.get('.Login_loginBtnSubmit__yaBcb').click()

    cy.url().should('include', '/home')
    cy.contains('AhmedK60774')

  })
})