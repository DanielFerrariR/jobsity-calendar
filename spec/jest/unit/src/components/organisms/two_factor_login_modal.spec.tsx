import React from 'react'
import { TwoFactorLoginModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing TwoFactorLoginModal component', () => {
  const loginForm = {
    login: '',
    password: ''
  }

  test('should snapshot works with english language', () => {
    const { container } = render(
      <TwoFactorLoginModal
        open
        setOpen={(): void => {}}
        loginForm={loginForm}
      />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <TwoFactorLoginModal
        open
        setOpen={(): void => {}}
        loginForm={loginForm}
      />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <TwoFactorLoginModal
        open
        setOpen={(): void => {}}
        loginForm={loginForm}
      />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <TwoFactorLoginModal
        open
        setOpen={(): void => {}}
        loginForm={loginForm}
      />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
