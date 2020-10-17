import { encryptMonki } from 'src/utils'
import { userData, monkisData } from 'spec/jest/fixtures'
import { decryptMonkis } from 'src/utils/decrypt_monkis'

describe('testing encrypt monki function', () => {
  const Monkis = monkisData[0]

  it('should return the decrypted Monkis', async () => {
    const encryptedMonki = await encryptMonki(userData, Monkis)

    const decryptedMonkis = await decryptMonkis(userData, [encryptedMonki])

    expect(decryptedMonkis[0]).toStrictEqual(Monkis)
  })
})
