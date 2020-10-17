import React from 'react'
import { ShareUserModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, shortcutsData, credentialsData } from 'spec/jest/fixtures'

describe('testing ShareUserModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <ShareUserModal open setOpen={(): void => {}} credentialId={3737} />,
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
      <ShareUserModal open setOpen={(): void => {}} credentialId={3737} />,
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
      <ShareUserModal open setOpen={(): void => {}} credentialId={3737} />,
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
      <ShareUserModal open setOpen={(): void => {}} credentialId={3737} />,
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
