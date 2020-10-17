import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { EditCredential } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData, credentialsData, shortcutsData } from 'spec/jest/fixtures'
import { Route } from 'react-router-dom'
import { api } from 'src/utils'

let mockApi: MockAdapter

describe('testing EditCredential component', () => {
  beforeEach(() => {
    mockApi = new MockAdapter(api)
  })

  afterEach(() => {
    mockApi.restore()
  })

  test('should snapshot works with english language', async () => {
    mockApi.onGet('/credential/15/view_file').reply(200, {
      message: 'No file attached',
      sucessful: false
    })

    const { container } = render(
      <Route exact path="/front/credential/:id" component={EditCredential} />,
      {
        initialState: {
          user: userData,
          shortcuts: shortcutsData,
          credentials: credentialsData
        },
        route: '/front/credential/15'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', async () => {
    mockApi.onGet('/credential/15/view_file').reply(200, {
      message: 'No file attached',
      sucessful: false
    })

    const { container } = render(
      <Route exact path="/front/credential/:id" component={EditCredential} />,
      {
        initialState: {
          user: userData,
          shortcuts: shortcutsData,
          credentials: credentialsData
        },
        language: 'pt',
        route: '/front/credential/15'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', async () => {
    mockApi.onGet('/credential/15/view_file').reply(200, {
      message: 'No file attached',
      sucessful: false
    })

    const { container } = render(
      <Route exact path="/front/credential/:id" component={EditCredential} />,
      {
        initialState: {
          user: userData,
          shortcuts: shortcutsData,
          credentials: credentialsData
        },
        language: 'es',
        route: '/front/credential/15'
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    mockApi.onGet('/credential/15/view_file').reply(200, {
      message: 'No file attached',
      sucessful: false
    })

    const { container } = render(
      <Route exact path="/front/credential/:id" component={EditCredential} />,
      {
        initialState: {
          user: userData,
          shortcuts: shortcutsData,
          credentials: credentialsData
        },
        route: '/front/credential/15'
      }
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
