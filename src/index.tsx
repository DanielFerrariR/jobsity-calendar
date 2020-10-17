import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ScrollToTop from 'src/utils/scroll_to_top'
import store from 'src/utils/redux'
import Routes from 'src/routes'
import 'typeface-roboto'
import { BrowserRouter as Router } from 'react-router-dom'

if (window.Cypress) {
  window.store = store
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
