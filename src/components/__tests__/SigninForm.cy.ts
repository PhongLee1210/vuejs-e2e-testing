/// <reference types="cypress" />
import SigninForm from '../SigninForm.vue'
import { mount } from '../../../cypress/support/component'

describe('SigninForm.vue', () => {
  it.only('renders ', () => {
    mount(SigninForm)
    cy.get('#Username').as('username').clear()
    cy.get('#Password').as('password').clear()
    cy.get('button').contains('Submit').as('submit')

    cy.get('[role="alert"]').should('have.length', 2)

    cy.get('@username').type('u')
    cy.get('@password').type('p')

    cy.get('[role="alert"]').contains('This field must be between 5 and 10')
    cy.get('[role="alert"]').contains('This field must be between 10 and 40')

    cy.get('@submit').should('be.disabled')

    cy.get('@username').type('username')
    cy.get('@password').type('passw123213ord')

    cy.get('[role="alert"]').should('have.length', 0)
    cy.get('@submit').should('not.be.disabled')

    cy.intercept('/api/login', {
      statusCode: 401,
    }).as('login')
    cy.get('@submit').click()
    cy.wait('@login')

    cy.get('[role="alert"]').contains('Username or password was incorrect.')
  })
})
