import { buildUserData, UserData } from 'spec/cypress/support/generate'

describe('testing register page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  const registerUser = (userData: UserData): void => {
    cy.findByTestId('textfield-register-username').fill(userData.username)
    cy.findByTestId('textfield-register-email').fill(userData.email)
    cy.findByTestId('textfield-register-password').fill(userData.password)
    cy.findByTestId('textfield-register-confirm-password').fill(
      userData.password
    )
    cy.findByTestId('checkbox-register-eula-acceptance').click()
    cy.findByTestId('box-register-submit-button').click()
  }

  it('should go to privacy policy page', () => {
    cy.findByTestId('privacy-policy-link').click()

    cy.location('href').should('eq', `${Cypress.config().baseUrl}/eula`)
  })

  it('should go to login page', () => {
    cy.findByTestId('login-link').click()

    cy.location('href').should('eq', `${Cypress.config().baseUrl}/login`)
  })

  it('should register a new user', () => {
    const userData = buildUserData()

    registerUser(userData)

    cy.findByTestId('button-new-credential').should('exist')
  })

  it('should the password must have at least 6 caracteres', () => {
    const userData = buildUserData()

    cy.findByTestId('textfield-register-username').fill(userData.username)
    cy.findByTestId('textfield-register-email').fill(userData.email)
    cy.findByTestId('textfield-register-password').fill('123')
    cy.findByTestId('textfield-register-confirm-password').fill('123')
    cy.findByTestId('checkbox-register-eula-acceptance').click()
    cy.findByTestId('box-register-submit-button').click()

    cy.findByTestId('message-0').contains(
      /The password must have at least 6 caracteres./
    )
  })

  it('should the password confirm does not match the password.', () => {
    const userData = buildUserData()

    cy.findByTestId('textfield-register-username').fill(userData.username)
    cy.findByTestId('textfield-register-email').fill(userData.email)
    cy.findByTestId('textfield-register-password').fill('123456')
    cy.findByTestId('textfield-register-confirm-password').fill('123')
    cy.findByTestId('checkbox-register-eula-acceptance').click()
    cy.findByTestId('box-register-submit-button').click()

    cy.findByTestId('message-0').contains(
      /The password confirm does not match the password./
    )
  })

  it('should verify offline modal', () => {
    const user = buildUserData()

    cy.offline(true)
    cy.findByTestId('textfield-register-username').fill(user.username)
    cy.findByTestId('textfield-register-email').fill(user.email)
    cy.findByTestId('textfield-register-password').fill(user.password)
    cy.findByTestId('textfield-register-confirm-password').fill(user.password)
    cy.findByTestId('checkbox-register-eula-acceptance').click()
    cy.findByTestId('box-register-submit-button').click()

    cy.findByTestId('modal-message').contains(/Failed to connect to server/)
  })

  it('should verify if username and email already exists', () => {
    cy.createUser().then((userData) => {
      registerUser(userData)

      cy.findByTestId('message-0').contains(/Username already in use./)
      cy.findByTestId('message-1').contains(/E-mail already in use./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('textfield-register-username-helper-text').contains(
        /The username is already in use/
      )
      cy.findByTestId('textfield-register-email-helper-text').contains(
        /The e-mail is already in use/
      )
    })
  })

  it('should leave requireds fields with whitespace', () => {
    cy.createUser().then((userData) => {
      cy.findByTestId('textfield-register-email').fill(userData.email)
      cy.findByTestId('checkbox-register-eula-acceptance').click()
    })

    cy.findByTestId('textfield-register-username').fill(' ')
    cy.findByTestId('textfield-register-password').fill(' ')
    cy.findByTestId('textfield-register-confirm-password').fill(' ')
    cy.findByTestId('box-register-submit-button').click()

    cy.findByTestId('message-0').contains(/The username is invalid./)
    cy.findByTestId('message-1').contains(/The password is invalid./)
    cy.findByTestId('message-2').contains(/The confirm password is invalid./)

    cy.findByTestId('button-message-modal-ok').click()

    cy.findByTestId('textfield-register-username-helper-text').contains(
      /Invalid username/
    )
    cy.findByTestId('textfield-register-password-helper-text').contains(
      /Invalid password./
    )
    cy.findByTestId('textfield-register-confirm-password-helper-text').contains(
      /Invalid confirm password/
    )
  })
})
