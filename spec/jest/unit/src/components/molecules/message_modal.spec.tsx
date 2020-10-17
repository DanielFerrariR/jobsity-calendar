import React from 'react'
import { MessageModal } from 'src/components/molecules'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing MessageModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <MessageModal open setOpen={(): void => {}} message="Message" />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <MessageModal open setOpen={(): void => {}} message="Message" />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <MessageModal open setOpen={(): void => {}} message="Message" />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <MessageModal open setOpen={(): void => {}} message="Message" />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
