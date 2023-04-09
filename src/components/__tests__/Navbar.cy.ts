/// <reference types="cypress" />
import Navbar from '../Navbar.vue'
import { mount } from '../../../cypress/support/component'
import { useUsers } from '../../stores/users'

describe('Navbar.vue', () => {
  it.only('renders call to actions buttons when not authenticated', () => {
    mount(Navbar)
    cy.get('button').contains('Sign Up')
    cy.get('button').contains('Sign In')
  })
  it('renders buttons when authenticated', () => {
    const userStore = useUsers()
    userStore.currentUserId = '1'

    mount(Navbar)

    cy.get('a').contains('New Post')
    cy.get('button').contains('Log Out')
  })
})
