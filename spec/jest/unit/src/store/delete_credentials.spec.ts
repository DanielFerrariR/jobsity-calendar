import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import {
  resetDeleteCredentials,
  RESET_DELETE_CREDENTIALS,
  fetchDeleteCredentials,
  FETCH_DELETE_CREDENTIALS,
  setDeleteLocalCredentials,
  SET_DELETE_LOCAL_CREDENTIALS,
  deleteCredentialsReducer
} from 'src/store/delete_credentials'
import { userData, shortcutsData } from 'spec/jest/fixtures'
import { api } from 'src/utils'

type Actions = {
  type: string
  payload: any
}[]

describe('testing deleteCredentials state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing delete credentials actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })

    afterEach(() => {
      mockApi.restore()
    })

    it('should resetDeleteCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(await resetDeleteCredentials())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: RESET_DELETE_CREDENTIALS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchDeleteCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi
        .onDelete(`/credential/${shortcutsData[0].credential_id}`)
        .reply(204)

      store.dispatch(await fetchDeleteCredentials(userData, shortcutsData[0]))

      const actions = store.getActions() as Actions
      const expectedPayload = { type: FETCH_DELETE_CREDENTIALS, payload: 204 }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setDeleteLocalCredentials action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setDeleteLocalCredentials('deleted'))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_DELETE_LOCAL_CREDENTIALS,
        payload: 'deleted'
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing delete credential reducer', () => {
    it('should return the initial state', () => {
      expect(deleteCredentialsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle RESET_DELETE_CREDENTIALS', () => {
      expect(
        deleteCredentialsReducer(undefined, {
          type: RESET_DELETE_CREDENTIALS
        })
      ).toStrictEqual(null)
    })

    it('should handle FETCH_DELETE_CREDENTIALS', () => {
      expect(
        deleteCredentialsReducer(undefined, {
          type: FETCH_DELETE_CREDENTIALS,
          payload: 204
        })
      ).toStrictEqual(204)
    })

    it('should handle SET_DELETE_LOCAL_CREDENTIALS', () => {
      expect(
        deleteCredentialsReducer(undefined, {
          type: SET_DELETE_LOCAL_CREDENTIALS,
          payload: 'deleted'
        })
      ).toStrictEqual('deleted')
    })
  })
})
