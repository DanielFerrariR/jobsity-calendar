import React from 'react'
import { Welcome } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing Welcome component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<Welcome />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Welcome />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Welcome />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Welcome />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
