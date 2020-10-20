import React from 'react'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import {
  MuiThemeProvider,
  CssBaseline,
  StylesProvider
} from '@material-ui/core'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { theme } from 'src/styles'
import { GenerateId } from 'jss'
import { rootReducer } from 'src/store'
import { createMemoryHistory } from 'history'
import { RemindersState } from 'src/store/reminders'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-US'

interface Options {
  initialState?: {
    reminders?: RemindersState
  }
  route?: string
  rtlOptions?: RenderOptions
}

const render = (ui: React.ReactElement, options?: Options): RenderResult => {
  let store = createStore(rootReducer)
  const route = '/'
  let history = createMemoryHistory({
    initialEntries: [route]
  })
  let rest = {}

  if (options) {
    const {
      initialState: initialStateOptions,
      route: routeOptions,
      ...rtlOptions
    } = options

    if (initialStateOptions) {
      store = createStore(rootReducer, initialStateOptions)
    }
    if (routeOptions) {
      history = createMemoryHistory({
        initialEntries: [routeOptions]
      })
    }

    rest = rtlOptions
  }

  const generateClassName: GenerateId = (rule, styleSheet) =>
    `${styleSheet?.options.classNamePrefix}-${rule.key}`
  const Wrapper: React.FC = ({ children }) => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
        <Provider store={store}>
          <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
              </MuiThemeProvider>
            </StylesProvider>
          </Router>
        </Provider>
      </MuiPickersUtilsProvider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rest })
}

export * from '@testing-library/react'

export { render }
