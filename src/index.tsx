import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ScrollToTop from 'src/utils/scroll_to_top'
import store from 'src/utils/redux'
import Routes from 'src/routes'
import 'typeface-roboto'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-US'

if (window.Cypress) {
  window.store = store
}

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Routes />
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
