import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { userData } from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  resetDeleteMonkis,
  RESET_DELETE_MONKIS,
  fetchDeleteMonkis,
  FETCH_DELETE_MONKIS,
  deleteMonkisReducer
} from 'src/store/delete_monkis'

type Actions = {
  type: string
  payload: any
}[]

describe('testing deleteMonki state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing delete monkis actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should resetEditMonkis action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(resetDeleteMonkis())

      const actions = store.getActions() as Actions

      const expectedPayload = { type: RESET_DELETE_MONKIS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchDeleteMonkis action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi.onDelete('/hook/1').reply(200)

      store.dispatch(await fetchDeleteMonkis(userData, 1))

      const actions = store.getActions() as Actions

      const expectedPayload = {
        type: FETCH_DELETE_MONKIS,
        payload: 200
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing delete_monki reducer', () => {
    it('should return the initial state', () => {
      expect(deleteMonkisReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type RESET_DELETE_MONKIS', () => {
      expect(
        deleteMonkisReducer(undefined, {
          type: RESET_DELETE_MONKIS
        })
      ).toStrictEqual(null)
    })

    it('should handle type FETCH_DELETE_MONKIS', () => {
      expect(
        deleteMonkisReducer(undefined, {
          type: FETCH_DELETE_MONKIS,
          payload: 200
        })
      ).toStrictEqual(200)
    })
  })
})
