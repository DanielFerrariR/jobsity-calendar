import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import {
  userData,
  shortcutsData,
  credentialsData,
  dataCredentials
} from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  resetEditCredentials,
  RESET_EDIT_CREDENTIALS,
  fetchEditCredentials,
  editCredentialsReducer,
  SET_EDIT_LOCAL_CREDENTIALS,
  FETCH_EDIT_CREDENTIALS,
  setEditLocalCredentials
} from 'src/store/edit_credentials'

type Actions = {
  type: string
  payload: any
}[]

describe('testing editCredentials state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing edit credential actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should resetEditCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(await resetEditCredentials())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: RESET_EDIT_CREDENTIALS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchEditCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi.onPatch('/connected_credential').reply(200, {
        credential_id: 1,
        shortcut_id: 1,
        successful: true
      })

      store.dispatch(
        await fetchEditCredentials(
          userData,
          dataCredentials,
          shortcutsData[0],
          credentialsData
        )
      )

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: FETCH_EDIT_CREDENTIALS,
        payload: {
          credential_id: 1,
          shortcut_id: 1,
          successful: true
        }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setEditLocalCredentials action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      const state = 'edited'
      store.dispatch(await setEditLocalCredentials(state))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_EDIT_LOCAL_CREDENTIALS,
        payload: state
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing edit reducer', () => {
    it('should return the initial state', () => {
      expect(editCredentialsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type RESET_EDIT_CREDENTIALS', () => {
      expect(
        editCredentialsReducer(undefined, {
          type: RESET_EDIT_CREDENTIALS
        })
      ).toStrictEqual(null)
    })

    it('should handle type FETCH_EDIT_CREDENTIALS', () => {
      expect(
        editCredentialsReducer(undefined, {
          type: FETCH_EDIT_CREDENTIALS,
          payload: {
            credential_id: 1,
            shortcut_id: 1,
            successful: true
          }
        })
      ).toStrictEqual({
        credential_id: 1,
        shortcut_id: 1,
        successful: true
      })
    })

    it('should handle type SET_EDIT_LOCAL_CREDENTIALS', () => {
      expect(
        editCredentialsReducer(undefined, {
          type: SET_EDIT_LOCAL_CREDENTIALS,
          payload: {
            credential_id: 1,
            shortcut_id: 1,
            successful: true
          }
        })
      ).toStrictEqual({
        credential_id: 1,
        shortcut_id: 1,
        successful: true
      })
    })
  })
})
