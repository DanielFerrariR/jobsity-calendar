import { buildMonkiData, UserData } from 'spec/cypress/support/generate'

describe('testing edit credential page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-monkis').click()

      cy.createMonki().as('currentMonki')

      cy.findByTestId('button-monki-edit-0').click()
    })
  })

  it('should edit a monki', () => {
    const monkiData = buildMonkiData()

    cy.findByTestId('textfield-edit-monki-name').fill(monkiData.name)
    cy.findByTestId('textfield-edit-monki-version').fill(monkiData.version)

    cy.findByTestId('select-edit-monki-extension').click()
    cy.findByTestId('select-menuitem-edit-monki-0').click()

    cy.get('[id=edit-monki-ace-editor]').type('{selectall}{del}')

    cy.get('.ace_text-input').fill(monkiData.contents)

    cy.findByTestId('button-edit-monki-save').click()

    cy.findByTestId('modal-message').contains(/Monki changed successfully./)

    cy.findByTestId('button-message-modal-ok').click()

    cy.findByTestId('button-monki-edit-0').click()

    cy.findByTestId('textfield-edit-monki-name').should(
      'have.value',
      monkiData.name
    )

    cy.findByTestId('textfield-edit-monki-version').should(
      'have.value',
      monkiData.version
    )

    cy.findByTestId('select-edit-monki-extension').should(
      'have.text',
      monkiData.extension
    )

    cy.get('[id=edit-monki-ace-editor]').contains(monkiData.contents)
  })

  describe('testing leave required fields with whitespace', () => {
    it('should leave field name with whitespace', () => {
      cy.findByTestId('textfield-edit-monki-name').fill(' ')
      cy.findByTestId('button-edit-monki-save').click()
      cy.findByTestId('message-0').contains(/The name is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-edit-monki-name-helper-text').contains(
        /Invalid name/
      )
    })

    it('should leave field version with whitespace', () => {
      cy.findByTestId('textfield-edit-monki-version').fill(' ')
      cy.findByTestId('button-edit-monki-save').click()
      cy.findByTestId('message-0').contains(/The version is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-edit-monki-version-helper-text').contains(
        /Invalid version/
      )
    })

    it('should leave field contents with whitespace', () => {
      cy.get('[id=edit-monki-ace-editor]').type('{selectall}{del}')
      cy.get('.ace_text-input').fill(' ')
      cy.findByTestId('button-edit-monki-save').click()
      cy.findByTestId('message-0').contains(/Invalid Contents/)
      cy.findByTestId('button-message-modal-ok').click()
    })
  })

  describe('testing delete a monki', () => {
    it('should delete a monki', () => {
      cy.findByTestId('button-edit-monki-delete').click()
      cy.findByTestId('button-monki-delete-modal-yes').click()

      cy.findByTestId('modal-message').contains(/Monki successfully deleted./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('typography-monkis-list-name-0').should('not.exist')
    })
  })

  describe('testing edit monki with a credential connected', () => {
    it('should edit monki with a credential connected', () => {
      cy.visit('/credentials')

      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-monkis').click()

      cy.findByTestId('link-new-monki').click()

      const monkiData = buildMonkiData()

      cy.findByTestId('textfield-create-monki-name').fill(monkiData.name)
      cy.findByTestId('textfield-create-monki-version').fill(monkiData.version)

      cy.findByTestId('select-create-monki-extension').click()
      cy.findByTestId('select-menuitem-create-monki-0').click()

      cy.get('.ace_text-input').fill(monkiData.contents)

      cy.findByTestId('create-monki-panel').click()
      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('button-monki-edit-1').click()

      cy.findByTestId('edit-monki-panel').click()

      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-edit-monki-save').click()
      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('button-monki-edit-1').click()

      cy.findByTestId('edit-monki-panel').click()

      cy.findByTestId('checkbox-admin-0').should('not.be.checked')
    })

    it('should edit monki with a credential connected and verify in edit credential page', () => {
      cy.visit('/credentials')

      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-monkis').click()

      cy.findByTestId('link-new-monki').click()

      const monkiData = buildMonkiData()

      cy.findByTestId('textfield-create-monki-name').fill(monkiData.name)
      cy.findByTestId('textfield-create-monki-version').fill(monkiData.version)
      cy.findByTestId('select-create-monki-extension').click()
      cy.findByTestId('select-menuitem-create-monki-0').click()
      cy.get('[id=ace-editor]').type('{selectall}{del}')
      cy.get('.ace_text-input').fill(monkiData.contents)
      cy.findByTestId('create-monki-panel').click()
      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('button-monki-edit-1').click()

      cy.findByTestId('edit-monki-panel').click()

      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-edit-monki-save').click()
      cy.findByTestId('button-message-modal-ok').click()

      cy.visit('/credentials')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      cy.findByTestId('panel-connected-monkis').click()

      cy.findByTestId('listitemtext-user-list-0').should('not.exist')
    })
  })
})
