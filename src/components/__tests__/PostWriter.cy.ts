/// <reference types="cypress" />
import PostWriter from '../PostWriter.vue'
import { mount } from '../../../cypress/support/component'
import { Post, createNewPost } from '../../posts'
import { useUsers } from '../../stores/users'
import { defineComponent, h } from 'vue'
import { DateTime } from 'luxon'

describe('Navbar.vue', () => {
  it('renders', () => {
    cy.viewport(1000, 600)
    const userStore = useUsers()
    userStore.currentUserId = '1'
    const submit = cy.stub()
    const post = createNewPost(DateTime.now().toISO())

    const ParentComponent = defineComponent({
      components: {
        PostWriter,
      },
      setup() {
        return {
          post,
          submit,
        }
      },
      render() {
        return h(PostWriter, {
          post: this.post,
          onSubmit: this.submit,
        })
      },
    })

    mount(ParentComponent)
    cy.get('[data-cy="editor"]').clear().type(['```', "const foo = () => 'bar'", '```'].join('\n'))
    cy.get('code').contains("const foo = () => 'bar'")

    cy.get('[data-cy="editor"]').clear().type('# Title')
    cy.get('h1').contains('Title')

    cy.get('[data-cy="editor"]').clear().type('Content')
    cy.get('p').contains('Content')

    const expectedPost: Post = {
      id: '1',
      authorId: '1',
      title: 'Today',
      created: post.created,
      markdown: 'Content',
      html: '<p>Content</p>\n',
    }
    cy.get('button')
      .contains('Save Post')
      .click()
      .then(() => {
        expect(submit).to.have.been.calledWith(expectedPost)
      })
  })
})
