import configureStore from 'redux-mock-store'
import {
  setShortcutsFromApi,
  SET_SHORTCUTS_FROM_API,
  setShortcutsFromDatabase,
  SET_SHORTCUTS_FROM_DATABASE,
  deleteLocalShortcut,
  DELETE_LOCAL_SHORTCUT,
  DELETE_API_SHORTCUT,
  deleteApiShortcut,
  createLocalShortcut,
  ShortcutsState,
  CREATE_LOCAL_SHORTCUT,
  createApiShortcut,
  CREATE_API_SHORTCUT,
  editLocalShortcut,
  EDIT_LOCAL_SHORTCUT,
  editApiShortcut,
  EDIT_API_SHORTCUT,
  uploadLocalShortcut,
  UPLOAD_LOCAL_SHORTCUT,
  shortcutsReducer
} from 'src/store/shortcuts'
import { shortcutsData, dataCredentials } from 'spec/jest/fixtures'

type Actions = {
  type: string
  payload: any
}[]

describe('testing shortcuts state', () => {
  const shortcut = shortcutsData[0]
  const middlewares: [] = []
  const mockStore = configureStore(middlewares)

  describe('testing shortcuts actions', () => {
    it('should setShortcutsFromApi action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setShortcutsFromApi(shortcutsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_SHORTCUTS_FROM_API,
        payload: shortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should setShortcutsFromDatabase action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setShortcutsFromDatabase(shortcutsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: SET_SHORTCUTS_FROM_DATABASE,
        payload: shortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteLocalShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(deleteLocalShortcut(shortcut.id, shortcutsData))

      const newShorcuts = shortcutsData.map((each) => {
        if (each.id == shortcut.id) {
          return {
            ...each,
            state: 'deleted'
          }
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_LOCAL_SHORTCUT,
        payload: newShorcuts
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should deleteApiShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      const newShorcuts = shortcutsData.filter(
        (each) => each.credential_id != shortcut.credential_id
      )

      store.dispatch(
        await deleteApiShortcut(shortcut.credential_id, shortcutsData)
      )

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: DELETE_API_SHORTCUT,
        payload: newShorcuts
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createLocalShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(
        await createLocalShortcut(1, 1, dataCredentials, shortcutsData, 1)
      )

      const newLocalShortcut = {
        ...shortcut,
        id: 1,
        credential_id: 1,
        group_id: 1,
        prevent_clipboard: dataCredentials.prevent_clipboard,
        state: 'created' as ShortcutsState[0]['state']
      }
      const newShortcutsData = [...shortcutsData]

      newShortcutsData.push(newLocalShortcut)

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: CREATE_LOCAL_SHORTCUT,
        payload: newShortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should createApiShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(createApiShortcut(1, 1, dataCredentials, shortcutsData, 1))

      const newShortcut = {
        ...shortcut,
        id: 1,
        credential_id: 1,
        group_id: 1,
        prevent_clipboard: dataCredentials.prevent_clipboard
      }

      const newShortcutsData = [...shortcutsData]

      newShortcutsData.push(newShortcut)

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: CREATE_API_SHORTCUT,
        payload: newShortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editLocalShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      const newShortcut = {
        ...shortcut,
        name: dataCredentials.shortcut_name,
        description: dataCredentials.description,
        prevent_clipboard: dataCredentials.prevent_clipboard,
        state: 'edited' as ShortcutsState[0]['state']
      }

      store.dispatch(
        editLocalShortcut(dataCredentials, newShortcut, shortcutsData)
      )

      const newShortcutsData = shortcutsData.map((each) => {
        if (each.id === shortcut.id) {
          return {
            ...each,
            name: dataCredentials.shortcut_name,
            description: dataCredentials.description,
            prevent_clipboard: dataCredentials.prevent_clipboard,
            state: 'edited' as ShortcutsState[0]['state']
          }
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: EDIT_LOCAL_SHORTCUT,
        payload: newShortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should editApiShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      const newShortcut = {
        ...shortcut,
        name: dataCredentials.shortcut_name,
        description: dataCredentials.description,
        prevent_clipboard: dataCredentials.prevent_clipboard
      }

      store.dispatch(
        editApiShortcut(dataCredentials, newShortcut, shortcutsData)
      )

      const newShortcutsData = shortcutsData.map((each) => {
        if (each.id === shortcut.id) {
          return {
            ...each,
            name: dataCredentials.shortcut_name,
            description: dataCredentials.description,
            prevent_clipboard: dataCredentials.prevent_clipboard
          }
        }

        return each
      })

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: EDIT_API_SHORTCUT,
        payload: newShortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })

    it('should uploadLocalShortcut action works correctly', async () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(uploadLocalShortcut(shortcutsData))

      const actions = store.getActions() as Actions
      const expectedPayload = {
        type: UPLOAD_LOCAL_SHORTCUT,
        payload: shortcutsData
      }

      expect(actions).toStrictEqual([expectedPayload])
    })
  })

  describe('testing shortcuts reducer', () => {
    it('should return the initial state', () => {
      expect(shortcutsReducer(undefined, {} as any)).toStrictEqual(null)
    })

    it('should handle type SET_SHORTCUTS_FROM_API', () => {
      expect(
        shortcutsReducer(undefined, {
          type: SET_SHORTCUTS_FROM_API,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type SET_SHORTCUTS_FROM_DATABASE', () => {
      expect(
        shortcutsReducer(undefined, {
          type: SET_SHORTCUTS_FROM_DATABASE,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type DELETE_LOCAL_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: DELETE_LOCAL_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type DELETE_API_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: DELETE_API_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type CREATE_LOCAL_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: CREATE_LOCAL_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type CREATE_API_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: CREATE_API_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type EDIT_LOCAL_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: EDIT_LOCAL_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type EDIT_API_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: EDIT_API_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })

    it('should handle type UPLOAD_LOCAL_SHORTCUT', () => {
      expect(
        shortcutsReducer(undefined, {
          type: UPLOAD_LOCAL_SHORTCUT,
          payload: shortcutsData
        })
      ).toStrictEqual(shortcutsData)
    })
  })
})
