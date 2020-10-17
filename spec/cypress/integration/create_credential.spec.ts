import {
  CredentialData,
  buildCredentialData,
  UserData
} from 'spec/cypress/support/generate'

describe('testing create credentials page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()

      cy.findByTestId('button-new-credential').click()
    })
  })

  const createCredential = (credentialData: CredentialData): void => {
    cy.findByTestId('textfield-create-credential-name').fill(
      credentialData.name
    )
    cy.findByTestId('textfield-create-credential-description').fill(
      credentialData.description
    )
    cy.findByTestId('textfield-create-credential-login').fill(
      credentialData.login
    )
    cy.findByTestId('textfield-create-credential-password').fill(
      credentialData.password
    )
    cy.findByTestId('button-create-credential-save').click()
  }

  const populateFields = (credentialData: CredentialData): void => {
    cy.findByTestId('textfield-create-credential-name').fill(
      credentialData.name
    )
    cy.findByTestId('textfield-create-credential-description').fill(
      credentialData.description
    )
    cy.findByTestId('textfield-create-credential-login').fill(
      credentialData.login
    )
    cy.findByTestId('textfield-create-credential-password').fill(
      credentialData.password
    )
  }

  it('should create a credential and it should persist after a refresh', () => {
    const credentialData = buildCredentialData()

    createCredential(credentialData)

    cy.findByTestId('modal-message').contains(
      /Credential created successfully./
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
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId('textfield-create-credential-name').fill(' ')
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(/The name is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-create-credential-name-helper-text').contains(
        /Invalid name/
      )
    })

    it('should leave field description with whitespace', () => {
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId('textfield-create-credential-description').fill(' ')
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(/The description is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId(
        'textfield-create-credential-description-helper-text'
      ).contains(/Invalid description/)
    })

    it('should leave field login with whitespace', () => {
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId('textfield-create-credential-login').fill(' ')
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(/The login is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('textfield-create-credential-login-helper-text').contains(
        /Invalid login/
      )
    })

    it('should leave field password with whitespace', () => {
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId('textfield-create-credential-password').fill(' ')
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(/The password is invalid./)
      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId(
        'textfield-create-credential-password-helper-text'
      ).contains(/Invalid password/)
    })
  })

  describe('testing password buttons', () => {
    it('should show password button works correctly', () => {
      cy.findByTestId('textfield-create-credential-password').should(
        'have.attr',
        'type',
        'password'
      )
      cy.findByTestId('iconbutton-create-credential-hide-show-password').click()
      cy.findByTestId('textfield-create-credential-password').should(
        'have.attr',
        'type',
        'text'
      )
    })

    it('should random password button works correctly', () => {
      const password = 'MostDificultPasswordInTheWorld'

      cy.findAllByTestId('textfield-create-credential-password').fill(password)
      cy.findByTestId('iconbutton-create-credential-generate-password').click()
      cy.findByTestId('textfield-create-credential-password').not(
        `[value=${password}]`
      )
    })
  })

  describe('testing advanced parameters', () => {
    it('should add a parameter and it should persist after a refresh', () => {
      const credentialData = buildCredentialData()
      const key = 'this is a key'
      const value = 'this is the key value'

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential created successfully./
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
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill('user')
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill('test')
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(
        /The parameter user is not allowed on advanced settings./
      )
    })

    it('should not repeat advanced parameters', () => {
      const credentialData = buildCredentialData()
      const key = 'this is a key'
      const value = 'this is the key value'

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('iconbutton-add-user-parameter-0').click()
      cy.findByTestId('textfield-advanced-settings-list-key-1').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-1').fill(value)
      cy.findByTestId('button-create-credential-save').click()
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
      const credentialData = buildCredentialData()
      const value = 'this is the key value'

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-create-credential-save').click()
      cy.findByTestId('message-0').contains(
        /The parameters cannot have a empty key or value./
      )
      cy.findByTestId(
        'textfield-advanced-settings-list-key-0-helper-text'
      ).contains(/The parameter must be filled/)
    })

    it('should have a value', () => {
      const credentialData = buildCredentialData()
      const key = 'this is a key'

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('button-create-credential-save').click()

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
      const credentialData = buildCredentialData()

      cy.createUser().then((otherUser) => {
        populateFields(credentialData)

        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(
          otherUser.username.toLowerCase()
        )
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('button-create-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential created successfully./
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
      const credentialData = buildCredentialData()

      cy.createUser().then((otherUser) => {
        populateFields(credentialData)

        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('button-create-credential-save').click()

        cy.findAllByTestId('modal-message').contains(
          /Credential created successfully./
        )
        cy.findByTestId('button-message-modal-ok').click()

        cy.userLogout()

        cy.login(otherUser.username, otherUser.password)

        cy.findByTestId('primary-panel-credentials-list-0').contains(
          credentialData.name
        )

        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-share-0').should('be.disabled')
        cy.findByTestId('button-credentials-list-edit-0').click()
        cy.findByTestId('textfield-edit-credential-login').should('not.exist')
        cy.findByTestId('textfield-edit-credential-password').should(
          'not.exist'
        )
        cy.findByTestId('share-with-another-user-header').should('not.exist')
        cy.findByTestId('advanced-settings-panel-header').should('not.exist')
      })
    })

    it('should share a credential with an administrator', () => {
      const credentialData = buildCredentialData()

      cy.createUser().then((otherUser) => {
        populateFields(credentialData)

        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('checkbox-admin-0').click()
        cy.findByTestId('button-create-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential created successfully./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.userLogout()

        cy.login(otherUser.username, otherUser.password)

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

    it('should not share a credential with yourself or another user that exists on the list', () => {
      const credentialData = buildCredentialData()

      cy.get<UserData>('@currentUser').then((currentUser) => {
        cy.createUser().then((otherUser) => {
          populateFields(credentialData)

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

    it('should delete a user from from the shared user list', () => {
      const credentialData = buildCredentialData()

      cy.createUser().then((otherUser) => {
        populateFields(credentialData)

        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
        cy.findByTestId('iconbutton-share-user-list-search').click()

        cy.findByTestId('listitemtext-user-list-0').contains(
          otherUser.username.toLowerCase()
        )

        cy.findByTestId('button-create-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential created successfully./
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

    it('should share a credential with copy function disabled', () => {
      const credentialData = buildCredentialData()

      cy.createUser().then((otherUser) => {
        populateFields(credentialData)

        cy.findByTestId('share-with-another-user-header').click()
        cy.findByTestId('textfield-share-user-list').fill(otherUser.username)
        cy.findByTestId('iconbutton-share-user-list-search').click()
        cy.findByTestId('advanced-settings-panel-header').click()
        cy.findByTestId('checkbox-advanced-settings-list-prevent-copy').click()
        cy.findByTestId('tooltip-advanced-settings-list-help').click()

        cy.findByTestId('modal-message').contains(
          /If you check this option, this password won't be visible to shared users, unless they are also administrators./
        )

        cy.findByTestId('button-message-modal-ok').click()
        cy.findByTestId('button-create-credential-save').click()

        cy.findByTestId('modal-message').contains(
          /Credential created successfully./
        )

        cy.findByTestId('button-message-modal-ok').click()

        cy.userLogout()

        cy.login(otherUser.username, otherUser.password)

        cy.findByTestId('primary-panel-credentials-list-0').contains(
          credentialData.name
        )
        cy.findByTestId('primary-panel-credentials-button-0').click()
        cy.findByTestId('button-credentials-list-share-0').should('be.disabled')
        cy.findByTestId('primary-panel-credentials-list-0').click()
        cy.findByTestId('box-credentials-list-label-0').should(
          'have.css',
          'opacity',
          '0'
        )
      })
    })
  })

  describe('testing create credential offline', () => {
    it('should create a credential offline and it should persist after a refresh', () => {
      cy.offline(true)

      const credentialData = buildCredentialData()

      createCredential(credentialData)

      cy.findByTestId('modal-message').contains(
        /Credential successfully created locally. Don't forget to send the data./
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

      cy.findByTestId('message-create-credential-share-offline').contains(
        /You need too be connected to share a credential./
      )
    })

    it('should create with advanced parameters offline and it should persist after a refresh', () => {
      cy.offline(true)

      const credentialData = buildCredentialData()
      const key = 'this is a key'
      const value = 'this is the key value'

      populateFields(credentialData)

      cy.findByTestId('advanced-settings-panel-header').click()
      cy.findByTestId('textfield-advanced-settings-list-key-0').fill(key)
      cy.findByTestId('textfield-advanced-settings-list-value-0').fill(value)
      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential successfully created locally. Don't forget to send the data./
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

    it('should verify If button of upload image is disabled', () => {
      cy.offline(true)

      cy.findByTestId('input-upload-image-create').should('be.disabled')
    })
  })

  describe.skip('testing upload image', () => {
    it('should add an image to the input', () => {
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId(
        'input-upload-image-create'
      ).attachFile('../fixtures/images/logo_splash.png', { force: true })

      cy.findByTestId('button-create-credential-save').click()

      cy.findByTestId('modal-message').contains(
        /Credential created successfully./
      )

      cy.findByTestId('button-message-modal-ok').click()
      cy.findByTestId('primary-panel-credentials-button-0').click()
      cy.findByTestId('button-credentials-list-edit-0').click()

      cy.findByTestId('image-upload-edit').should('have.attr', 'src')
    })

    it('should open modal when create credential with an image larger than 5 mb size', () => {
      cy.findByTestId(
        'input-upload-image-create'
      ).attachFile('../fixtures/images/5mb.jpg', { force: true })

      cy.findByTestId('modal-message').contains(
        /The image must contain less then 5MB to be sent/
      )
    })

    it('remove image from input file', () => {
      const credentialData = buildCredentialData()

      populateFields(credentialData)

      cy.findByTestId(
        'input-upload-image-create'
      ).attachFile('../fixtures/images/logo_splash.png', { force: true })

      cy.findByTestId('tooltip-upload-image-create-close').click()

      cy.findByTestId('image-upload-edit').should('not.have.attr', 'src')
    })
  })
})
