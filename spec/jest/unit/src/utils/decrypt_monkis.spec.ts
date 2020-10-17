import { encryptMonki } from 'src/utils'
import { userData, monkisData } from 'spec/jest/fixtures'
import { decryptMonkis } from 'src/utils/decrypt_monkis'

describe('testing decrypt Monki function', () => {
  const monkis = monkisData[0]

  it('should return the decrypted Monki', async () => {
    const encryptedMonki = await encryptMonki(userData, monkis)

    const decryptedMonki = await decryptMonkis(userData, [encryptedMonki])

    expect(decryptedMonki[0]).toStrictEqual(monkis)
  })

  it('should return the original parameter if the decrypt function fails', async () => {
    const failingMonki = {
      id: 1,
      name: 'string',
      version: 'string',
      extension: 'string',
      contents: 'string',
      created_at: 'string',
      updated_at: 'string',
      enc_pwd: 'string',
      tags: [],
      user_id: 1,
      user: { id: 1, email: 'string', username: 'string' }
    }

    const decryptedMonki = await decryptMonkis(userData, [failingMonki])

    expect(decryptedMonki[0]).toStrictEqual(failingMonki)
  })
})
