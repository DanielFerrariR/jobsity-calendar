import { UserData, MonkiData } from 'spec/cypress/support/generate'

describe('testing monkis page', () => {
  beforeEach(() => {
    cy.createUser().as('currentUser')

    cy.get<UserData>('@currentUser').then((currentUser) => {
      cy.visit('/login')

      cy.login(currentUser.username, currentUser.password)

      cy.findByTestId('button-news-modal-close').click()
    })
  })

  it('should display a welcome page if no monki was created', () => {
    cy.findByTestId('header-menu').click()
    cy.findByTestId('menuitem-monkis').click()
    cy.findByTestId('paper-monkis-welcome')
  })

  it('should show monkis list if has at least one monki', () => {
    cy.findByTestId('header-menu').click()
    cy.findByTestId('menuitem-monkis').click()
    cy.createMonki()
    cy.findByTestId('paper-monki-0')
  })

  it('should show modal with the monki code', () => {
    cy.findByTestId('header-menu').click()
    cy.findByTestId('menuitem-monkis').click()
    cy.createMonki().as('currentMonki')
    cy.get<MonkiData>('@currentMonki').then((currentMonki) => {
      cy.findByTestId('button-monki-show-code-0').click()
      cy.get('.ace_content').contains(currentMonki.contents)
    })
  })

  it('should filter monkis', () => {
    cy.findByTestId('header-menu').click()
    cy.findByTestId('menuitem-monkis').click()
    cy.createMonki()
    cy.createMonki('sh')

    cy.findByTestId('iconbutton-filter-extension')
    cy.findByTestId('iconbutton-filter-extension').click()
    cy.findByTestId('box-monki-extension-0').contains(/JS/)
    cy.findByTestId('iconbutton-filter-extension').click()
    cy.findByTestId('box-monki-extension-0').contains(/SH/)
  })

  it('should help button show monkis help panel', () => {
    cy.findByTestId('header-menu').click()
    cy.findByTestId('menuitem-monkis').click()
    cy.createMonki()
    cy.findByTestId('iconButton-monkis-help-button').click()
    cy.findByTestId('paper-monkis-welcome')
  })
})
