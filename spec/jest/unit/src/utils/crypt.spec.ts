import { cryptWorker } from 'src/utils'
import { credentialsData, userData } from 'spec/jest/fixtures'

describe('testing crypt functions', () => {
  const credential = credentialsData[0]

  describe('should symmetricEncrypt, symmetricDecrypt and keysFromPassword functions work correctly', () => {
    it('should return a decrypted string', async () => {
      const crypt = cryptWorker()

      const encrypter = await crypt.keysFromPassword(
        credential.auth_parameters.password
      )
      const decrypter = await crypt.keysFromPassword(
        credential.auth_parameters.password
      )
      const encryptedText = await crypt.symmetricEncrypt(
        encrypter,
        credential.user_parameters.user
      )
      const decryptedText = await crypt.symmetricDecrypt(
        decrypter,
        encryptedText
      )

      expect(decryptedText).toBe(credential.user_parameters.user)
    })
  })

  describe('testing asymmetricEncrypt and asymmetricDecrypt functions', () => {
    it('should return a decrypted string', async () => {
      const crypt = cryptWorker()

      const encryptedText = await crypt.asymmetricEncrypt(
        { pvtk: userData.user_private_key },
        credential.auth_parameters.password
      )
      const decryptedText = await crypt.asymmetricDecrypt(
        { pvtk: userData.user_private_key },
        encryptedText
      )

      expect(decryptedText).toBe(credential.auth_parameters.password)
    })
  })

  describe('testing cipher and decipher functions', () => {
    it('should return a decrypted string', async () => {
      const crypt = cryptWorker()

      const encryptedText = await crypt.cipher(
        JSON.stringify(credential),
        userData.user_token
      )
      const decryptedText = await crypt.decipher(
        encryptedText,
        userData.user_token
      )

      expect(JSON.parse(decryptedText)).toStrictEqual(credential)
    })
  })
})
