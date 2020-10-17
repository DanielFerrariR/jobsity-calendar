import React from 'react'
import { TwoFactorSettingsModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData } from 'spec/jest/fixtures'

describe('testing TwoFactorSettingsModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <TwoFactorSettingsModal open setOpen={(): void => {}} />,
      {
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <TwoFactorSettingsModal open setOpen={(): void => {}} />,
      {
        language: 'pt',
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <TwoFactorSettingsModal open setOpen={(): void => {}} />,
      {
        language: 'es',
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <TwoFactorSettingsModal open setOpen={(): void => {}} />,
      {
        initialState: { user: userData }
      }
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
