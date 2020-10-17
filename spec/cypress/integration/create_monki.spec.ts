import {
  UserData,
  buildMonkiData,
  MonkiData
} from 'spec/cypress/support/generate'

describe('testing create monkis page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-monkis').click()
      cy.findByTestId('link-new-monki').click()
    })
  })

  const populateFields = (monkilData: MonkiData): void => {
    cy.findByTestId('textfield-create-monki-name').fill(monkilData.name)
    cy.findByTestId('textfield-create-monki-version').fill(monkilData.version)
    cy.findByTestId('select-create-monki-extension').click()
    cy.findByTestId('select-menuitem-create-monki-0').click()
    cy.get('.ace_text-input').fill(monkilData.contents)
  }

  it('should create a monki', () => {
    const monkiData = buildMonkiData()

    cy.findByTestId('textfield-create-monki-name').fill(monkiData.name)

    cy.findByTestId('textfield-create-monki-version').fill(monkiData.version)

    cy.findByTestId('select-create-monki-extension').click()
    cy.findByTestId('select-menuitem-create-monki-0').click()

    cy.get('.ace_text-input').fill(monkiData.contents)

    cy.findByTestId('button-create-monkis-save').click()

    cy.findByTestId('modal-message').contains(/Monki created successfully./)

    cy.findByTestId('button-message-modal-ok').click()

    cy.findByTestId('typography-monkis-list-name-0').contains(monkiData.name)
  })

  describe('testing leave required fields with whitespace', () => {
    it('should leave field name with whitespace', () => {
      const monkiData = buildMonkiData()

      populateFields(monkiData)

      cy.findByTestId('textfield-create-monki-name').fill(' ')
      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('message-0').contains(/The name is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-create-monki-name-helper-text').contains(
        /Invalid name/
      )
    })

    it('should leave field version with whitespace', () => {
      const monkiData = buildMonkiData()

      populateFields(monkiData)

      cy.findByTestId('textfield-create-monki-version').fill(' ')
      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('message-0').contains(/The version is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-create-monki-version-helper-text').contains(
        /Invalid version/
      )
    })

    it('should leave field extension unselected', () => {
      const monkiData = buildMonkiData()

      cy.findByTestId('textfield-create-monki-name').fill(monkiData.name)
      cy.findByTestId('textfield-create-monki-version').fill(monkiData.version)
      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('message-0').contains(/The extension is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('select-create-monki-extension-helper-text').contains(
        /Invalid extension/
      )
    })

    it('should leave field contents with whitespace without helper text', () => {
      const monkiData = buildMonkiData()

      populateFields(monkiData)

      cy.get('.ace_text-input').fill(' ')
      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('message-0').contains(/Invalid Contents/)
      cy.findByTestId('button-message-modal-ok').click()
    })
  })

  describe('testing create monki with a credential connected', () => {
    it('should create a monki with a credential connected', () => {
      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-credentials').click()

      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-monkis').click()

      cy.findByTestId('link-new-monki').click()

      const monkiData = buildMonkiData()

      populateFields(monkiData)

      cy.findByTestId('create-monki-panel').click()
      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('modal-message').contains(/Monki created successfully./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('button-monki-edit-0').click()

      cy.findByTestId('edit-monki-panel').click()

      cy.findByTestId('listitemtext-user-list-0').should('exist')
    })

    it('should create a monki with a credential connected and verify in edit credential page', () => {
      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-credentials').click()

      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-monkis').click()

      cy.findByTestId('link-new-monki').click()

      const monkiData = buildMonkiData()

      populateFields(monkiData)

      cy.findByTestId('create-monki-panel').click()
      cy.findByTestId('checkbox-admin-0').click()

      cy.findByTestId('button-create-monkis-save').click()
      cy.findByTestId('modal-message').contains(/Monki created successfully./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-credentials').click()

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      cy.findByTestId('panel-connected-monkis').click()

      cy.findByTestId('listitemtext-user-list-0').should('exist')
    })
  })
})
