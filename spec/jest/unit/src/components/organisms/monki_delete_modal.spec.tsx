import React from 'react'
import { MonkiDeleteModal } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing MonkiDeleteModal component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <MonkiDeleteModal open setOpen={(): void => {}} monkiId={0} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <MonkiDeleteModal open setOpen={(): void => {}} monkiId={0} />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <MonkiDeleteModal open setOpen={(): void => {}} monkiId={0} />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <MonkiDeleteModal open setOpen={(): void => {}} monkiId={0} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
