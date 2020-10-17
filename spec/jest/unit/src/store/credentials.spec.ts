import configureStore from 'redux-mock-store'
import {
  setCredentialsFromApi,
  SET_CREDENTIALS_FROM_API,
  setCredentialsFromDatabase,
  SET_CREDENTIALS_FROM_DATABASE,
  deleteLocalCredential,
  DELETE_LOCAL_CREDENTIAL,
  deleteApiCredential,
  DELETE_API_CREDENTIAL,
  createLocalCredential,
  CREATE_LOCAL_CREDENTIAL,
  createApiCredential,
  CREATE_API_CREDENTIAL,
  uploadLocalCredential,
  UPLOAD_LOCAL_CREDENTIAL,
  setSharedUsersCredential,
  SET_SHARED_USERS_CREDENTIAL,
  editLocalCredential,
  EDIT_LOCAL_CREDENTIAL,
  editApiCredential,
  EDIT_API_CREDENTIAL,
  credentialsReducer,
  CredentialsState
} from 'src/store/credentials'
import { ensure } from 'src/utils'
import {
  credentialsData,
  userData,
  shortcutsData,
  dataCredentials
} from 'spec/jest/fixtures'

type Actions = {
  type: string
  payload: any
}[]

describe('testing credentials state', () => {
  const credential = credentialsData[0]
  const shortcut = shortcutsData.find(
    (element) => element.credential_id == credential.id
  )
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing credentials actions', () => {
    it('should setCredentialsFromApi action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setCredentialsFromApi(credentialsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_CREDENTIALS_FROM_API,
        payload: credentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setCredentialsFromDatabase action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setCredentialsFromDatabase(credentialsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_CREDENTIALS_FROM_DATABASE,
        payload: credentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteLocalCredential action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(deleteLocalCredential(credential.id, credentialsData))

      const newCredentials = credentialsData.map((each) => {
        if (each.id == credential.id) {
          return {
            ...each,
            state: 'deleted'
          }
        }
        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_LOCAL_CREDENTIAL,
        payload: newCredentials
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteApiCredential action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(deleteApiCredential(credential.id, credentialsData))

      const newCredentials = credentialsData.filter(
        (each) => each.id != credential.id
      )

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_API_CREDENTIAL,
        payload: newCredentials
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createLocalCredential action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(
        await createLocalCredential(
          1,
          userData,
          dataCredentials,
          credentialsData
        )
      )

      const actions = store.getActions() as Actions
      const newCredentialsData = [...credentialsData]

      newCredentialsData.push({
        id: 1,
        name: dataCredentials.shortcut_name,
        description: dataCredentials.description,
        identifier: dataCredentials.shortcut_name,
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
        sharing_users: [{ username: userData.username, admin: true }],
        state: 'created'
      })

      const expectedPayload = {
        type: CREATE_LOCAL_CREDENTIAL,
        payload: newCredentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createApiCredential action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const sharedUsers = [{ id: 1, username: 'pedro', admin: true }]

      store.dispatch(
        await createApiCredential(
          1,
          userData,
          dataCredentials,
          credentialsData,
          sharedUsers
        )
      )

      const actions = store.getActions() as Actions
      const newCredentialsData = [...credentialsData]
      const newSharedUsers = sharedUsers.map((each) => {
        return {
          username: each.username,
          admin: each.admin
        }
      })

      newCredentialsData.push({
        id: 1,
        name: dataCredentials.shortcut_name,
        description: dataCredentials.description,
        identifier: dataCredentials.shortcut_name,
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
        sharing_users: [
          { username: userData.username, admin: true },
          ...newSharedUsers
        ]
      })

      const expectedPayload = {
        type: CREATE_API_CREDENTIAL,
        payload: newCredentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editLocalCredential action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const sharedUsers = [{ id: 1, username: 'pedro', admin: true }]

      store.dispatch(
        await editLocalCredential(
          userData,
          dataCredentials,
          ensure(shortcut),
          credentialsData,
          sharedUsers
        )
      )

      const newSharedUsers = sharedUsers.map((each) => {
        return {
          username: each.username,
          admin: each.admin
        }
      })
      const newCredentialsData = credentialsData.map((each) => {
        if (each.id === credential.id) {
          return {
            ...credential,
            name: dataCredentials.shortcut_name,
            description: dataCredentials.description,
            identifier: dataCredentials.shortcut_name,
            prevent_clipboard: dataCredentials.prevent_clipboard,
            auth_parameters: {
              password: dataCredentials.credential_password
            },
            user_parameters: dataCredentials.user_parameters,
            sharing_users: [
              { username: userData.username, admin: true },
              ...newSharedUsers
            ],
            state: 'edited' as CredentialsState[0]['state']
          }
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: EDIT_LOCAL_CREDENTIAL,
        payload: newCredentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editApiCredential action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const sharedUsers = [{ id: 1, username: 'pedro', admin: true }]

      store.dispatch(
        await editApiCredential(
          userData,
          dataCredentials,
          ensure(shortcut),
          credentialsData,
          sharedUsers
        )
      )

      const newSharedUsers = sharedUsers.map((each) => {
        return {
          username: each.username,
          admin: each.admin
        }
      })
      const newCredentialsData = credentialsData.map((each) => {
        if (each.id === credential.id) {
          return {
            ...credential,
            name: dataCredentials.shortcut_name,
            description: dataCredentials.description,
            identifier: dataCredentials.shortcut_name,
            prevent_clipboard: dataCredentials.prevent_clipboard,
            auth_parameters: {
              password: dataCredentials.credential_password
            },
            user_parameters: dataCredentials.user_parameters,
            sharing_users: [
              { username: userData.username, admin: true },
              ...newSharedUsers
            ]
          }
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: EDIT_API_CREDENTIAL,
        payload: newCredentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should uploadLocalCredential action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(uploadLocalCredential(credentialsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: UPLOAD_LOCAL_CREDENTIAL,
        payload: credentialsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setSharedUsersCredential action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)
      const sharedUsers = [{ id: 1, username: 'pedro', admin: true }]

      store.dispatch(
        setSharedUsersCredential(
          userData,
          credential.id,
          credentialsData,
          sharedUsers
        )
      )

      const newSharedUsers = sharedUsers.map((each) => {
        return {
          username: each.username,
          admin: each.admin
        }
      })
      const newCredentials = credentialsData.map((each) => {
        if (each.id == credential.id) {
          return {
            ...each,
            sharing_users: [
              { username: userData.username, admin: true },
              ...newSharedUsers
            ]
          }
        }
        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_SHARED_USERS_CREDENTIAL,
        payload: newCredentials
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing credentials reducer', () => {
    it('should return the initial state', () => {
      expect(credentialsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type SET_CREDENTIALS_FROM_API', () => {
      expect(
        credentialsReducer(undefined, {
          type: SET_CREDENTIALS_FROM_API,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type SET_CREDENTIALS_FROM_DATABASE', () => {
      expect(
        credentialsReducer(undefined, {
          type: SET_CREDENTIALS_FROM_DATABASE,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type DELETE_LOCAL_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: DELETE_LOCAL_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type DELETE_API_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: DELETE_API_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type CREATE_LOCAL_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: CREATE_LOCAL_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type CREATE_API_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: CREATE_API_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type EDIT_LOCAL_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: EDIT_LOCAL_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type EDIT_API_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: EDIT_API_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type UPLOAD_LOCAL_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: UPLOAD_LOCAL_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })

    it('should handle type SET_SHARED_USERS_CREDENTIAL', () => {
      expect(
        credentialsReducer(undefined, {
          type: SET_SHARED_USERS_CREDENTIAL,
          payload: credentialsData
        })
      ).toStrictEqual(credentialsData)
    })
  })
})
