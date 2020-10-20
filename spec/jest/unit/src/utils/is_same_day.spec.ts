import { isSameDay } from 'src/utils'

describe('testing isSameDay function', () => {
  it('should return true for equal dates', () => {
    const date = new Date('December 17, 1995 03:24:00')

    expect(isSameDay(date, date)).toBe(true)
  })

  it('should return false for different dates', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const now = new Date()

    expect(isSameDay(date, now)).toBe(false)
  })
})
