import React from 'react'
import { AdvancedSettingsList } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'

describe('testing AdvancedSettingsList component', () => {
  const form = {
    name: '',
    description: '',
    login: '',
    password: '',
    preventClipboard: false
  }
  const extraUserParameters = [{ key: '', value: '' }]
  const extraUserParametersErrors = [{ key: false, value: false }]

  test('should snapshot works with english language', () => {
    const { container } = render(
      <AdvancedSettingsList
        form={form}
        setForm={(): void => {}}
        extraUserParameters={extraUserParameters}
        setExtraUserParameters={(): void => {}}
        extraUserParametersErrors={extraUserParametersErrors}
        setExtraUserParametersErrors={(): void => {}}
      />
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <AdvancedSettingsList
        form={form}
        setForm={(): void => {}}
        extraUserParameters={extraUserParameters}
        setExtraUserParameters={(): void => {}}
        extraUserParametersErrors={extraUserParametersErrors}
        setExtraUserParametersErrors={(): void => {}}
      />,
      {
        language: 'pt'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <AdvancedSettingsList
        form={form}
        setForm={(): void => {}}
        extraUserParameters={extraUserParameters}
        setExtraUserParameters={(): void => {}}
        extraUserParametersErrors={extraUserParametersErrors}
        setExtraUserParametersErrors={(): void => {}}
      />,
      {
        language: 'es'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <AdvancedSettingsList
        form={form}
        setForm={(): void => {}}
        extraUserParameters={extraUserParameters}
        setExtraUserParameters={(): void => {}}
        extraUserParametersErrors={extraUserParametersErrors}
        setExtraUserParametersErrors={(): void => {}}
      />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
