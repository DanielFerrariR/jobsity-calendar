import { weatherAPI } from 'src/services'
import { nanoid } from 'nanoid'
import { isSameDay } from 'src/utils'
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
  DeleteRemindersAction,
  WeatherForecastResponse
} from './types'

const createReminder = async (
  reminders: RemindersState,
  data: CreateReminderData
): Promise<CreateReminderAction> => {
  const newReminders = [...reminders]

  const response = await weatherAPI
    .get<WeatherForecastResponse>(
      `/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${data.city}&days=10`
    )
    .catch(() => {})

  let weather = null

  if (response) {
    const forecasts = response.data.forecast.forecastday

    for (const forecast of forecasts) {
      if (isSameDay(new Date(forecast.date), data.date)) {
        weather = forecast.day.condition
      }
    }
  }

  const newReminder = {
    id: nanoid(),
    text: data.text,
    date: data.date,
    city: data.city,
    color: data.color,
    weather
  }

  newReminders.push(newReminder)

  return {
    type: CREATE_REMINDER,
    payload: newReminders
  }
}

const editReminder = async (
  reminders: RemindersState,
  data: RemindersState[0]
): Promise<EditReminderAction> => {
  const response = await weatherAPI
    .get<WeatherForecastResponse>(
      `/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${data.city}&days=10`
    )
    .catch(() => {})

  let weather: RemindersState[0]['weather'] = null

  if (response) {
    const forecasts = response.data.forecast.forecastday

    for (const forecast of forecasts) {
      if (isSameDay(new Date(forecast.date), data.date)) {
        weather = forecast.day.condition
      }
    }
  }

  const newReminders = reminders.map((each) => {
    if (each.id === data.id) {
      return { ...data, weather }
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
