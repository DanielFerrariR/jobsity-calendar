import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { userData, dataCredentials } from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  RESET_CREATE_CREDENTIALS,
  resetCreateCredentials,
  setCreateLocalCredentials,
  SET_CREATE_LOCAL_CREDENTIALS,
  fetchCreateCredentials,
  FETCH_CREATE_CREDENTIALS,
  createCredentialsReducer
} from 'src/store/create_credentials'

type Actions = {
  type: string
  payload: any
}[]

describe('testing createCredential state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing create credential actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should resetCreateCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(resetCreateCredentials())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: RESET_CREATE_CREDENTIALS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchCreateCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi.onPost('/connected_credential').reply(200, {
        successful: true,
        credential_id: 1,
        shortcut_id: 1
      })

      store.dispatch(await fetchCreateCredentials(userData, dataCredentials))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: FETCH_CREATE_CREDENTIALS,
        payload: {
          successful: true,
          credential_id: 1,
          shortcut_id: 1
        }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setCreateLocalCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setCreateLocalCredentials('created'))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_CREATE_LOCAL_CREDENTIALS,
        payload: 'created'
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing create reducer', () => {
    it('should return the initial state', () => {
      expect(createCredentialsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type RESET_CREATE_CREDENTIALS', () => {
      expect(
        createCredentialsReducer(undefined, {
          type: RESET_CREATE_CREDENTIALS
        })
      ).toStrictEqual(null)
    })

    it('should handle type FETCH_CREATE_CREDENTIALS', () => {
      expect(
        createCredentialsReducer(undefined, {
          type: FETCH_CREATE_CREDENTIALS,
          payload: {
            successful: true,
            credential_id: 1,
            shortcut_id: 1
          }
        })
      ).toStrictEqual({
        successful: true,
        credential_id: 1,
        shortcut_id: 1
      })
    })

    it('should handle type SET_CREATE_LOCAL_CREDENTIALS', () => {
      expect(
        createCredentialsReducer(undefined, {
          type: SET_CREATE_LOCAL_CREDENTIALS,
          payload: {
            successful: true,
            credential_id: 1,
            shortcut_id: 1
          }
        })
      ).toStrictEqual({
        successful: true,
        credential_id: 1,
        shortcut_id: 1
      })
    })
  })
})
