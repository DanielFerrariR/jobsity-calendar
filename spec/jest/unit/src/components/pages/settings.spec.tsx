import React from 'react'
import { Settings } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData } from 'spec/jest/fixtures'

describe('testing Settings component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(<Settings />, {
      initialState: { user: userData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Settings />, {
      initialState: { user: userData },
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Settings />, {
      initialState: { user: userData },
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Settings />, {
      initialState: { user: userData }
    })

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
