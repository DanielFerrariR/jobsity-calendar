import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { userData, dataMonkis } from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  resetCreateMonkis,
  RESET_CREATE_MONKIS,
  fetchCreateMonkis,
  FETCH_CREATE_MONKIS,
  createMonkisReducer
} from 'src/store/create_monkis'

type Actions = {
  type: string
  payload: any
}[]

describe('testing createMonki state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing create monkis actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should resetCreateMonkis action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(resetCreateMonkis())

      const actions = store.getActions() as Actions

      const expectedPayload = { type: RESET_CREATE_MONKIS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchCreateMonkis action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi.onPost('/hook').reply(200, {
        successful: true,
        id: 1,
        name: 'Monki',
        version: '1.0',
        extension: 'javascript',
        contents: 'alert("Hello World")',
        user_id: 1
      })

      store.dispatch(await fetchCreateMonkis(dataMonkis, userData))

      const actions = store.getActions() as Actions

      const expectedPayload = {
        type: FETCH_CREATE_MONKIS,
        payload: {
          successful: true,
          id: 1,
          name: 'Monki',
          version: '1.0',
          extension: 'javascript',
          contents: 'alert("Hello World")',
          user_id: 1
        }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing create_monki reducer', () => {
    it('should return the initial state', () => {
      expect(createMonkisReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type RESET_CREATE_MONKIS', () => {
      expect(
        createMonkisReducer(undefined, {
          type: RESET_CREATE_MONKIS
        })
      ).toStrictEqual(null)
    })

    it('should handle type FETCH_CREATE_MONKIS', () => {
      expect(
        createMonkisReducer(undefined, {
          type: FETCH_CREATE_MONKIS,
          payload: {
            successful: true,
            id: 1,
            name: 'Monki',
            version: '1.0',
            extension: 'javascript',
            contents: 'alert("Hello World")',
            user_id: 1
          }
        })
      ).toStrictEqual({
        successful: true,
        id: 1,
        name: 'Monki',
        version: '1.0',
        extension: 'javascript',
        contents: 'alert("Hello World")',
        user_id: 1
      })
    })
  })
})
