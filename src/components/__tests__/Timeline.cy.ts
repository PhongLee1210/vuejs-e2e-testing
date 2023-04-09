/// <reference types="cypress" />
import Timeline from '../Timeline.vue'
import { mount } from '../../../cypress/support/component'
import { defineComponent, h, Suspense } from 'vue'
import { thisMonth, thisWeek, today } from '../../posts'
describe('Timeline.vue', () => {
  it.only('renders ', () => {
    const ParentComponent = defineComponent({
      components: {
        Timeline,
      },
      setup() {},
      render() {
        return h(
          Suspense,
          {},
          {
            default: () => h(Timeline),
            fallback: () => h('div', 'Loading...'),
          },
        )
      },
    })

    cy.intercept('/api/posts', {
      body: JSON.stringify([today, thisWeek, thisMonth]),
    }).as('posts')

    mount(ParentComponent)

    cy.wait('@posts')

    cy.contains('Today').as('today')
    cy.contains('This Week').as('this week')
    cy.contains('This Month').as('this month')

    cy.get('[role="link"]').should('have.length', 1)
    cy.get('[role="title"]').contains('Posts for today')

    cy.get('@this week').click()
    cy.get('[role="link"]').should('have.length', 2)
    cy.get('[role="title"]').contains('Posts for this week')

    cy.get('@this month').click()
    cy.get('[role="link"]').should('have.length', 3)
    cy.get('[role="title"]').contains('Posts for this month')
  })
})
