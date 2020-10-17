declare namespace Cypress {
  interface Chainable {
    createUser(): Chainable<import('spec/cypress/support/generate').UserData>
    userLogout(): Chainable<void>
    login(login: string, password: string): Chainable<void>
    createCredential(): Chainable<
      import('spec/cypress/support/generate').CredentialData
    >
    createCredentialWithImage(): Chainable<
      import('spec/cypress/support/generate').CredentialData
    >
    destroyDatabases(): Chainable<void>
    offline(options: boolean): Chainable<void>
    shareCredential(
      otherUser: import('spec/cypress/support/generate').UserData,
      currentUser: {
        username: string
        password: string
      }
    ): Chainable<{
      otherUserSession: import('src/store/user').UserState
      credentialId: number
    }>
    createMonki(
      extension?: string
    ): Chainable<import('spec/cypress/support/generate').MonkiData>
  }
}
