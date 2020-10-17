import { headerBuilder } from 'src/utils'
import { userData, headerData } from 'spec/jest/fixtures'
import jwt from 'jsonwebtoken'

describe('testing headerBuilder function', () => {
  const originalJwtSign = jwt.sign

  beforeAll(() => {
    jwt.sign = jest.fn(() => headerData.Authorization.split('Bearer ')[1])
  })

  afterAll(() => {
    jwt.sign = originalJwtSign
  })

  it('should return a header structure', () => {
    const header = headerBuilder(userData)

    expect(header).toStrictEqual(headerData)
  })
})
