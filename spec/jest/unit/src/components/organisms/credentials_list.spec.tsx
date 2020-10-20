import React from 'react'
import { CredentialsList } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, shortcutsData, credentialsData } from 'spec/jest/fixtures'

describe('testing CredentialsList component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(
      <CredentialsList listCredentials={credentialsData} />,
      {
        initialState: {
          user: userData,
          credentials: credentialsData,
          shortcuts: shortcutsData
        }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <CredentialsList listCredentials={credentialsData} />,
      {
        language: 'pt',
        initialState: {
          user: userData,
          credentials: credentialsData,
          shortcuts: shortcutsData
        }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <CredentialsList listCredentials={credentialsData} />,
      {
        language: 'es',
        initialState: {
          user: userData,
          credentials: credentialsData,
          shortcuts: shortcutsData
        }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <CredentialsList listCredentials={credentialsData} />,
      {
        initialState: {
          user: userData,
          credentials: credentialsData,
          shortcuts: shortcutsData
        }
      }
    )

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})