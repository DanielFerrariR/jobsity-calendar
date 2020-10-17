import { encryptCredential, encryptMonki } from 'src/utils'
import { userData, credentialsData, monkisData } from 'spec/jest/fixtures'
import { decryptParams } from 'src/utils/decrypt_params'

describe('testing decrypt params function', () => {
  const credential = credentialsData[0]
  const monki = monkisData[0]

  it('should return the decrypted params', async () => {
    const encryptedCredential = await encryptCredential(userData, credential)
    const encryptedMonki = await encryptMonki(userData, monki)

    const response = {
      credentials: [credential],
      monkis: [monki]
    }

    const decryptedParams = await decryptParams(
      userData,
      [encryptedCredential],
      [encryptedMonki]
    )

    expect(decryptedParams).toStrictEqual(response)
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

    const response = {
      credentials: [failingCredential],
      monkis: [failingMonki]
    }

    const decryptedParams = await decryptParams(
      userData,
      [failingCredential],
      [failingMonki]
    )

    expect(decryptedParams).toStrictEqual(response)
  })
})
