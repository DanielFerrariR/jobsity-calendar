import { shareCredential, api } from 'src/utils'
import MockAdapter from 'axios-mock-adapter'
import { userData, shortcutsData, credentialsData } from 'spec/jest/fixtures'

describe('testing shareCredential function', () => {
  const credential = credentialsData[0]
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should throw no errors', async () => {
    const sharedUsers = [{ id: 0, username: userData.username, admin: true }]

    mock.onPost('/user/public_keys').reply(200, {
      successful: true,
      users: [
        {
          username: userData.username,
          public_key: userData.public_key
        }
      ]
    })
    mock.onPost('/connected_credential/share').reply(200)

    const response = await shareCredential(
      userData,
      sharedUsers,
      credential.auth_parameters.password,
      shortcutsData[0].credential_id,
      shortcutsData[0].id
    )

    expect(response).toBe(undefined)
  })
})
