import React from 'react'
import { AccountSettings } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing AccountSettings component', () => {
  const form = {
    username: '',
    userEmail: '',
    firstName: '',
    lastName: '',
    sessionExpirationTime: ''
  }
  const errors = {
    userEmail: false,
    firstName: false,
    lastName: false
  }

  test('should snapshot works with english language', () => {
    const { container } = render(
      <AccountSettings
        form={form}
        setForm={(): void => {}}
        errors={errors}
        setErrors={(): void => {}}
      />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <AccountSettings
        form={form}
        setForm={(): void => {}}
        errors={errors}
        setErrors={(): void => {}}
      />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <AccountSettings
        form={form}
        setForm={(): void => {}}
        errors={errors}
        setErrors={(): void => {}}
      />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <AccountSettings
        form={form}
        setForm={(): void => {}}
        errors={errors}
        setErrors={(): void => {}}
      />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
