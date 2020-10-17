describe('testing login page', () => {
  it('should login with an existing user and stay logged after a refresh', () => {
    cy.createUser().then((userData) => {
      cy.visit('/login')

      cy.findByTestId('login').fill(userData.username)
      cy.findByTestId('password').fill(userData.password)
      cy.findByTestId('submit-button').click()

      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/credentials`
      )

      cy.findByTestId('paper-credentials-welcome').contains(
        /Thanks for signing in. We are very happy to have you among us./
      )

      cy.visit('/credentials')

      cy.findByTestId('paper-credentials-welcome').contains(
        /Thanks for signing in. We are very happy to have you among us./
      )
    })
  })

  it('should not login with an inexistent user', () => {
    cy.visit('/login')

    cy.findByTestId('login').fill('user_inexistent')
    cy.findByTestId('password').fill('user_inexistent')
    cy.findByTestId('submit-button').click()

    cy.findByTestId('modal-message').contains(/Incorrect user or password./)
  })

  it('should verify offline modal', () => {
    cy.visit('/login')

    cy.offline(true)

    cy.findByTestId('login').fill('user_inexistent')
    cy.findByTestId('password').fill('user_inexistent')
    cy.findByTestId('submit-button').click()

    cy.findByTestId('modal-message').contains(/Failed to connect to server./)
  })
})
