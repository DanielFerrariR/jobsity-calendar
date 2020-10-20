import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import { remindersData, reminderData } from 'spec/jest/fixtures'
import { weatherAPI } from 'src/services'
import {
  createReminder,
  editReminder,
  deleteReminder,
  deleteReminders,
  remindersReducer,
  CREATE_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS
} from 'src/store/reminders'

jest.mock('nanoid', () => {
  return {
    nanoid: jest.fn(() => '1')
  }
})

type Actions = {
  type: string
  payload: any
}[]

describe('testing reminders state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing create credential actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(weatherAPI)
    })

    afterEach(() => {
      mockApi.restore()
    })

    it('should createReminder action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(createReminder(remindersData, reminderData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: CREATE_REMINDER,
        payload: [...remindersData, reminderData]
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editReminder action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const editedReminder = { ...remindersData[0], text: 'edited' }

      store.dispatch(editReminder(remindersData, editedReminder))

      const newReminders = remindersData.map((each) => {
        if (each.id === editedReminder.id) {
          return editedReminder
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: EDIT_REMINDER,
        payload: newReminders
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteReminder action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const id = 'UTdGirEgNgkwpqjt2Ancm'

      store.dispatch(deleteReminder(remindersData, id))

      const newReminders = remindersData.filter((element) => element.id !== id)

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_REMINDER,
        payload: newReminders
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteReminders action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(
        deleteReminders([...remindersData, reminderData], remindersData)
      )

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_REMINDERS,
        payload: [reminderData]
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing reminders reducer', () => {
    it('should return the initial state', () => {
      expect(remindersReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type CREATE_REMINDER', () => {
      expect(
        remindersReducer(undefined, {
          type: CREATE_REMINDER,
          payload: [reminderData]
        })
      ).toStrictEqual([reminderData])
    })

    it('should handle type EDIT_REMINDER', () => {
      expect(
        remindersReducer(undefined, {
          type: EDIT_REMINDER,
          payload: [reminderData]
        })
      ).toStrictEqual([reminderData])
    })

    it('should handle type DELETE_REMINDER', () => {
      expect(
        remindersReducer(undefined, {
          type: DELETE_REMINDER,
          payload: [reminderData]
        })
      ).toStrictEqual([reminderData])
    })

    it('should handle type DELETE_REMINDERS', () => {
      expect(
        remindersReducer(undefined, {
          type: DELETE_REMINDERS,
          payload: [reminderData]
        })
      ).toStrictEqual([reminderData])
    })
  })
})
