export type RemindersState = {
  id: string
  date: Date
  city: string
  color: string
  text: string
}[]

export const CREATE_REMINDER = 'CREATE_REMINDER'

export const EDIT_REMINDER = 'EDIT_REMINDER'

export const DELETE_REMINDER = 'DELETE_REMINDER'

export const DELETE_REMINDERS = 'DELETE_REMINDERS'

export interface CreateReminderData {
  text: string
  date: Date
  city: string
  color: string
}

export interface CreateReminderAction {
  type: typeof CREATE_REMINDER
  payload: RemindersState
}

export interface EditReminderAction {
  type: typeof EDIT_REMINDER
  payload: RemindersState
}

export interface DeleteReminderAction {
  type: typeof DELETE_REMINDER
  payload: RemindersState
}

export interface DeleteRemindersAction {
  type: typeof DELETE_REMINDERS
  payload: RemindersState
}

export type RemindersActionTypes =
  | CreateReminderAction
  | EditReminderAction
  | DeleteReminderAction
  | DeleteRemindersAction
