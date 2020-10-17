import React from 'react'
import { SecuritySettings } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing SecuritySettings component', () => {
  const form = {
    username: '',
    userEmail: '',
    firstName: '',
    lastName: '',
    sessionExpirationTime: ''
  }

  test('should snapshot works with english language', () => {
    const { container } = render(
      <SecuritySettings form={form} setForm={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <SecuritySettings form={form} setForm={(): void => {}} />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <SecuritySettings form={form} setForm={(): void => {}} />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <SecuritySettings form={form} setForm={(): void => {}} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
