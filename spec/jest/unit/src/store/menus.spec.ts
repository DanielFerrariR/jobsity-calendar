import configureStore from 'redux-mock-store'
import {
  setMenusFromApi,
  setMenusFromDatabase,
  SET_MENUS_FROM_API,
  SET_MENUS_FROM_DATABASE,
  menusReducer
} from 'src/store/menus'
import { menusData } from 'spec/jest/fixtures'

type Actions = {
  type: string
  payload: any
}[]

describe('testing menus state', () => {
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing menus actions', () => {
    it('should setMenusFromApi action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setMenusFromApi(menusData))

      const actions = store.getActions() as Actions
      const expectedPayload = { type: SET_MENUS_FROM_API, payload: menusData }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setMenusFromDatabase action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setMenusFromDatabase(menusData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_MENUS_FROM_DATABASE,
        payload: menusData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing menus reducer', () => {
    it('should return the initial state', () => {
      expect(menusReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle SET_MENUS_FROM_API', () => {
      expect(
        menusReducer(undefined, {
          type: SET_MENUS_FROM_API,
          payload: menusData
        })
      ).toStrictEqual(menusData)
    })

    it('should handle SET_MENUS_FROM_DATABASE', () => {
      expect(
        menusReducer(undefined, {
          type: SET_MENUS_FROM_DATABASE,
          payload: menusData
        })
      ).toStrictEqual(menusData)
    })
  })
})
