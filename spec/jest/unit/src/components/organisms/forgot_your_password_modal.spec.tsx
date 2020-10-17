import React from 'react'
import { ForgotYourPasswordModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing ForgotYourPasswordModal component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should snapshot works with english language', () => {
    const { container } = render(
      <ForgotYourPasswordModal open setOpen={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <ForgotYourPasswordModal open setOpen={(): void => {}} />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <ForgotYourPasswordModal open setOpen={(): void => {}} />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <ForgotYourPasswordModal open setOpen={(): void => {}} />
    )

    jest.useRealTimers()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
