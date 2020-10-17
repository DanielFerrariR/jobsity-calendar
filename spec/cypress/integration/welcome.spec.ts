describe('testing welcome page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should go to register page', () => {
    cy.findByTestId('register-button').click()
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/register`)
  })

  it('should go to login page', () => {
    cy.findByTestId('login-button').click()
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/login`)
  })

  describe('testing if language is working', () => {
    it('should english language works correctly', () => {
      cy.findByTestId('change-language-english').click()

      cy.findByTestId('register-button').contains(/Create account/)
      cy.findByTestId('login-button').contains(/Sign in/)
      cy.findByTestId('welcome-board-title').contains(
        /If you already have an account/
      )
      cy.findByTestId('welcome-board-subtitle').contains(/Sign in/)
    })

    it('should spanish language works correctly', () => {
      cy.findByTestId('change-language-spanish').click()

      cy.findByTestId('register-button').contains(/Crear una cuenta/)
      cy.findByTestId('login-button').contains(/Iniciar sesión/)
      cy.findByTestId('welcome-board-title').contains(/Si ya tienes una cuenta/)
      cy.findByTestId('welcome-board-subtitle').contains(/Iniciar sesión/)
    })

    it('should portuguese language works correctly', () => {
      cy.findByTestId('change-language-portuguese').click()

      cy.findByTestId('register-button').contains(/Criar conta/)
      cy.findByTestId('login-button').contains(/Logar/)
      cy.findByTestId('welcome-board-title').contains(
        /Se você já tem uma conta/
      )
      cy.findByTestId('welcome-board-subtitle').contains(/Logar/)
    })
  })
})
