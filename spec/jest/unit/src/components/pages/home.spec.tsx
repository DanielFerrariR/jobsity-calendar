import React from 'react'
import { Home } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing Home component', () => {
  test('should snapshot works', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Home />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
