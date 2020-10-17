import React from 'react'
import { ShareUserList } from 'src/components/organisms'
import { render } from 'spec/jest/config/test_utils'
import { axe } from 'jest-axe'
import { userData } from 'spec/jest/fixtures'

describe('testing ShareUserList component', () => {
  const shareUserListForm = {
    search: ''
  }
  const shareUserListErrors = {
    search: false
  }
  const sharedUsers = [
    {
      id: 1,
      username: 'Daniel',
      admin: true
    }
  ]

  test('should snapshot works with english language', () => {
    const { container } = render(
      <ShareUserList
        shareUserListForm={shareUserListForm}
        setShareUserListForm={(): void => {}}
        shareUserListErrors={shareUserListErrors}
        setShareUserListErrors={(): void => {}}
        sharedUsers={sharedUsers}
        setSharedUsers={(): void => {}}
      />,
      {
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with portuguese language', () => {
    const { container } = render(
      <ShareUserList
        shareUserListForm={shareUserListForm}
        setShareUserListForm={(): void => {}}
        shareUserListErrors={shareUserListErrors}
        setShareUserListErrors={(): void => {}}
        sharedUsers={sharedUsers}
        setSharedUsers={(): void => {}}
      />,
      {
        language: 'pt',
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should snapshot works with spanish language', () => {
    const { container } = render(
      <ShareUserList
        shareUserListForm={shareUserListForm}
        setShareUserListForm={(): void => {}}
        shareUserListErrors={shareUserListErrors}
        setShareUserListErrors={(): void => {}}
        sharedUsers={sharedUsers}
        setSharedUsers={(): void => {}}
      />,
      {
        language: 'es',
        initialState: { user: userData }
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('should the page be accessible', async () => {
    const { container } = render(
      <ShareUserList
        shareUserListForm={shareUserListForm}
        setShareUserListForm={(): void => {}}
        shareUserListErrors={shareUserListErrors}
        setShareUserListErrors={(): void => {}}
        sharedUsers={sharedUsers}
        setSharedUsers={(): void => {}}
      />,
      {
        initialState: { user: userData }
      }
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
