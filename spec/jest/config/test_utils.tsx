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
import { startI18n, Language } from 'src/utils'
import { UserState } from 'src/store/user'
import { MenusState } from 'src/store/menus'
import { GroupsState } from 'src/store/groups'
import { ShortcutsState } from 'src/store/shortcuts'
import { CredentialsState } from 'src/store/credentials'
import { MonkisState } from 'src/store/monkis'

interface Options {
  initialState?: {
    user?: UserState
    menus?: MenusState
    credentials?: CredentialsState
    groups?: GroupsState
    shortcuts?: ShortcutsState
    monkis?: MonkisState
  }
  route?: string
  language?: 'pt' | 'en' | 'es'
  rtlOptions?: RenderOptions
}

/**
 * Render into a container which is appended to document.body. It should be used with cleanup.
 */
const render = (ui: React.ReactElement, options?: Options): RenderResult => {
  let store = createStore(rootReducer)
  const route = '/'
  let history = createMemoryHistory({
    initialEntries: [route]
  })
  let language: Language = 'en'
  let rest = {}

  if (options) {
    const {
      initialState: initialStateOptions,
      route: routeOptions,
      language: languageOptions,
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
    if (languageOptions) {
      language = languageOptions
    }
    rest = rtlOptions
  }

  const generateClassName: GenerateId = (rule, styleSheet) =>
    `${styleSheet?.options.classNamePrefix}-${rule.key}`
  const Wrapper: React.FC = ({ children }) => {
    startI18n(language)

    return (
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
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rest })
}

export * from '@testing-library/react'

export { render }
