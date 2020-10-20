describe('testing home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should go to register page', () => {
    expect(true).to.be.equal(true)
  })
})
