import {
  headerBuilder,
  shareCredential,
  encryptCredential,
  api
} from 'src/utils'
import * as crypt from 'src/utils/crypt'
import { UserState } from 'src/store/user'
import { DataCredentials } from 'src/store/credentials'
import { FetchCreateCredentialsAxiosResponse } from 'src/store/create_credentials'
import {
  credentialsDB,
  groupsDB,
  menusDB,
  shortcutsDB,
  sessionDB,
  monkisDB,
  userDB
} from 'src/database'
import { buildUserData, buildCredentialData, buildMonkiData } from './generate'

Cypress.Commands.add('createUser', () => {
  const userData = buildUserData()

  cy.request({
    url: `${process.env.API_ADDRESS}/user`,
    method: 'POST',
    body: { user: userData }
  }).then(() => ({ ...userData }))
})

Cypress.Commands.add('login', (login, password) => {
  cy.findByTestId('login').fill(login)
  cy.findByTestId('password').fill(password)
  cy.findByTestId('submit-button').click()
})

Cypress.Commands.add('userLogout', () => {
  cy.findByTestId('header-menu').click()
  cy.findByTestId('logout').click()
})

Cypress.Commands.add('createCredential', () => {
  const credentialData = buildCredentialData()

  cy.findByTestId('button-new-credential').click()
  cy.findByTestId('textfield-create-credential-name').fill(credentialData.name)
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
  cy.findByTestId('button-message-modal-ok')
    .click()
    .then(() => credentialData)
})

Cypress.Commands.add('createCredentialWithImage', () => {
  const credentialData = buildCredentialData()

  cy.findByTestId('button-new-credential').click()
  cy.findByTestId('textfield-create-credential-name').fill(credentialData.name)
  cy.findByTestId('textfield-create-credential-description').fill(
    credentialData.description
  )
  cy.findByTestId('textfield-create-credential-login').fill(
    credentialData.login
  )
  cy.findByTestId('textfield-create-credential-password').fill(
    credentialData.password
  )

  cy.findByTestId(
    'input-upload-image-create'
  ).attachFile('../fixtures/images/logo_splash.png', { force: true })

  cy.findByTestId('button-create-credential-save').click()
  cy.findByTestId('button-message-modal-ok')
    .click()
    .then(() => credentialData)
})

Cypress.Commands.add('shareCredential', (otherUser, currentUser) => {
  const createCredential = async (
    userSession: UserState,
    dataCredentials: DataCredentials
  ) => {
    const credential = {
      id: 0,
      identifier: dataCredentials.shortcut_name,
      name: dataCredentials.shortcut_name,
      description: dataCredentials.description,
      last_reset_at: null,
      prevent_clipboard: dataCredentials.prevent_clipboard,
      administered: true,
      encrypted: true,
      auth_parameters: {
        password: dataCredentials.credential_password
      },
      user_parameters: dataCredentials.user_parameters,
      system_name: null,
      system_parameters: null,
      encrypted_credential_id: 0,
      encrypted_credential_status: 'enabled',
      sharing_users: [{ username: userSession.username, admin: true }]
    }

    const encryptedCredential = await encryptCredential(userSession, credential)

    const response = await api.post<FetchCreateCredentialsAxiosResponse>(
      '/connected_credential',
      {
        connected_credential: {
          credential_params: {
            identifier: encryptedCredential.identifier,
            prevent_clipboard: encryptedCredential.prevent_clipboard,
            user_parameters: encryptedCredential.user_parameters,
            encrypted: true
          },
          encrypted_password: encryptedCredential.auth_parameters.password,
          shortcut_params: {
            name: dataCredentials.shortcut_name,
            description: dataCredentials.description
          }
        }
      },
      {
        headers: headerBuilder(userSession)
      }
    )

    return response.data
  }

  cy.request({
    url: `${process.env.API_ADDRESS}/login`,
    method: 'POST',
    body: { user: { login: otherUser.username, password: otherUser.password } }
  }).then(async (response) => {
    const newOtherUserSession = {
      ...response.body,
      user_private_key: crypt.symmetricDecrypt(
        crypt.keysFromPassword(otherUser.password),
        response.body.encrypted_private_key
      )
    }
    const dataCredentials = {
      credential_password: 'NotificationTest',
      description: 'NotificationTest',
      prevent_clipboard: false,
      shortcut_name: 'NotificationTest',
      user_parameters: {
        user: ''
      }
    }

    cy.request({
      url: `${process.env.API_ADDRESS}/user/search?query=${currentUser.username}`,
      method: 'GET',
      headers: headerBuilder(newOtherUserSession)
    }).then(async (sharedUserResponse) => {
      const createCredentialResponse = await createCredential(
        newOtherUserSession,
        dataCredentials
      )

      const sharedUser = [{ ...sharedUserResponse.body.user, admin: true }]

      await shareCredential(
        newOtherUserSession,
        sharedUser,
        dataCredentials.credential_password,
        createCredentialResponse.credential_id,
        createCredentialResponse.shortcut_id
      )

      return {
        otherUserSession: newOtherUserSession,
        credentialId: createCredentialResponse.credential_id
      }
    })
  })
})

Cypress.Commands.add('destroyDatabases', () => {
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      await userDB.destroy()
      await sessionDB.destroy()
      await credentialsDB.destroy()
      await groupsDB.destroy()
      await shortcutsDB.destroy()
      await monkisDB.destroy()
      await menusDB.destroy()

      resolve()
    } catch (error) {
      reject(error)
    }
  }) as any
})

Cypress.Commands.add('offline', (option) => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable'
  })

  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.emulateNetworkConditions',
    params: {
      offline: option,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
      connectionType: 'none'
    }
  })
})

Cypress.Commands.add('createMonki', (extension = 'js') => {
  const monkiData = buildMonkiData()

  cy.findByTestId('link-new-monki').click()
  cy.findByTestId('textfield-create-monki-name').fill(monkiData.name)
  cy.findByTestId('textfield-create-monki-version').fill(monkiData.version)
  cy.findByTestId('select-create-monki-extension').click()

  if (extension === 'js') {
    cy.findByTestId('select-menuitem-create-monki-0').click()
  } else if (extension === 'sh') {
    cy.findByTestId('select-menuitem-create-monki-1').click()
  }

  cy.get('.ace_text-input').fill(monkiData.contents)

  cy.findByTestId('button-create-monkis-save').click()
  cy.findByTestId('button-message-modal-ok')
    .click()
    .then(() => monkiData)
})
