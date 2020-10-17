import React from 'react'
import { PasswordSettings } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData } from 'spec/jest/fixtures'

describe('testing PasswordSettings component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(<PasswordSettings />, {
      initialState: { user: userData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<PasswordSettings />, {
      language: 'pt',
      initialState: { user: userData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<PasswordSettings />, {
      language: 'es',
      initialState: { user: userData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<PasswordSettings />, {
      initialState: { user: userData }
    })

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
