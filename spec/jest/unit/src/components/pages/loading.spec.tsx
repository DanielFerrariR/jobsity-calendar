import React from 'react'
import { Loading } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing Loading component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<Loading />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Loading />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Loading />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Loading />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
