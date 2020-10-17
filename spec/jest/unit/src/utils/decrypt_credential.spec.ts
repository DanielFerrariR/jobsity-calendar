import { encryptCredential } from 'src/utils'
import { userData, credentialsData } from 'spec/jest/fixtures'
import { decryptCredentials } from 'src/utils/decrypt_credentials'

describe('testing decrypt credential function', () => {
  const credential = credentialsData[0]

  it('should return the decrypted credential', async () => {
    const encryptedCredential = await encryptCredential(userData, credential)

    const decryptedCredential = await decryptCredentials(userData, [
      encryptedCredential
    ])

    expect(decryptedCredential[0]).toStrictEqual(credential)
  })

  it('should return the original parameter if the decrypt function fails', async () => {
    const failingCredential = {
      id: 1,
      name: 'teste',
      description: 'teste2',
      identifier: 'teste',
      last_reset_at: null,
      prevent_clipboard: false,
      administered: true,
      encrypted: true,
      auth_parameters: {
        password: 'teste4'
      },
      user_parameters: { user: 'daniel' },
      system_name: null,
      system_parameters: null,
      encrypted_credential_id: 0,
      encrypted_credential_status: 'enabled',
      sharing_users: [{ username: 'daniel', admin: true }]
    }

    const decryptedCredential = await decryptCredentials(userData, [
      failingCredential
    ])

    expect(decryptedCredential[0]).toStrictEqual(failingCredential)
  })
})
