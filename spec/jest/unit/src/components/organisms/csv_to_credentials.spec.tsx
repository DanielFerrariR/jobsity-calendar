import React from 'react'
import { CsvToCredential } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing CsvToCredential component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <CsvToCredential open setOpen={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <CsvToCredential open setOpen={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <CsvToCredential open setOpen={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <CsvToCredential open setOpen={(): void => {}} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
