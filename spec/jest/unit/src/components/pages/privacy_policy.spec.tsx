import React from 'react'
import { PrivacyPolicy } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing PrivacyPolicy component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<PrivacyPolicy />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<PrivacyPolicy />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<PrivacyPolicy />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<PrivacyPolicy />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
