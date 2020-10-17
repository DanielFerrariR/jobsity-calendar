import { formatDate, sessionDeadline, expiredDate } from 'src/utils'

describe('testing date functions', () => {
  const originalDateNow = Date.now.bind(global.Date)

  beforeAll(() => {
    global.Date.now = jest.fn(() => 1)
  })

  afterAll(() => {
    global.Date.now = originalDateNow
  })

  it('should format correctly', () => {
    const date = new Date('December 17, 1995 03:24:00')

    expect(formatDate(date)).toBe('17/12/1995 03:24')
  })

  it('should give a session Deadline of 30 minutes', () => {
    const deadline = 1800000
    const now = Date.now()
    const futureDate = new Date(now + 1800000)

    expect(sessionDeadline(deadline)).toStrictEqual(futureDate)
  })

  it('should return true if the session has expired', () => {
    const now = Date.now()
    const date = new Date(now - 1800000)

    expect(expiredDate(date)).toBe(true)
  })

  it("should return false if the session hasn't expired", () => {
    const now = Date.now()
    const date = new Date(now + 1800000)

    expect(expiredDate(date)).toBe(false)
  })
})
