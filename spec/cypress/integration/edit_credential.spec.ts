import { headerBuilder, ensure } from 'src/utils'
import {
  CredentialData,
  buildCredentialData,
  UserData
} from 'spec/cypress/support/generate'

describe('testing edit credential page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()

      cy.createCredential().as('currentCredential')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
    })
  })

  const deleteCredential = (): void => {
    cy.findByTestId('button-edit-credential-delete-credential').click()
    cy.findByTestId('button-credential-delete-modal-yes').click()
  }

  it('should edit a credential and it should persist after a refresh', () => {
    const credentialData = buildCredentialData()

    cy.findByTestId('textfield-edit-credential-name').fill(credentialData.name)
    cy.findByTestId('textfield-edit-credential-description').fill(
      credentialData.description
    )
    cy.findByTestId('textfield-edit-credential-login').fill(
      credentialData.login
    )
    cy.findByTestId('textfield-edit-credential-password').fill(
      credentialData.password
    )
    cy.findByTestId('button-edit-credential-save').click()

    cy.findByTestId('modal-message').contains(
      /Credential changed successfully./
    )

    cy.findByTestId('button-message-modal-ok').click()
    cy.findByTestId('primary-panel-credentials-button-0').click()
    cy.findByTestId('button-credentials-list-edit-0').click()

    cy.findByTestId('textfield-edit-credential-name').should(
      'have.value',
      credentialData.name
    )
    cy.findByTestId('textfield-edit-credential-description').should(
      'have.value',
      credentialData.description
    )
    cy.findByTestId('textfield-edit-credential-login').should(
      'have.value',
      credentialData.login
    )
    cy.findByTestId('textfield-edit-credential-password').should(
      'have.value',
      credentialData.password
    )

    cy.visit('/credentials')

    cy.findByTestId('primary-panel-credentials-button-0').click()
    cy.findByTestId('button-credentials-list-edit-0').click()

    cy.findByTestId('textfield-edit-credential-name').should(
      'have.value',
      credentialData.name
    )
    cy.findByTestId('textfield-edit-credential-description').should(
      'have.value',
      credentialData.description
    )
    cy.findByTestId('textfield-edit-credential-login').should(
      'have.value',
      credentialData.login
    )
    cy.findByTestId('textfield-edit-credential-password').should(
      'have.value',
      credentialData.password
    )
  })

  describe('testing leave required fields with whitespace', () => {
    it('should leave field name with whitespace', () => {
      cy.findByTestId('textfield-edit-credential-name').fill(' ')
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(/The name is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-edit-credential-name-helper-text').contains(
        /Invalid name/
      )
    })

    it('should leave field description with whitespace', () => {
      cy.findByTestId('textfield-edit-credential-description').fill(' ')
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(/The description is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId(
        'textfield-edit-credential-description-helper-text'
      ).contains(/Invalid description/)
    })

    it('should leave field login with whitespace', () => {
      cy.findByTestId('textfield-edit-credential-login').fill(' ')
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(/The login is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-edit-credential-login-helper-text').contains(
        /Invalid login/
      )
    })

    it('should leave field password with whitespace', () => {
      cy.findByTestId('textfield-edit-credential-password').fill(' ')
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(/The password is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId(
        'textfield-edit-credential-password-helper-text'
      ).contains(/Invalid password/)
    })
  })

  describe('testing password buttons', () => {
    it('should show password button works correctly', () => {
      cy.findByTestId('textfield-edit-credential-password').should(
        'have.attr',
        'type',
        'password'
      )
      cy.findByTestId('iconbutton-edit-credential-hide-show-password').click()
      cy.findByTestId('textfield-edit-credential-password').should(
        'have.attr',
        'type',
        'text'
      )
    })

    it('should random password button works correctly', () => {
      cy.get<CredentialData>('@currentCredential').then((currentCredential) => {
        const password = 'MostDificultPasswordInTheWorld'

        cy.findAllByTestId('textfield-edit-credential-password').fill(password)
        cy.findByTestId('iconbutton-edit-credential-generate-password').click()
        cy.findByTestId('textfield-edit-credential-password').not(
          `[value=${currentCredential.password}]`
        )
      })
    })
  })

  describe('testing delete credential', () => {
    it('should delete credential and it should persist after a refresh', () => {
      deleteCredential()

      cy.findByTestId('modal-message').contains(
        /Credential successfully deleted./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('paper-credentials-welcome').should('exist')

      cy.visit('/credentials')

      cy.findByTestId('paper-credentials-welcome').should('exist')
    })

    it('should show a modal error when trying to delete a credential that was already deleted', () => {
      cy.window()
        .its('store')
        .then((store) => {
          const credentials = store?.getState().credentials
          const userSession = store?.getState().user

          cy.request({
            url: `${process.env.API_ADDRESS}/credential/${
              ensure(credentials)[0].id
            }`,
            method: 'DELETE',
            headers: headerBuilder(ensure(userSession))
          })

          deleteCredential()

          cy.findByTestId('modal-message').contains(/Credential not found./)
        })
    })
  })

  describe('testing advanced parameters', () => {
    it('should edit a parameter and it should persist after a refresh', () => {
      const key = 'this is a new key'
      const value = 'this is the new key value'

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-edit-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential changed successfully./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('advanced-settings-panel-header').click()

      cy.findByTestId('textfield-advanced-settings-list-key-0').should(
        'have.value',
        key
      )
      cy.findByTestId('textfield-advanced-settings-list-value-0').should(
        'have.value',
        value
      )

      cy.visit('/credentials')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('advanced-settings-panel-header').click()

      cy.findByTestId('textfield-advanced-settings-list-key-0').should(
        'have.value',
        key
      )
      cy.findByTestId('textfield-advanced-settings-list-value-0').should(
        'have.value',
        value
      )
    })

    it('should verify if parameter key cannot be "user"', () => {
      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill('user')
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill('test')
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(
        /The parameter user is not allowed on advanced settings./
      )
    })

    it('should not repeat advanced parameters', () => {
      const key = 'this is a key'
      const value = 'this is the key value'

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('iconbutton-add-user-parameter-0').click()
      cy.findByTestId('textfield-advanced-settings-list-key-1').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-1').fill(value)
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(
        /The parameters cannot be duplicated on advanced settings./
      )
      cy.findByTestId(
        'textfield-advanced-settings-list-key-0-helper-text'
      ).contains(/The parameter cannot be duplicated/)
      cy.findByTestId(
        'textfield-advanced-settings-list-key-1-helper-text'
      ).contains(/The parameter cannot be duplicated/)
    })

    it('should have a key', () => {
      const value = 'this is the key value'

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-edit-credential-save').click()
      cy.findByTestId('message-0').contains(
        /The parameters cannot have a empty key or value./
      )
      cy.findByTestId(
        'textfield-advanced-settings-list-key-0-helper-text'
      ).contains(/The parameter must be filled/)
    })

    it('should have a value', () => {
      const key = 'this is a key'

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('button-edit-credential-save').click()

      cy.findAllByTestId('message-0').contains(
        /The parameters cannot have a empty key or value./
      )
      cy.findByTestId(
        'textfield-advanced-settings-list-value-0-helper-text'
      ).contains(/The parameter must be filled/)
    })
  })

  describe('testing share a credential with the share panel', () => {
    it('should verify if shared user is in the share panel and it should persist after a refresh', () => {
      cy.createUser().then((otherUser) => {
        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(
          otherUser.username.toLowerCase()
        )
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('button-edit-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential changed successfully./
        )

        cy.findByTestId('button-message-modal-ok').click()
        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-edit-0').click()
        cy.findByTestId('share-with-another-user-header').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.visit('/credentials')

        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-edit-0').click()
        cy.findByTestId('share-with-another-user-header').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )
      })
    })

    it('should share a credential', () => {
      cy.get<CredentialData>('@currentCredential').then((currentCredential) => {
        cy.createUser().then((otherUser) => {
          cy.findByTestId('share-with-another-user-header').click()
          cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUser.username.toLowerCase()
          )

          cy.findByTestId('button-edit-credential-save').click()

          cy.findAllByTestId('modal-message').contains(
            /Credential changed successfully./
          )
          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUser.username, otherUser.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            currentCredential.name
          )

          cy.findByTestId('primary-panel-credentials-button-0').click()

          cy.findByTestId('button-credentials-list-share-0').should(
            'be.disabled'
          )

          cy.findByTestId('button-credentials-list-edit-0').click()

          cy.findByTestId('textfield-edit-credential-login').should('not.exist')
          cy.findByTestId('textfield-edit-credential-password').should(
            'not.exist'
          )
          cy.findByTestId('share-with-another-user-header').should('not.exist')
          cy.findByTestId('advanced-settings-panel-header').should('not.exist')
        })
      })
    })

    it('should share a credential with an administrator', () => {
      cy.get<CredentialData>('@currentCredential').then((currentCredential) => {
        cy.createUser().then((otherUser) => {
          cy.findByTestId('share-with-another-user-header').click()
          cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUser.username.toLowerCase()
          )

          cy.findByTestId('checkbox-admin-0').click()
          cy.findByTestId('button-edit-credential-save').click()

          cy.findByTestId('modal-message').contains(
            /Credential changed successfully./
          )
          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUser.username, otherUser.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            currentCredential.name
          )

          cy.findByTestId('primary-panel-credentials-button-0').click()

          cy.findByTestId('button-credentials-list-share-0').not('disabled')

          cy.findByTestId('button-credentials-list-edit-0').click()

          cy.findByTestId('textfield-edit-credential-login').should('exist')
          cy.findByTestId('textfield-edit-credential-password').should('exist')
          cy.findByTestId('share-with-another-user-header').should('exist')
          cy.findByTestId('advanced-settings-panel-header').should('exist')
        })
      })
    })

    it('should not share a credential with yourself or another user that exists on the list', () => {
      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUser) => {
          cy.findByTestId('share-with-another-user-header').click()
          cy.findByTestId('textfield-share-user-list').fill(
            otherUser.username.toLowerCase()
          )
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUser.username.toLowerCase()
          )

          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('textfield-share-user-list-helper-text').contains(
            /User already added/
          )

          cy.findByTestId('textfield-share-user-list').fill(
            currentUser.username.toLowerCase()
          )
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('textfield-share-user-list-helper-text').contains(
            /User already added/
          )
        })
      })
    })

    it('should share a credential with copy function disabled', () => {
      cy.get<CredentialData>('@currentCredential').then((currentCredential) => {
        cy.createUser().then((otherUser) => {
          cy.findByTestId('share-with-another-user-header').click()
          cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
          cy.findByTestId('iconbutton-share-user-list-search').click()
          cy.findByTestId('advanced-settings-panel-header').click()
          cy.findByTestId(
            'checkbox-advanced-settings-list-prevent-copy'
          ).click()
          cy.findByTestId('tooltip-advanced-settings-list-help').click()

          cy.findByTestId('modal-message').contains(
            /If you check this option, this password won't be visible to shared users, unless they are also administrators./
          )

          cy.findByTestId('button-message-modal-ok').click()
          cy.findByTestId('button-edit-credential-save').click()

          cy.findByTestId('modal-message').contains(
            /Credential changed successfully./
          )

          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUser.username, otherUser.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            currentCredential.name
          )
          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-share-0').should(
            'be.disabled'
          )
          cy.findByTestId('primary-panel-credentials-list-0').click()
          cy.findByTestId('box-credentials-list-label-0').should(
            'have.css',
            'opacity',
            '0'
          )
        })
      })
    })

    it('should delete a user from the shared user list', () => {
      cy.createUser().then((otherUser) => {
        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('button-edit-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential changed successfully./
        )

        cy.findByTestId('button-message-modal-ok').click()
        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-edit-0').click()

        cy.findByTestId('share-with-another-user-header').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('iconbutton-share-user-list-delete-0').click()
        cy.findByTestId('button-edit-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential changed successfully./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.userLogout()

        cy.login(otherUser.username, otherUser.password)

        cy.findByTestId('paper-credentials-welcome').should('exist')
      })
    })
  })

  describe('testing edit and delete credential offline', () => {
    it('should edit a credential offline and it should persist after a refresh', () => {
      cy.offline(true)

      const credentialData = buildCredentialData()

      cy.findByTestId('textfield-edit-credential-name').fill(
        credentialData.name
      )
      cy.findByTestId('textfield-edit-credential-description').fill(
        credentialData.description
      )
      cy.findByTestId('textfield-edit-credential-login').fill(
        credentialData.login
      )
      cy.findByTestId('textfield-edit-credential-password').fill(
        credentialData.password
      )
      cy.findByTestId('button-edit-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully changed locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      cy.findByTestId('textfield-edit-credential-name').should(
        'have.value',
        credentialData.name
      )
      cy.findByTestId('textfield-edit-credential-description').should(
        'have.value',
        credentialData.description
      )
      cy.findByTestId('textfield-edit-credential-login').should(
        'have.value',
        credentialData.login
      )
      cy.findByTestId('textfield-edit-credential-password').should(
        'have.value',
        credentialData.password
      )

      cy.offline(false)

      cy.visit('/credentials')

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      cy.findByTestId('textfield-edit-credential-name').should(
        'have.value',
        credentialData.name
      )
      cy.findByTestId('textfield-edit-credential-description').should(
        'have.value',
        credentialData.description
      )
      cy.findByTestId('textfield-edit-credential-login').should(
        'have.value',
        credentialData.login
      )
      cy.findByTestId('textfield-edit-credential-password').should(
        'have.value',
        credentialData.password
      )
    })

    it('should not share offline', () => {
      cy.offline(true)

      cy.findByTestId('share-with-another-user-header').click()

      cy.findByTestId('message-edit-credential-share-offline').contains(
        /You need too be connected to share a credential./
      )
    })

    it('should edit a credential with advanced parameters offline and it should persist after a refresh', () => {
      cy.offline(true)

      const key = 'this is a key'
      const value = 'this is the key value'

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-edit-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully changed locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('advanced-settings-panel-header').click()

      cy.findByTestId('textfield-advanced-settings-list-key-0')
        .should('have.value', key)
        .click()
      cy.findByTestId('textfield-advanced-settings-list-value-0').should(
        'have.value',
        value
      )

      cy.offline(false)

      cy.visit('/credentials')

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('advanced-settings-panel-header').click()

      cy.findByTestId('textfield-advanced-settings-list-key-0')
        .should('have.value', key)
        .click()
      cy.findByTestId('textfield-advanced-settings-list-value-0').should(
        'have.value',
        value
      )
    })

    it('should delete a credential offline and it should persist after a refresh', () => {
      cy.offline(true)

      deleteCredential()

      cy.findByTestId('modal-message').contains(
        /Credential successfully deleted locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.offline(false)

      cy.visit('/credentials')

      cy.findByTestId('tooltip-alert-credential-0').should('exist')
    })

    it('should verify If button of upload image is disabled', () => {
      cy.offline(true)

      cy.findByTestId('input-upload-image-edit').should('be.disabled')
    })
  })
})

