import React from 'react'
import { Register } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing Register component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<Register />, {})

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Register />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Register />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Register />, {
      language: 'es'
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
