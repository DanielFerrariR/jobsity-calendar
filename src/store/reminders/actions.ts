import { nanoid } from 'nanoid'
import {
  RemindersState,
  CreateReminderData,
  CREATE_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS,
  CreateReminderAction,
  EditReminderAction,
  DeleteReminderAction,
  DeleteRemindersAction
} from './types'

const createReminder = (
  reminders: RemindersState,
  data: CreateReminderData
): CreateReminderAction => {
  const newReminders = [...reminders]
  const newReminder = {
    id: nanoid(),
    text: data.text,
    date: data.date,
    city: data.city,
    color: data.color
  }

  newReminders.push(newReminder)

  return {
    type: CREATE_REMINDER,
    payload: newReminders
  }
}

const editReminder = (
  reminders: RemindersState,
  data: RemindersState[0]
): EditReminderAction => {
  const newReminders = reminders.map((each) => {
    if (each.id === data.id) {
      return data
    }

    return each
  })

  return {
    type: EDIT_REMINDER,
    payload: newReminders
  }
}

const deleteReminder = (
  reminders: RemindersState,
  id: string
): DeleteReminderAction => {
  const newReminders = reminders.filter((element) => element.id !== id)

  return {
    type: DELETE_REMINDER,
    payload: newReminders
  }
}

const deleteReminders = (
  reminders: RemindersState,
  removeReminders: RemindersState
): DeleteRemindersAction => {
  const ids = removeReminders.map((each) => each.id)
  const newReminders = []

  for (const reminder of reminders) {
    if (!ids.includes(reminder.id)) {
      newReminders.push(reminder)
    }
  }

  return {
    type: DELETE_REMINDERS,
    payload: newReminders
  }
}

export { createReminder, editReminder, deleteReminder, deleteReminders }
