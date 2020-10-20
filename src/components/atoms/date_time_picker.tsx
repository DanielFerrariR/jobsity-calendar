import React from 'react'
import {
  DateTimePicker as OldDateTimePicker,
  DateTimePickerProps
} from '@material-ui/pickers'
import { MuiThemeProvider } from '@material-ui/core'
import { datePickerTheme } from 'src/styles'

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  return (
    <MuiThemeProvider theme={datePickerTheme}>
      <OldDateTimePicker {...props} />
    </MuiThemeProvider>
  )
}

export default DateTimePicker
