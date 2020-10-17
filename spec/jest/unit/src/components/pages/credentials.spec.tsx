import React from 'react'
import { Credentials } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, shortcutsData } from 'spec/jest/fixtures'

describe('testing Credentials component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(<Credentials />, {
      initialState: { user: userData, shortcuts: shortcutsData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Credentials />, {
      initialState: { user: userData, shortcuts: shortcutsData },
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Credentials />, {
      initialState: { user: userData, shortcuts: shortcutsData },
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Credentials />, {
      initialState: { user: userData, shortcuts: shortcutsData }
    })

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
