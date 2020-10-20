import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from 'src/store'

const replacer = (_key: string, value: any) =>
  value instanceof Date ? value.toISOString() : value

const reviver = (_key: string, value: any) =>
  typeof value === 'string' &&
  value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ? new Date(value)
    : value

const encode = (toDeshydrate: any) => JSON.stringify(toDeshydrate, replacer)

const decode = (toRehydrate: any) => JSON.parse(toRehydrate, reviver)

const persistConfig = {
  key: 'root',
  storage,
  transforms: [createTransform(encode, decode)]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

const persistor = persistStore(store as any)

export { persistor, store }
