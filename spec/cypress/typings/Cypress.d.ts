declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Chainable {
    createReminder(): Chainable<
      import('spec/cypress/support/commands').ReminderData
    >
  }
}
