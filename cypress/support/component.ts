// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount as _mount } from 'cypress/vue'
import { createPinia, setActivePinia, type Pinia } from 'pinia'
import { createNewRouter } from '../../src/router'
import { createWebHashHistory } from 'vue-router'

let pinia: Pinia = createPinia()

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

Cypress.Commands.add('mount', mount)

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

export function mount(comp: any, options?: Parameters<typeof _mount>[1]) {
  return _mount(comp, {
    ...options,
    props: options?.props,
    global: {
      plugins: [pinia, createNewRouter(createWebHashHistory())],
    },
  })
}
