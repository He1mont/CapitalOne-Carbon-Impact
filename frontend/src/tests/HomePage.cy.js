import React from 'react'
import HomePage from '../pages/HomePage'

describe('<HomePage />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HomePage />)
    cy.get('[data-cy=counter]').should('have.text', '0')
  })
})