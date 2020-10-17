import React from 'react'
import { addDecorator } from '@storybook/react'
import {
  MuiThemeProvider,
  CssBaseline,
  StylesProvider
} from '@material-ui/core'
import { theme } from '../src/styles'

if (process.env.NODE_ENV !== 'test') {
  require('typeface-roboto')

  addDecorator((Story) => (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </MuiThemeProvider>
  ))
} else {
  const generateClassName = (rule, styleSheet) =>
    `${styleSheet?.options.classNamePrefix}-${rule.key}`

  addDecorator((Story) => (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </MuiThemeProvider>
    </StylesProvider>
  ))
}
