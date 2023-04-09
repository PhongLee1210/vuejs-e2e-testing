/// <reference types="cypress" />
import { computed, defineComponent, h, ref } from 'vue'
import FormInput from '../FormInput.vue'
import { mount } from '../../../cypress/support/component'
import type { Status } from '../../validation'

describe('FormInput.vue', () => {
  it.only('responds to input', () => {
    const ParentComponent = defineComponent({
      components: {
        FormInput,
      },
      setup() {
        const username = ref('phonglee')
        const status = computed<Status>(() => {
          const valid = username.value.length > 5
          const message = valid ? undefined : 'It is too short'
          return { valid, message }
        })
        return {
          username,
          status,
        }
      },
      render() {
        return h(FormInput, {
          name: 'username',
          type: 'text',
          status: this.status,
          modelValue: this.username,
          'onUpdate:modelValue': (newVal: string) => (this.username = newVal),
        })
      },
    })

    mount(ParentComponent)
    cy.get('[role="label"]').contains('username').click()
    cy.get('[role="input"]').should('be.focused')

    cy.get('[role="alert"]').should('not.exist')

    cy.get('[role="input"]').clear()
    cy.get('[role="alert"]').should('exist').should('contain.text', 'It is too short')
  })
})
