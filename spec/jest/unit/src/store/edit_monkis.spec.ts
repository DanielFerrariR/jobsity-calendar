import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { userData, dataMonkis } from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  resetEditMonkis,
  RESET_EDIT_MONKIS,
  fetchEditMonkis,
  FETCH_EDIT_MONKIS,
  editMonkisReducer
} from 'src/store/edit_monkis'

type Actions = {
  type: string
  payload: any
}[]

describe('testing editMonki state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing edit monkis actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should resetEditMonkis action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(resetEditMonkis())

      const actions = store.getActions() as Actions

      const expectedPayload = { type: RESET_EDIT_MONKIS }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should fetchEditMonkis action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      mockApi.onPatch('/hook/1').reply(200, {
        successful: true,
        user: {
          name: 'Monki',
          version: '1.0',
          extension: 'Javascript',
          contents: 'alert("Hello World")'
        }
      })

      store.dispatch(await fetchEditMonkis(1, dataMonkis, userData))

      const actions = store.getActions() as Actions

      const expectedPayload = {
        type: FETCH_EDIT_MONKIS,
        payload: {
          id: 1,
          successful: true,
          name: 'Monki',
          version: '1.0',
          extension: 'Javascript',
          contents: 'alert("Hello World")'
        }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing edit_monki reducer', () => {
    it('should return the initial state', () => {
      expect(editMonkisReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type RESET_EDIT_MONKIS', () => {
      expect(
        editMonkisReducer(undefined, {
          type: RESET_EDIT_MONKIS
        })
      ).toStrictEqual(null)
    })

    it('should handle type FETCH_EDIT_MONKIS', () => {
      expect(
        editMonkisReducer(undefined, {
          type: FETCH_EDIT_MONKIS,
          payload: {
            id: 1,
            successful: true,
            name: 'Monki',
            version: '1.0',
            extension: 'Javascript',
            contents: 'alert("Hello World")'
          }
        })
      ).toStrictEqual({
        id: 1,
        successful: true,
        name: 'Monki',
        version: '1.0',
        extension: 'Javascript',
        contents: 'alert("Hello World")'
      })
    })
  })
})
