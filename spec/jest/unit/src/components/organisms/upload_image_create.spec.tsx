import React from 'react'
import { UploadImageCreate } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { imageData } from 'spec/jest/fixtures'

describe('testing UploadImageCreate component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(
      <UploadImageCreate imageData={imageData} setImageData={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <UploadImageCreate imageData={imageData} setImageData={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <UploadImageCreate imageData={imageData} setImageData={(): void => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <UploadImageCreate imageData={imageData} setImageData={(): void => {}} />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
