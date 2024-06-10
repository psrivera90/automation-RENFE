import homeRenfe from "../pages/homeRenfe"

Cypress.Commands.add('visitRenfe', () => {
  cy.fixture('dataRenfe').then((data) => {
    cy.visit(data.Home)
    cy.title().should('include', data.Title)
    homeRenfe.clickOn(homeRenfe.selectors.acceptCookies)
  })
}) 