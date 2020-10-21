export interface ReminderData {
  text: string
  date: string
  city: string
}

Cypress.Commands.add('createReminder', () => {
  const reminderData = {
    text: 'Remember this',
    date: '2020/10/20 08:40',
    city: 'Sao Paulo'
  }

  cy.findByTestId('calendar-button-create-reminder').click()

  cy.findByTestId('create-reminder-box-pick-color-0').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )

  cy.findByTestId('create-reminder-box-pick-color-0').click()

  cy.findByTestId('create-reminder-box-pick-color-0').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )
  cy.findByTestId('create-reminder-box-pick-color-1').click()

  cy.findByTestId('create-reminder-box-pick-color-1').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )
  cy.findByTestId('create-reminder-box-pick-color-2').click()

  cy.findByTestId('create-reminder-box-pick-color-2').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )
  cy.findByTestId('create-reminder-box-pick-color-3').click()

  cy.findByTestId('create-reminder-box-pick-color-3').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )
  cy.findByTestId('create-reminder-box-pick-color-4').click()

  cy.findByTestId('create-reminder-box-pick-color-4').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )
  cy.findByTestId('create-reminder-box-pick-color-5').click()

  cy.findByTestId('create-reminder-box-pick-color-5').should(
    'have.css',
    'border',
    '3px solid rgb(0, 0, 0)'
  )

  cy.findByTestId('create-reminder-textfield-text').fill(reminderData.text)
  cy.findByTestId('create-reminder-textfield-date').fill(reminderData.date)
  cy.findByTestId('create-reminder-textfield-city').fill(reminderData.city)

  cy.findByTestId('create-reminder-button-submit')
    .click()
    .then(() => reminderData)
})
