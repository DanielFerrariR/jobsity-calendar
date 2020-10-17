import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { monkisData } from 'spec/jest/fixtures'
import { api } from 'src/utils'
import {
  setMonkisFromDatabase,
  SET_MONKIS_FROM_DATABASE,
  setMonkisFromApi,
  SET_MONKIS_FROM_API,
  createApiMonki,
  CREATE_API_MONKI,
  editApiMonki,
  EDIT_API_MONKI,
  deleteApiMonki,
  DELETE_API_MONKI,
  monkisReducer
} from 'src/store/monkis'

type Actions = {
  type: string
  payload: any
}[]

describe('testing monkis state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing monkis actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })
    afterEach(() => {
      mockApi.restore()
    })

    it('should setMonkisFromDatabase action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setMonkisFromDatabase(monkisData))

      const actions = store.getActions() as Actions

      const expectedPayload = {
        type: SET_MONKIS_FROM_DATABASE,
        payload: monkisData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setMonkisFromApi action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(await setMonkisFromApi(monkisData))

      const actions = store.getActions() as Actions

      const expectedPayload = {
        type: SET_MONKIS_FROM_API,
        payload: monkisData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createApiMonki action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(createApiMonki(monkisData[0], monkisData))

      const actions = store.getActions() as Actions

      const newMonkis = [...monkisData, monkisData[0]]

      const expectedPayload = {
        type: CREATE_API_MONKI,
        payload: newMonkis
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteApiMonki action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(deleteApiMonki(19, monkisData))

      const actions = store.getActions() as Actions

      const newMonkis = monkisData.filter((monki) => monki.id !== 19)

      const expectedPayload = {
        type: DELETE_API_MONKI,
        payload: newMonkis
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editApiMonki action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(editApiMonki(19, monkisData[1], monkisData))

      const actions = store.getActions() as Actions

      const newMonkis = monkisData.map((each) => {
        if (each.id === 19) {
          return monkisData[1]
        }
        return each
      })

      const expectedPayload = {
        type: EDIT_API_MONKI,
        payload: newMonkis
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing monkis reducer', () => {
    it('should return the initial state', () => {
      expect(monkisReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type SET_MONKIS_FROM_DATABASE', () => {
      expect(
        monkisReducer(undefined, {
          type: SET_MONKIS_FROM_DATABASE,
          payload: monkisData
        })
      ).toStrictEqual(monkisData)
    })

    it('should handle type SET_MONKIS_FROM_API', () => {
      expect(
        monkisReducer(undefined, {
          type: SET_MONKIS_FROM_API,
          payload: monkisData
        })
      ).toStrictEqual(monkisData)
    })

    it('should handle type CREATE_API_MONKI', () => {
      expect(
        monkisReducer(undefined, {
          type: CREATE_API_MONKI,
          payload: [...monkisData, monkisData[0]]
        })
      ).toStrictEqual([...monkisData, monkisData[0]])
    })

    it('should handle type DELETE_API_MONKI', () => {
      expect(
        monkisReducer(undefined, {
          type: DELETE_API_MONKI,
          payload: monkisData.filter((monki) => monki.id !== 19)
        })
      ).toStrictEqual(monkisData.filter((monki) => monki.id !== 19))
    })

    it('should handle type EDIT_API_MONKI', () => {
      expect(
        monkisReducer(undefined, {
          type: EDIT_API_MONKI,
          payload: monkisData.map((each) => {
            if (each.id === 19) {
              return monkisData[1]
            }
            return each
          })
        })
      ).toStrictEqual(
        monkisData.map((each) => {
          if (each.id === 19) {
            return monkisData[1]
          }
          return each
        })
      )
    })
  })
})
