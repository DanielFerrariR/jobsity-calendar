import React from 'react'
import { CredentialsToCSVModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, shortcutsData, credentialsData } from 'spec/jest/fixtures'

describe('testing CredentialsToCSVModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <CredentialsToCSVModal open setOpen={(): void => {}} />,
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
      <CredentialsToCSVModal open setOpen={(): void => {}} />,
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
      <CredentialsToCSVModal open setOpen={(): void => {}} />,
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
      <CredentialsToCSVModal open setOpen={(): void => {}} />,
      {
        initialState: {
          user: userData,
          credentials: credentialsData,
          shortcuts: shortcutsData
        }
      }
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
