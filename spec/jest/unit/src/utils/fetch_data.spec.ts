import MockAdapter from 'axios-mock-adapter'
import { fetchData, api } from 'src/utils'
import { userData, MonkisApiResponse } from 'spec/jest/fixtures'
import menuApiResponse from 'spec/jest/fixtures/menu_api_response'
import { decryptCredentials } from 'src/utils/decrypt_credentials'
import { decryptMonkis } from 'src/utils/decrypt_monkis'

let mock: MockAdapter

describe('testing fetchData function', () => {
  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should return the data from api decrypted', async () => {
    mock.onGet('/menu').reply(200, menuApiResponse)
    mock.onGet('/hook').reply(200, MonkisApiResponse)

    const {
      groups,
      shortcuts: oldShortcuts,
      menus,
      credentials: encryptedCredential
    } = menuApiResponse

    const credentials = await decryptCredentials(userData, encryptedCredential)
    const shortcuts = oldShortcuts.map((shortcut) => {
      const { name, description, ...rest } = shortcut
      return { ...rest }
    })
    const monkis = await decryptMonkis(userData, MonkisApiResponse.hooks)

    const response = {
      shortcuts,
      credentials,
      monkis,
      groups,
      menus,
      successful: true,
      timestamp: 1592254160
    }

    const responseFromApi = await fetchData(userData)

    expect(responseFromApi).toStrictEqual(response)
  })
})
