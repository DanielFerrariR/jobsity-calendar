import React from 'react'
import { NotFound } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing NotFound component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<NotFound />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<NotFound />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<NotFound />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<NotFound />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
