import React from 'react'
import { ChangeLanguage } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing ChangeLanguage component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<ChangeLanguage />)

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<ChangeLanguage />, {
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<ChangeLanguage />, {
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<ChangeLanguage />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
