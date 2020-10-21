import React from 'react'
import {
  DateTimePicker as OldDateTimePicker,
  DateTimePickerProps,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import { MuiThemeProvider } from '@material-ui/core'
import { datePickerTheme } from 'src/styles'
import TextField from './text_field'

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  return (
    <MuiThemeProvider theme={datePickerTheme}>
      {process.env.NODE_ENV === 'test' || window.Cypress ? (
        <KeyboardDateTimePicker
          format="yyyy/MM/dd HH:mm"
          TextFieldComponent={TextField}
          {...props}
        />
      ) : (
        <OldDateTimePicker format="yyyy/MM/dd HH:mm" {...props} />
      )}
    </MuiThemeProvider>
  )
}

export default DateTimePicker
