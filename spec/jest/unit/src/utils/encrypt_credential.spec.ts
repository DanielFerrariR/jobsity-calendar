import { encryptCredential } from 'src/utils'
import { userData, credentialsData } from 'spec/jest/fixtures'
import { decryptCredentials } from 'src/utils/decrypt_credentials'

describe('testing encrypt credential function', () => {
  const credential = credentialsData[0]

  it('should return the decrypted credential', async () => {
    const encryptedCredential = await encryptCredential(userData, credential)

    const decryptedCredential = await decryptCredentials(userData, [
      encryptedCredential
    ])

    expect(decryptedCredential[0]).toStrictEqual(credential)
  })
})
