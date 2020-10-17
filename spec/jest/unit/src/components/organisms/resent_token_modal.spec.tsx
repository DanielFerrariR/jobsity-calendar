import React from 'react'
import { ResentTokenModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing ResentTokenModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <ResentTokenModal open setOpen={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <ResentTokenModal open setOpen={(): void => {}} />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <ResentTokenModal open setOpen={(): void => {}} />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <ResentTokenModal open setOpen={(): void => {}} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
