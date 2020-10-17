describe('testing not found page', () => {
  it('should go to login page', () => {
    cy.visit('/404')

    cy.findByTestId('login-link').click()

    cy.location('href').should('eq', `${Cypress.config().baseUrl}/login`)
  })
})
