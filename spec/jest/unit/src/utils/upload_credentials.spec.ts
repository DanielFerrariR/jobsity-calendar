import MockAdapter from 'axios-mock-adapter'
import {
  uploadCreateCredentials,
  uploadDeleteCredentials,
  uploadEditCredentials,
  api
} from 'src/utils'
import { userData, credentialsData, shortcutsData } from 'spec/jest/fixtures'

const credential = credentialsData[0]
const shortcut = shortcutsData[0]
let mock: MockAdapter

describe('testing upload credentials functions', () => {
  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should uploadCreateCredentials function works correctly', async () => {
    mock.onPost('/connected_credential').reply(200, {
      credential_id: shortcut.credential_id,
      shortcut_id: shortcut.id,
      successful: true
    })

    const response = await uploadCreateCredentials(userData, credential)

    expect(response).toStrictEqual({
      credential_id: shortcut.credential_id,
      shortcut_id: shortcut.id,
      successful: true
    })
  })

  it('should uploadEditCredentials function works correctly', async () => {
    mock.onPatch('/connected_credential').reply(200, {
      credential_id: shortcut.credential_id,
      shortcut_id: shortcut.id,
      successful: true
    })

    const response = await uploadEditCredentials(userData, credential, shortcut)

    expect(response).toStrictEqual({
      credential_id: shortcut.credential_id,
      shortcut_id: shortcut.id,
      successful: true
    })
  })

  it('should uploadDeleteCredentials function works correctly', async () => {
    mock.onDelete(`/credential/${credential.id}`).reply(200, {
      credential_id: shortcut.credential_id,
      shortcut_id: shortcut.id,
      successful: true
    })

    const response = await uploadDeleteCredentials(userData, credential)

    expect(response).toBe(200)
  })
})
