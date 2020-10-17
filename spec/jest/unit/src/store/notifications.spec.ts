import configureStore from 'redux-mock-store'
import {
  setHaveNotifications,
  SET_HAVE_NOTIFICATIONS,
  resetNotifications,
  RESET_NOTIFICATIONS,
  notificationsReducer
} from 'src/store/notifications'

type Actions = {
  type: string
  payload: any
}[]

describe('testing notifications state', () => {
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing notifications actions', () => {
    it('should setHaveNotifications action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setHaveNotifications())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: SET_HAVE_NOTIFICATIONS, payload: true }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should resetNotifications action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(resetNotifications())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: RESET_NOTIFICATIONS }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing notifications reducer', () => {
    it('should return the initial state', () => {
      expect(notificationsReducer(undefined, {} as any)).toStrictEqual(false)
    })

    it('should handle SET_HAVE_NOTIFICATIONS', () => {
      expect(
        notificationsReducer(undefined, {
          type: SET_HAVE_NOTIFICATIONS,
          payload: true
        })
      ).toStrictEqual(true)
    })

    it('should handle RESET_NOTIFICATIONS', () => {
      expect(
        notificationsReducer(undefined, {
          type: RESET_NOTIFICATIONS
        })
      ).toStrictEqual(false)
    })
  })
})
