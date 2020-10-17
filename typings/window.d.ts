import { compose } from 'redux'
import store from 'src/utils/redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    Cypress?: unknown
    store?: typeof store
    ipcRenderer?: any
    File?: any
  }
}
