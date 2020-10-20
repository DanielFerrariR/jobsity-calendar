import {
  RemindersState,
  CREATE_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS,
  RemindersActionTypes
} from './types'

const initialState = null

const remindersReducer = (
  state: RemindersState | null = initialState,
  action: RemindersActionTypes
): RemindersState | null => {
  switch (action.type) {
    case CREATE_REMINDER:
      return action.payload
    case EDIT_REMINDER:
      return action.payload
    case DELETE_REMINDER:
      return action.payload
    case DELETE_REMINDERS:
      return action.payload
    default:
      return state
  }
}

export default remindersReducer