describe.skip('testing upload image', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.createCredentialWithImage().as('currentCredential')

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
    })
  })

  it('should update an image to the input in edit page', () => {
    cy.findByTestId(
      'input-upload-image-edit'
    ).attachFile('../fixtures/images/logo_autoseg.png', { force: true })

    cy.findByTestId('button-edit-credential-save').click()

    cy.findByTestId('modal-message').contains(
      /Credential changed successfully./
    )

    cy.findByTestId('button-message-modal-ok').click()
    cy.findByTestId('primary-panel-credentials-button-0').click()
    cy.findByTestId('button-credentials-list-edit-0').click()

    cy.findByTestId('image-upload-edit').should('have.attr', 'src')
  })

  it('should open modal when update credential with an image larger than 5 mb size', () => {
    cy.findByTestId(
      'input-upload-image-edit'
    ).attachFile('../fixtures/images/5mb.jpg', { force: true })

    cy.findByTestId('modal-message').contains(
      /The image must contain less then 5MB to be sent/
    )
  })

  it('should remove server image', () => {
    cy.findByTestId('tooltip-upload-image-edit-close').click()

    cy.findByTestId('modal-message').contains(
      /Your image has not yet been deleted, if you want to undo press the back button/
    )

    cy.findByTestId('button-message-modal-ok').click()

    cy.findByTestId('button-edit-credential-save').click()

    cy.findByTestId('modal-message').contains(
      /Credential changed successfully./
    )

    cy.findByTestId('button-message-modal-ok').click()
    cy.findByTestId('primary-panel-credentials-button-0').click()
    cy.findByTestId('button-credentials-list-edit-0').click()

    cy.findByTestId('image-upload-edit').should('not.have.attr', 'src')
  })

  it('should remove local image from input file', () => {
    cy.findByTestId(
      'input-upload-image-edit'
    ).attachFile('../fixtures/images/logo_autoseg.png', { force: true })

    cy.findByTestId('tooltip-upload-image-edit-close').click()
    cy.findByTestId('image-upload-edit').should('have.attr', 'src')
  })
})
