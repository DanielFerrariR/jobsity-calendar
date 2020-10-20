import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ScrollToTop from 'src/utils/scroll_to_top'
import { store, persistor } from 'src/utils/redux'
import Routes from 'src/routes'
import 'typeface-roboto'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-US'
import { PersistGate } from 'redux-persist/integration/react'

if (window.Cypress) {
  window.store = store
}

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ScrollToTop />
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
