import configureStore from 'redux-mock-store'
import {
  setGroupsFromApi,
  setGroupsFromDatabase,
  SET_GROUPS_FROM_API,
  SET_GROUPS_FROM_DATABASE,
  groupsReducer
} from 'src/store/groups'
import { groupsData } from 'spec/jest/fixtures'

type Actions = {
  type: string
  payload: any
}[]

describe('testing menus state', () => {
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing menus actions', () => {
    it('should setGroupsFromApi action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setGroupsFromApi(groupsData))

      const actions = store.getActions() as Actions
      const expectedPayload = { type: SET_GROUPS_FROM_API, payload: groupsData }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setGroupsFromDatabase action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setGroupsFromDatabase(groupsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_GROUPS_FROM_DATABASE,
        payload: groupsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing menus reducer', () => {
    it('should return the initial state', () => {
      expect(groupsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle SET_GROUPS_FROM_API', () => {
      expect(
        groupsReducer(undefined, {
          type: SET_GROUPS_FROM_API,
          payload: groupsData
        })
      ).toStrictEqual(groupsData)
    })

    it('should handle SET_GROUPS_FROM_DATABASE', () => {
      expect(
        groupsReducer(undefined, {
          type: SET_GROUPS_FROM_DATABASE,
          payload: groupsData
        })
      ).toStrictEqual(groupsData)
    })
  })
})
