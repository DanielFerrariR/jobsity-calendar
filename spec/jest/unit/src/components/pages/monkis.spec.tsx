import React from 'react'
import { Monkis } from 'src/components/pages'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import {
  userData,
  monkisData,
  credentialsData,
  shortcutsData,
  groupsData,
  menusData
} from 'spec/jest/fixtures'

describe('testing Monkis component', () => {
  test('should snapshot works with english language', () => {
    const { container } = render(<Monkis />, {
      initialState: {
        user: userData,
        monkis: monkisData,
        credentials: credentialsData,
        shortcuts: shortcutsData,
        groups: groupsData,
        menus: menusData
      }
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(<Monkis />, {
      initialState: {
        user: userData,
        monkis: monkisData,
        credentials: credentialsData,
        shortcuts: shortcutsData,
        groups: groupsData,
        menus: menusData
      },
      language: 'pt'
    })

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(<Monkis />, {
      initialState: {
        user: userData,
        monkis: monkisData,
        credentials: credentialsData,
        shortcuts: shortcutsData,
        groups: groupsData,
        menus: menusData
      },
      language: 'es'
    })

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(<Monkis />, {
      initialState: {
        user: userData,
        monkis: monkisData,
        credentials: credentialsData,
        shortcuts: shortcutsData,
        groups: groupsData,
        menus: menusData
      }
    })

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
