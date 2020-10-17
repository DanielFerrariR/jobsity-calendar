import React from 'react'
import { CredentialsWelcome } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, shortcutsData } from 'spec/jest/fixtures'

describe('testing CredentialsWelcome component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<CredentialsWelcome />, {
      initialState: {
        user: userData,
        shortcuts: shortcutsData
      }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<CredentialsWelcome />, {
      language: 'pt',
      initialState: {
        user: userData,
        shortcuts: shortcutsData
      }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<CredentialsWelcome />, {
      language: 'es',
      initialState: {
        user: userData,
        shortcuts: shortcutsData
      }
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<CredentialsWelcome />, {
      initialState: {
        user: userData,
        shortcuts: shortcutsData
      }
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
