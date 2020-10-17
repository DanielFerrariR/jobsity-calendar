import { headerBuilder } from 'src/utils'
import { UserState } from 'src/store/user'
import { buildCredentialData, UserData } from 'spec/cypress/support/generate'

describe('testing credentials page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()

      cy.findByTestId('button-new-credential')
    })
  })

  it('should search credential correctly and check after close search box', () => {
    cy.createCredential().then((firstCredentialData) => {
      cy.createCredential().then((secondCredentialData) => {
        cy.findByTestId('button-header-search').click()
        cy.findByTestId('textfield-header-search').fill(
          secondCredentialData.name
        )

        cy.findByTestId('primary-panel-credentials-list-0').contains(
          secondCredentialData.name
        )

        cy.findByTestId('textfield-header-close').click()

        cy.findByTestId('box-credentials-list').contains(
          secondCredentialData.name
        )
        cy.findByTestId('box-credentials-list').contains(
          firstCredentialData.name
        )
      })
    })
  })

  it('should display a welcome page if no credential was created', () => {
    cy.findByTestId('paper-credentials-welcome')
  })

  describe('testing if language is working', () => {
    it('should english language works correctly', () => {
      cy.findByTestId('paper-credentials-welcome').contains(
        /Thanks for signing in. We are very happy to have you among us./
      )
    })
    it('should spanish language works correctly', () => {
      cy.findByTestId('header-menu').click()
      cy.findByTestId('change-language-spanish').click()
      cy.findByTestId('popover-invisible-div').click()
      cy.findByTestId('paper-credentials-welcome').contains(
        /Gracias por registrarte. Estamos muy felices de tenerte con nosotros./
      )
    })
    it('should portuguese language works correctly', () => {
      cy.findByTestId('header-menu').click()
      cy.findByTestId('change-language-portuguese').click()
      cy.findByTestId('popover-invisible-div').click()
      cy.findByTestId('paper-credentials-welcome').contains(
        /Obrigado por se cadastrar. Estamos muito felizes em ter você conosco./
      )
    })
  })

  describe('testing share a credential with the share panel', () => {
    it('should verify if shared user is in share list and it should persist after a refresh', () => {
      cy.createUser().then((otherUserData) => {
        cy.createCredential()

        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-share-0').click()
        cy.findByTestId('textfield-share-user-list').fill(
          otherUserData.username.toLowerCase()
        )
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUserData.username.toLowerCase()
        )
        cy.findByTestId('button-share-user-modal-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential successfully updated!/
        )

        cy.findByTestId('button-message-modal-ok').click()
        cy.findByTestId('button-credentials-list-share-0').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUserData.username.toLowerCase()
        )

        cy.visit('/credentials')

        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-share-0').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUserData.username.toLowerCase()
        )
      })
    })

    it('should share a credential with the share list modal', () => {
      cy.createUser().then((otherUserData) => {
        cy.createCredential().then((credentialData) => {
          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-share-0').click()
          cy.findByTestId('textfield-share-user-list').fill(
            otherUserData.username
          )
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUserData.username.toLowerCase()
          )

          cy.findByTestId('button-share-user-modal-save').click()

          cy.findByTestId('modal-message').contains(
            /Credential successfully updated!/
          )

          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUserData.username, otherUserData.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            credentialData.name
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
      cy.createUser().then((otherUserData) => {
        cy.createCredential().then((credentialData) => {
          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-share-0').click()
          cy.findByTestId('textfield-share-user-list').fill(
            otherUserData.username
          )
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUserData.username.toLowerCase()
          )

          cy.findByTestId('checkbox-admin-0').click()

          cy.findByTestId('button-share-user-modal-save').click()

          cy.findByTestId('modal-message').contains(
            /Credential successfully updated!/
          )

          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUserData.username, otherUserData.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            credentialData.name
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
        cy.createUser().then((otherUserData) => {
          cy.createCredential()

          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-share-0').click()
          cy.findByTestId('textfield-share-user-list').fill(
            otherUserData.username.toLowerCase()
          )

          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUserData.username.toLowerCase()
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

    it('should delete a user from the shared user list', () => {
      cy.createUser().then((otherUserData) => {
        cy.createCredential()
        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-share-0').click()
        cy.findByTestId('textfield-share-user-list').fill(
          otherUserData.username.toLowerCase()
        )
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUserData.username.toLowerCase()
        )

        cy.findByTestId('button-share-user-modal-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential successfully updated!/
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.findByTestId('button-credentials-list-share-0').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUserData.username.toLowerCase()
        )

        cy.findByTestId('iconbutton-share-user-list-delete-0').click()
        cy.findByTestId('button-share-user-modal-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential successfully updated!/
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.userLogout()

        cy.login(otherUserData.username, otherUserData.password)

        cy.findByTestId('paper-credentials-welcome').should('exist')
      })
    })

    it('should share a credential with copy function disabled', () => {
      cy.createUser().then((otherUserData) => {
        cy.createCredential().then((credentialData) => {
          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-edit-0').click()
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
          cy.findByTestId('primary-panel-credentials-button-0').click()
          cy.findByTestId('button-credentials-list-share-0').click()
          cy.findByTestId('textfield-share-user-list').fill(
            otherUserData.username.toLowerCase()
          )
          cy.findByTestId('iconbutton-share-user-list-search').click()

          cy.findByTestId('listitemtext-user-list-0').contains(
            otherUserData.username.toLowerCase()
          )

          cy.findByTestId('button-share-user-modal-save').click()

          cy.findByTestId('modal-message').contains(
            /Credential successfully updated!/
          )

          cy.findByTestId('button-message-modal-ok').click()

          cy.userLogout()

          cy.login(otherUserData.username, otherUserData.password)

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            credentialData.name
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
  })

  describe('testing notifications and update credentials', () => {
    it('should verify if the new credential notification is working and it should persist after a refresh', () => {
      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUserData) => {
          cy.shareCredential(otherUserData, currentUser)

          cy.findByTestId('badge-notifications').contains(1)

          cy.visit('/credentials')

          cy.findByTestId('button-new-credential')

          cy.findByTestId('badge-notifications').contains(1)
        })
      })
    })

    it('should update button work when receiving a new credential and it should persist after a refresh', () => {
      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUserData) => {
          cy.shareCredential(otherUserData, currentUser)

          cy.findByTestId('badge-notifications').contains(1)

          cy.findByTestId('header-menu').click()
          cy.findByTestId('menuitem-update-credentials').click()

          cy.findByTestId('modal-message').contains(/Download successful./)

          cy.findByTestId('button-message-modal-ok').click()

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            'NotificationTest'
          )

          cy.visit('/credentials')

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            'NotificationTest'
          )
        })
      })
    })

    it('should update button work when a credential is deleted', () => {
      const deleteCredential = (userData: UserState, credential_id: number) => {
        cy.request({
          url: `${process.env.API_ADDRESS}/credential/${credential_id}`,
          method: 'DELETE',
          headers: headerBuilder(userData)
        })
      }

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUserData) => {
          cy.shareCredential(otherUserData, currentUser).then(
            ({ otherUserSession, credentialId }) => {
              cy.findByTestId('badge-notifications').contains(1)

              cy.findByTestId('header-menu').click()
              cy.findByTestId('menuitem-update-credentials').click()

              cy.findByTestId('modal-message').contains(/Download successful./)

              cy.findByTestId('button-message-modal-ok').click()

              deleteCredential(otherUserSession, credentialId)

              cy.findByTestId('badge-notifications').contains(1)

              cy.findByTestId('header-menu').click()
              cy.findByTestId('menuitem-update-credentials').click()

              cy.findByTestId('modal-message').contains(/Download successful./)

              cy.findByTestId('button-message-modal-ok').click()

              cy.findByTestId('primary-panel-credentials-list-0').should(
                'not.exist'
              )
            }
          )
        })
      })
    })

    it('should verify if the update credentials button is disabled when offline', () => {
      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUserData) => {
          cy.shareCredential(otherUserData, currentUser)

          cy.findByTestId('badge-notifications').contains(1)

          cy.offline(true)

          cy.findByTestId('header-menu').click()

          cy.findByTestId('menuitem-update-credentials').should(
            'have.attr',
            'aria-disabled',
            'true'
          )
        })
      })
    })

    it('should verify when user try to use the update credentials button having offline credentials', () => {
      cy.offline(true)

      cy.createCredential()

      cy.offline(false)

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUserData) => {
          cy.shareCredential(otherUserData, currentUser)

          cy.findByTestId('badge-notifications').contains(1)

          cy.findByTestId('header-menu').click()
          cy.findByTestId('menuitem-update-credentials').click()

          cy.findByTestId('modal-alert').contains(
            /Are you sure that you want to update your credentials?/
          )
          cy.findByTestId('modal-alert').contains(
            /There are some not updated data on your local database - if you update now, without sending the data, they will be lost forever./
          )

          cy.findByTestId('button-refresh-modal-message').click()

          cy.findByTestId('modal-message').contains(/Download successful./)

          cy.findByTestId('button-message-modal-ok').click()

          cy.findByTestId('primary-panel-credentials-list-0').contains(
            'NotificationTest'
          )
          cy.findByTestId('primary-panel-credentials-list-1').should(
            'not.exist'
          )
        })
      })
    })
  })

  describe('testing upload data to server', () => {
    it('should create and upload the credential to the server and it should persist after refresh', () => {
      cy.offline(true)

      cy.createCredential().then((currentCredential) => {
        cy.findByTestId('tooltip-alert-credential-0').should('exist')

        cy.offline(false)

        cy.findByTestId('header-menu').click()
        cy.findByTestId('menuitem-upload-data').click()

        cy.findByTestId('modal-message').contains(/Upload successfully./)

        cy.findByTestId('tooltip-alert-credential-0').should('not.exist')

        cy.visit('/credentials')

        cy.findByTestId('box-credentials-list').contains(currentCredential.name)

        cy.findByTestId('tooltip-alert-credential-0').should('not.exist')
      })
    })

    it('should edit and upload the credential to the server and it should persist after refresh', () => {
      cy.createCredential()
      cy.offline(true)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      const newCredentialData = buildCredentialData()

      cy.findByTestId('textfield-edit-credential-name').fill(
        newCredentialData.name
      )

      cy.findByTestId('textfield-edit-credential-description').fill(
        newCredentialData.description
      )

      cy.findByTestId('textfield-edit-credential-login').fill(
        newCredentialData.login
      )

      cy.findByTestId('textfield-edit-credential-password').fill(
        newCredentialData.password
      )

      cy.findByTestId('button-edit-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully changed locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.offline(false)

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-upload-data').click()

      cy.findByTestId('modal-message').contains(/Upload successfully./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('not.exist')

      cy.visit('/credentials')

      cy.findByTestId('box-credentials-list').contains(newCredentialData.name)

      cy.findByTestId('tooltip-alert-credential-0').should('not.exist')
    })

    it('should delete and upload the credential to the server and it should persist after refresh', () => {
      cy.createCredential()

      cy.offline(true)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('button-edit-credential-delete-credential').click()
      cy.findByTestId('button-credential-delete-modal-yes').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully deleted locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.offline(false)

      cy.findByTestId('header-menu').click()
      cy.findByTestId('menuitem-upload-data').click()

      cy.findByTestId('modal-message').contains(/Upload successfully./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('paper-credentials-welcome').should('exist')

      cy.visit('/credentials')

      cy.findByTestId('paper-credentials-welcome').should('exist')
    })

    it('should create and upload a credential with button in credentials list and it should persist after refresh', () => {
      cy.offline(true)

      cy.createCredential().then((currentCredential) => {
        cy.findByTestId('tooltip-alert-credential-0').should('exist')

        cy.offline(false)

        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-upload-credential-0').click()

        cy.findByTestId('modal-message').contains(/Upload successfully./)

        cy.findByTestId('button-message-modal-ok').click()

        cy.findByTestId('tooltip-alert-credential-0').should('not.exist')

        cy.visit('/credentials')

        cy.findByTestId('box-credentials-list').contains(currentCredential.name)

        cy.findByTestId('tooltip-alert-credential-0').should('not.exist')
      })
    })

    it('should edit and upload a single credential with the upload credential button and it should persist after refresh', () => {
      cy.createCredential()

      cy.offline(true)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      const newCredential = buildCredentialData()

      cy.findByTestId('textfield-edit-credential-name').fill(newCredential.name)

      cy.findByTestId('textfield-edit-credential-description').fill(
        newCredential.description
      )

      cy.findByTestId('textfield-edit-credential-login').fill(
        newCredential.login
      )

      cy.findByTestId('textfield-edit-credential-password').fill(
        newCredential.password
      )

      cy.findByTestId('button-edit-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully changed locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('exist')

      cy.offline(false)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-upload-credential-0').click()
      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('tooltip-alert-credential-0').should('not.exist')

      cy.visit('/credentials')

      cy.findByTestId('box-credentials-list').contains(newCredential.name)

      cy.findByTestId('tooltip-alert-credential-0').should('not.exist')
    })

    it('should delete and upload a single credential with the upload credential button and it should persist after refresh', () => {
      cy.createCredential()

      cy.offline(true)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()
      cy.findByTestId('button-edit-credential-delete-credential').click()
      cy.findByTestId('button-credential-delete-modal-yes').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully deleted locally. Don't forget to send the data./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.offline(false)

      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-upload-credential-0').click()

      cy.findByTestId('modal-message').contains(/Upload successfully./)

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('paper-credentials-welcome').should('exist')

      cy.visit('/credentials')

      cy.findByTestId('paper-credentials-welcome').should('exist')
    })
  })

  describe('testing export and import csv', () => {
    it('should export csv with password', () => {
      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-export-credentials-to-csv').click()

      cy.findByTestId('textfield-convert-to-csv-password').fill('teste')

      cy.findByTestId('button-convert-to-csv-modal-ok').click()

      cy.findByTestId('modal-message').contains(/Successfully Converted/)
    })

    it('should export csv without password', () => {
      cy.createCredential()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-export-credentials-to-csv').click()

      cy.findByTestId('box-convert-to-csv-lock').click()

      cy.findByTestId('button-convert-to-csv-modal-ok').click()

      cy.findByTestId('modal-message').contains(/Successfully Converted/)
    })

    it('should not export csv without credentials', () => {
      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-export-credentials-to-csv').click()

      cy.findByTestId('box-convert-to-csv-lock').click()

      cy.findByTestId('button-convert-to-csv-modal-ok').click()

      cy.findByTestId('modal-message').contains(
        /You don't have credentials to export/
      )
    })

    it('should import csv, transform it to credentials and it should persist after a refresh', () => {
      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId(
        'input-csv-to-credential-upload'
      ).attachFile('../fixtures/credentials_passmonki.csv', { force: true })

      cy.findByTestId('modal-message').contains(
        /Created credentials successfully/
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('primary-panel-credentials-list-0').contains(/teste/)

      cy.visit('/credentials')

      cy.findByTestId('primary-panel-credentials-list-0').contains(/teste/)
    })

    it('should overwrite the duplicated credential from csv', () => {
      cy.findByTestId('button-new-credential').click()

      cy.findByTestId('textfield-create-credential-name').fill('teste')
      cy.findByTestId('textfield-create-credential-description').fill('teste')
      cy.findByTestId('textfield-create-credential-login').fill('teste')
      cy.findByTestId('textfield-create-credential-password').fill('teste')

      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential created successfully./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId(
        'input-csv-to-credential-upload'
      ).attachFile('../fixtures/credentials_passmonki.csv', { force: true })

      cy.findByTestId('list-item-convert-csv-credentials-0').contains(
        /Credential 1: teste/
      )

      cy.findByTestId('button-csv-to-credentials-overwrite').click()

      cy.findByTestId('modal-message').contains(
        /Created credentials successfully/
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('primary-panel-credentials-list-0').contains(/teste/)
    })

    it('should create as new the duplicated credential from csv', () => {
      cy.findByTestId('button-new-credential').click()

      cy.findByTestId('textfield-create-credential-name').fill('teste')
      cy.findByTestId('textfield-create-credential-description').fill('teste')
      cy.findByTestId('textfield-create-credential-login').fill('teste')
      cy.findByTestId('textfield-create-credential-password').fill('teste')

      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential created successfully./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId(
        'input-csv-to-credential-upload'
      ).attachFile('../fixtures/credentials_passmonki.csv', { force: true })

      cy.findByTestId('list-item-convert-csv-credentials-0').contains(
        /Credential 1: teste/
      )

      cy.findByTestId('button-csv-to-credentials-new-credential').click()

      cy.findByTestId('modal-message').contains(
        /Created credentials successfully/
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('primary-panel-credentials-list-1').contains(/teste/)
    })

    it('should create bypassing duplicates credentials from csv', () => {
      cy.findByTestId('button-new-credential').click()

      cy.findByTestId('textfield-create-credential-name').fill('teste')
      cy.findByTestId('textfield-create-credential-description').fill('teste')
      cy.findByTestId('textfield-create-credential-login').fill('teste')
      cy.findByTestId('textfield-create-credential-password').fill('teste')

      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential created successfully./
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId(
        'input-csv-to-credential-upload'
      ).attachFile('../fixtures/credentials_passmonki.csv', { force: true })

      cy.findByTestId('list-item-convert-csv-credentials-0').contains(
        /Credential 1: teste/
      )

      cy.findByTestId('button-csv-to-credentials-ignore').click()

      cy.findByTestId('modal-message').contains(
        /Created credentials successfully/
      )

      cy.findByTestId('button-message-modal-ok').click()

      cy.findByTestId('primary-panel-credentials-list-1').contains(/teste2/)
    })

    it('should not import invalid csv', () => {
      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId('input-csv-to-credential-upload').attachFile(
        '../fixtures/invalid_credentials_passmonki.csv',
        {
          force: true
        }
      )

      cy.findByTestId('modal-message').contains(/Invalid CSV/)
    })

    it('should not import csv with invalid parameters', () => {
      cy.findByTestId('header-menu').click()

      cy.findByTestId('menuitem-import-csv-to-credentials').click()

      cy.findByTestId('input-csv-to-credential-upload').attachFile(
        '../fixtures/invalid_parameters_credentials_passmonki.csv',
        {
          force: true
        }
      )

      cy.findByTestId('modal-message').contains(/Invalid Parameters/)
    })
  })
})
