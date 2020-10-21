import { WeatherForecastData } from 'spec/cypress/fixtures'

describe('testing home page', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.server()
    cy.route({
      method: 'GET',
      url: /\/forecast/,
      response: WeatherForecastData
    })
  })

  it('go to the previous month', () => {
    cy.findByTestId('calendar-typography-date').contains(/October 2020/)

    cy.findByTestId('calendar-button-back').click()

    cy.findByTestId('calendar-typography-date').contains(/September 2020/)
  })

  it('go to the next month', () => {
    cy.findByTestId('calendar-typography-date').contains(/October 2020/)

    cy.findByTestId('calendar-button-forward').click()

    cy.findByTestId('calendar-typography-date').contains(/November 2020/)
  })

  it('go to the current month', () => {
    cy.findByTestId('calendar-typography-date').contains(/October 2020/)

    cy.findByTestId('calendar-button-back').click()

    cy.findByTestId('calendar-button-back').click()

    cy.findByTestId('calendar-button-back').click()

    cy.findByTestId('calendar-button-set-today').click()

    cy.findByTestId('calendar-typography-date').contains(/October 2020/)
  })

  it('open previous and next month days reminder list', () => {
    cy.findByTestId('calendar-past-30').click()

    cy.findByTestId('modal').should('exist')

    cy.findByTestId('list-reminders-button-close').click()

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('modal').should('not.exist')

    cy.findByTestId('calendar-future-1').click()

    cy.findByTestId('modal').should('exist')

    cy.findByTestId('list-reminders-button-close').click()

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('modal').should('not.exist')
  })

  it('should show the first reminder and a text with the current reminder count when are more than 3 reminders on a date', () => {
    cy.createReminder().then(() => {
      cy.createReminder().then(() => {
        cy.createReminder().then(() => {
          cy.createReminder().then(() => {
            cy.findByTestId('reminder-card-current-20-extra').contains(/3 more/)
          })
        })
      })
    })
  })

  it('should create a reminder', () => {
    cy.createReminder().then(() => {
      cy.findByTestId('reminder-card-current-20-0').contains(/Remember this/)
      cy.findByTestId('calendar-current-20').click()
      cy.findByTestId('list-reminders-typography-list-item-hour-0').contains(
        /08:40/
      )
      cy.findByTestId('list-reminders-typography-list-item-text-0').contains(
        /Remember this/
      )

      cy.findByTestId('list-reminders-icon-button-edit-0').click()

      cy.findByTestId('edit-reminder-box-pick-color-5').should(
        'have.css',
        'border',
        '3px solid rgb(0, 0, 0)'
      )
      // cy.findByTestId('edit-reminder-textfield-text').contains(/Remember this/)
      // cy.findByTestId('edit-reminder-textfield-date').contains(
      //   /2020\/10\/20 08:40/
      // )
      // cy.findByTestId('edit-reminder-textfield-city').contains(/Sao Paulo/)
    })
  })

  it('should edit a reminder of a day', () => {
    cy.createReminder().then(() => {
      cy.findByTestId('calendar-current-20').click()
      cy.findByTestId('list-reminders-icon-button-edit-0').click()
      cy.findByTestId('edit-reminder-box-pick-color-4').click()
      cy.findByTestId('edit-reminder-textfield-text').fill('Remember this2')
      cy.findByTestId('edit-reminder-textfield-date').fill('2020/10/21 08:40')
      cy.findByTestId('edit-reminder-textfield-city').fill('Rio de Janeiro')
      cy.findByTestId('edit-reminder-button-submit').click()
      cy.findByTestId('calendar-current-21').click()
      cy.findByTestId('list-reminders-typography-list-item-hour-0').contains(
        /08:40/
      )
      cy.findByTestId('list-reminders-typography-list-item-text-0').contains(
        /Remember this2/
      )

      cy.findByTestId('list-reminders-icon-button-edit-0').click()

      cy.findByTestId('edit-reminder-box-pick-color-4').should(
        'have.css',
        'border',
        '3px solid rgb(0, 0, 0)'
      )
      // cy.findByTestId('edit-reminder-textfield-text').contains(/Remember this2/)
      // cy.findByTestId('edit-reminder-textfield-date').contains(
      //   /2020\/10\/21 08:40/
      // )
      // cy.findByTestId('edit-reminder-textfield-city').contains(/Rio de Janeiro/)
    })
  })

  it('should delete a reminder of a day', () => {
    cy.createReminder().then(() => {
      cy.findByTestId('calendar-current-20').click()
      cy.findByTestId('list-reminders-icon-button-delete-0').click()

      cy.findByTestId('list-reminders-typography-list-item-hour-0').should(
        'not.exist'
      )
      cy.findByTestId('list-reminders-typography-list-item-text-0').should(
        'not.exist'
      )

      cy.findByTestId('list-reminders-button-close').click()

      cy.findByTestId('reminder-card-current-20-0').should('not.exist')
    })
  })

  it('should delete all reminders of a day', () => {
    cy.createReminder().then(() => {
      cy.createReminder().then(() => {
        cy.findByTestId('calendar-current-20').click()

        cy.findByTestId('list-reminders-typography-list-item-hour-0').contains(
          /08:40/
        )
        cy.findByTestId('list-reminders-typography-list-item-text-0').contains(
          /Remember this/
        )

        cy.findByTestId('list-reminders-typography-list-item-hour-1').contains(
          /08:40/
        )
        cy.findByTestId('list-reminders-typography-list-item-text-1').contains(
          /Remember this/
        )

        cy.findByTestId('list-reminders-icon-button-delete-all').click()

        cy.findByTestId('list-reminders-typography-list-item-hour-0').should(
          'not.exist'
        )
        cy.findByTestId('list-reminders-typography-list-item-text-0').should(
          'not.exist'
        )
        cy.findByTestId('list-reminders-typography-list-item-hour-1').should(
          'not.exist'
        )
        cy.findByTestId('list-reminders-typography-list-item-text-1').should(
          'not.exist'
        )

        cy.findByTestId('list-reminders-button-close').click()

        cy.findByTestId('reminder-card-current-20-0').should('not.exist')
        cy.findByTestId('reminder-card-current-20-1').should('not.exist')
      })
    })
  })
})
