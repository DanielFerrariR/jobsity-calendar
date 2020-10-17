import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import {
  setNotLoggedUser,
  setLoggedUser,
  disableTwoAuthUser,
  enableTwoAuthUser,
  setExpirationDateUser,
  createUser,
  fetchUser,
  fetchTwoAuthUser,
  updateUser,
  SET_NOT_LOGGED_USER,
  SET_LOGGED_USER,
  DISABLE_TWO_AUTH_USER,
  ENABLE_TWO_AUTH_USER,
  SET_EXPIRATION_DATE_USER,
  changePasswordUser,
  CHANGE_PASSWORD_USER,
  CREATE_USER,
  FETCH_USER,
  FETCH_TWO_AUTH_USER,
  UPDATE_USER,
  userReducer
} from 'src/store/user'
import { userData } from 'spec/jest/fixtures'
import { api, cryptWorker } from 'src/utils'

type Actions = {
  type: string
  payload: any
}[]

describe('testing user state', () => {
  let mockApi: MockAdapter
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing user actions', () => {
    beforeEach(() => {
      mockApi = new MockAdapter(api)
    })

    afterEach(() => {
      mockApi.restore()
    })

    it('should setNotLoggedUser action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setNotLoggedUser())

      const actions = store.getActions() as Actions
      const expectedPayload = { type: SET_NOT_LOGGED_USER, payload: false }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setLoggedUser action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setLoggedUser(userData))

      const actions = store.getActions() as Actions
      const expectedPayload = { type: SET_LOGGED_USER, payload: userData }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should disableTwoAuthUser action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(disableTwoAuthUser(userData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DISABLE_TWO_AUTH_USER,
        payload: { ...userData, use_two_factor_auth: false }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should enableTwoAuthUser action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(enableTwoAuthUser(userData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: ENABLE_TWO_AUTH_USER,
        payload: { ...userData, use_two_factor_auth: true }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setExpirationDateUser action works correctly', () => {
      const initialState = {}
      const store = mockStore(initialState)
      const date = '04/05/2020 17:33'

      store.dispatch(setExpirationDateUser(userData, date))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_EXPIRATION_DATE_USER,
        payload: { ...userData, expiration_date: date }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should changePasswordUser action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const form = {
        current_password: 'testecrudcredential',
        password: 'testecrudcredential',
        confirm_password: 'testecrudcredential'
      }

      mockApi.onPut('/user').reply(200)
      mockApi.onGet('/user/data_for_password_change').reply(200, {
        successful: true,
        has_angel: false
      })
      mockApi.onPost('/user/change_password').reply(200, {
        user_token: userData.user_token,
        encrypted_private_key: userData.encrypted_private_key
      })

      store.dispatch(await changePasswordUser(userData, form))

      const actions = store.getActions() as Actions
      const expectedPayload = { type: CHANGE_PASSWORD_USER, payload: userData }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createUser action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const data = {
        user: {
          username: userData.username,
          email: userData.user_email,
          first_name: userData.first_name,
          password: 'testecrudcredential',
          eula_acceptance: true
        }
      }

      mockApi.onPost('/user').reply(200, userData)

      store.dispatch(await createUser(data))

      const actions = store.getActions() as Actions

      const crypt = cryptWorker()

      const decrypter = await crypt.keysFromPassword('testecrudcredential')

      const newActions = [
        {
          ...actions[0],
          payload: {
            ...actions[0].payload,
            encrypted_user_token: await crypt.symmetricDecrypt(
              decrypter,
              userData.encrypted_user_token
            )
          }
        }
      ]

      const expectedPayload = {
        type: CREATE_USER,
        payload: {
          ...userData,
          expiration_date: '',
          encrypted_user_token: userData.user_token
        }
      }

      expect(newActions).toStrictEqual([expectedPayload])
    })

    it('should fetchUser action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const form = {
        user: {
          login: userData.username,
          password: 'testecrudcredential'
        }
      }

      mockApi.onPost('/login').reply(200, userData)

      store.dispatch(await fetchUser(form))

      const actions = store.getActions() as Actions

      const crypt = cryptWorker()

      const decrypter = await crypt.keysFromPassword('testecrudcredential')

      const newActions = [
        {
          ...actions[0],
          payload: {
            ...actions[0].payload,
            encrypted_user_token: await crypt.symmetricDecrypt(
              decrypter,
              userData.encrypted_user_token
            )
          }
        }
      ]

      const expectedPayload = {
        type: FETCH_USER,
        payload: {
          ...userData,
          expiration_date: '',
          encrypted_user_token: userData.user_token
        }
      }

      expect(newActions).toStrictEqual([expectedPayload])
    })

    it('should fetchTwoAuthUser action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const form = {
        user: {
          login: userData.username,
          password: 'testecrudcredential',
          two_factor_token: '123456'
        }
      }

      mockApi.onPost('/second_factor_login').reply(200, userData)

      store.dispatch(await fetchTwoAuthUser(form))

      const actions = store.getActions() as Actions

      const crypt = cryptWorker()

      const decrypter = await crypt.keysFromPassword('testecrudcredential')

      const newActions = [
        {
          ...actions[0],
          payload: {
            ...actions[0].payload,
            encrypted_user_token: await crypt.symmetricDecrypt(
              decrypter,
              userData.encrypted_user_token
            )
          }
        }
      ]

      const expectedPayload = {
        type: FETCH_TWO_AUTH_USER,
        payload: {
          ...userData,
          expiration_date: '',
          encrypted_user_token: userData.user_token
        }
      }

      expect(newActions).toStrictEqual([expectedPayload])
    })

    it('should updateUser action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)
      const form = {
        user: {
          first_name: 'daniel',
          last_name: 'pereira',
          email: userData.user_email,
          session_expiration_time: `${userData.session_expiration_time}`
        }
      }

      mockApi.onPut('/user').reply(200)

      store.dispatch(await updateUser(userData, form))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: UPDATE_USER,
        payload: {
          ...userData,
          first_name: form.user.first_name,
          last_name: form.user.last_name,
          user_email: form.user.email,
          session_expiration_time: Number(form.user.session_expiration_time),
          expiration_date: ''
        }
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing user reducer', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle SET_NOT_LOGGED_USER', () => {
      expect(
        userReducer(undefined, {
          type: SET_NOT_LOGGED_USER,
          payload: false
        })
      ).toStrictEqual(false)
    })

    it('should handle SET_LOGGED_USER', () => {
      expect(
        userReducer(undefined, {
          type: SET_LOGGED_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle DISABLE_TWO_AUTH_USER', () => {
      expect(
        userReducer(undefined, {
          type: DISABLE_TWO_AUTH_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle ENABLE_TWO_AUTH_USER', () => {
      expect(
        userReducer(undefined, {
          type: ENABLE_TWO_AUTH_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle SET_EXPIRATION_DATE_USER', () => {
      expect(
        userReducer(undefined, {
          type: SET_EXPIRATION_DATE_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle CHANGE_PASSWORD_USER', () => {
      expect(
        userReducer(undefined, {
          type: CHANGE_PASSWORD_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle CREATE_USER', () => {
      expect(
        userReducer(undefined, {
          type: CREATE_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle FETCH_USER', () => {
      expect(
        userReducer(undefined, {
          type: FETCH_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle FETCH_TWO_AUTH_USER', () => {
      expect(
        userReducer(undefined, {
          type: FETCH_TWO_AUTH_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })

    it('should handle UPDATE_USER', () => {
      expect(
        userReducer(undefined, {
          type: UPDATE_USER,
          payload: userData
        })
      ).toStrictEqual(userData)
    })
  })
})
