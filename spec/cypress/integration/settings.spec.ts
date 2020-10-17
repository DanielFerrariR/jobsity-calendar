import { buildUserData, UserData } from 'spec/cypress/support/generate'

describe('testing settings page', () => {
  describe('testing settings without session expiration', () => {
    beforeEach(() => {
      cy.createUser().as('currentUser')

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.visit('/login')

        cy.login(currentUser.username, currentUser.password)

        cy.findByTestId('button-news-modal-close').click()

        cy.findByTestId('button-new-credential')

        cy.findByTestId('header-menu').click()
        cy.findByTestId('menuitem-settings').click()
      })
    })

    it('should update the user first name, e-mail and expiration time and keep updated after a refresh', () => {
      const userData = buildUserData()

      cy.findByTestId('textfield-account-settings-first-name').fill(
        userData.username
      )
      cy.findByTestId('textfield-account-settings-email').fill(userData.email)
      cy.findByTestId(
        'textfield-security-settings-session-expiration-time'
      ).click()
      cy.findByTestId('menuitem-security-settings-option-5').click()
      cy.findByTestId('button-settings-submit').click()

      cy.findByTestId('modal-message').contains(
        /The account was successfully updated./
      )

      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('button-settings-back').click()
      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-settings').click()

      cy.findByTestId('textfield-account-settings-first-name').should(
        'have.value',
        userData.username
      )
      cy.findByTestId('textfield-account-settings-email').should(
        'have.value',
        userData.email
      )
      cy.findByTestId(
        'textfield-security-settings-session-expiration-time'
      ).contains(/10 minutes/)

      cy.visit('/credentials')

      cy.findByTestId('button-new-credential')

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-settings').click()

      cy.findByTestId('textfield-account-settings-first-name').should(
        'have.value',
        userData.username
      )
      cy.findByTestId('textfield-account-settings-email').should(
        'have.value',
        userData.email
      )
      cy.findByTestId(
        'textfield-security-settings-session-expiration-time'
      ).contains(/10 minutes/)
    })

    it('should leave required fields with whitespace', () => {
      cy.findByTestId('textfield-account-settings-first-name').fill(' ')
      cy.findByTestId('textfield-account-settings-last-name').fill(' ')
      cy.findByTestId('button-settings-submit').click()

      cy.findByTestId('message-0').contains(/The first name is invalid./)
      cy.findByTestId('message-1').contains(/The last name is invalid./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId(
        'textfield-account-settings-first-name-helper-text'
      ).contains(/Invalid first name/)
      cy.findByTestId(
        'textfield-account-settings-last-name-helper-text'
      ).contains(/Invalid last name/)
    })

    it('should change the user password', () => {
      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((userData) => {
          cy.findByTestId('button-password-settings-change').click()
          cy.findByTestId(
            'textfield-change-password-modal-current-password'
          ).fill(currentUser.password)
          cy.findByTestId('textfield-change-password-modal-password').fill(
            userData.password
          )
          cy.findByTestId(
            'textfield-change-password-modal-confirm-password'
          ).fill(userData.password)
          cy.findByTestId('button-change-password-modal-submit').click()

          cy.findByTestId('modal-message').contains(
            /Password updated successfully./
          )

          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(currentUser.username, userData.password)

          cy.findByTestId('button-new-credential').should('exist')
        })
      })
    })

    it('should all fields be disabled when offline', () => {
      cy.offline(true)

      cy.findByTestId('textfield-account-settings-email').should('be.disabled')
      cy.findByTestId('textfield-account-settings-first-name').should(
        'be.disabled'
      )
      cy.findByTestId('textfield-account-settings-last-name').should(
        'be.disabled'
      )
      cy.findByTestId(
        'textfield-security-settings-session-expiration-time'
      ).should('have.attr', 'aria-disabled', 'true')
    })

    it('should show the modal offline message after click on change password butotn', () => {
      cy.offline(true)

      cy.findByTestId('button-password-settings-change').click()

      cy.findByTestId('modal-alert').contains(
        /You must be logged in to change the password./
      )
    })

    it('should show the modal offline message after click on two-factor authentication button', () => {
      cy.offline(true)

      cy.findByTestId(
        'button-password-settings-two-factor-authentication'
      ).click()

      cy.findByTestId('modal-alert').contains(
        /You must be signed in to perform 2-step authentication./
      )
    })

    it('should show the modal offline message after click on resend new token button', () => {
      cy.offline(true)

      cy.findByTestId('button-password-settings-resend-new-token').click()

      cy.findByTestId('modal-alert').contains(
        /You must be logged in to resend the token./
      )
    })
  })

  describe('testing session expiration', () => {
    it('should login back the user with the login button using the correct password', () => {
      cy.createUser().as('currentUser')

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.visit('/login')

        cy.login(currentUser.username, currentUser.password)

        cy.findByTestId('button-news-modal-close').click()

        cy.findByTestId('button-new-credential')

        cy.findByTestId('header-menu').click()
        cy.findByTestId('menuitem-settings').click()

        cy.findByTestId('textfield-account-settings-first-name').fill(
          currentUser.username
        )
        cy.findByTestId(
          'textfield-security-settings-session-expiration-time'
        ).click()
        cy.findByTestId('menuitem-security-settings-option-1').click()

        cy.findByTestId('button-settings-submit').click()

        cy.findByTestId('modal-message').contains(
          /The account was successfully updated./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.findByTestId('textfield-logout-listeners-password').fill(
          currentUser.password
        )

        cy.findByTestId('button-logout-listeners-login').click()

        cy.findByTestId('paper-credentials-welcome')
      })
    })

    it('should show a helper text with the current incorrect attempt and logout the user in the 3rd attempt', () => {
      cy.createUser().as('currentUser')

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.visit('/login')

        cy.login(currentUser.username, currentUser.password)

        cy.findByTestId('button-news-modal-close').click()

        cy.findByTestId('button-new-credential')

        cy.findByTestId('header-menu').click()
        cy.findByTestId('menuitem-settings').click()

        cy.findByTestId('textfield-account-settings-first-name').fill(
          currentUser.username
        )
        cy.findByTestId(
          'textfield-security-settings-session-expiration-time'
        ).click()
        cy.findByTestId('menuitem-security-settings-option-1').click()

        cy.findByTestId('button-settings-submit').click()

        cy.findByTestId('modal-message').contains(
          /The account was successfully updated./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.findByTestId('textfield-logout-listeners-password').fill(
          `${currentUser.password}$`
        )

        cy.findByTestId('button-logout-listeners-login').click()

        cy.findByTestId(
          'textfield-logout-listeners-password-helper-text'
        ).contains(/You have 2 more attempts/)

        cy.findByTestId('button-logout-listeners-login').click()

        cy.findByTestId(
          'textfield-logout-listeners-password-helper-text'
        ).contains(/You have 1 more attempts/)

        cy.findByTestId('button-logout-listeners-login').click()

        cy.findByTestId('modal-message').contains(
          /You was logged out because you typed your password incorrectly three times./
        )
      })
    })

    it('should logout the user with the logout button', () => {
      cy.createUser().as('currentUser')

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.visit('/login')

        cy.login(currentUser.username, currentUser.password)

        cy.findByTestId('button-news-modal-close').click()

        cy.findByTestId('button-new-credential')

        cy.findByTestId('header-menu').click()
        cy.findByTestId('menuitem-settings').click()

        cy.findByTestId('textfield-account-settings-first-name').fill(
          currentUser.username
        )
        cy.findByTestId(
          'textfield-security-settings-session-expiration-time'
        ).click()
        cy.findByTestId('menuitem-security-settings-option-1').click()

        cy.findByTestId('button-settings-submit').click()

        cy.findByTestId('modal-message').contains(
          /The account was successfully updated./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.findByTestId('button-logout-listeners-close').click()

        cy.findByTestId('typography-logout-listeners-title').should('not.exist')
      })
    })
  })
})
