import React from 'react'
import { Login } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing Login component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(<Login />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Login />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Login />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Login />)

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
