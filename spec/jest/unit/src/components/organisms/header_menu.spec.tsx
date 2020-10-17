import React from 'react'
import { HeaderMenu } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData } from 'spec/jest/fixtures'

describe('testing HeaderMenu component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<HeaderMenu />, {
      initialState: { user: userData }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<HeaderMenu />, {
      initialState: { user: userData },
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<HeaderMenu />, {
      initialState: { user: userData },
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<HeaderMenu />, {
      initialState: { user: userData }
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
