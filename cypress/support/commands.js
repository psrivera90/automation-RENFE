import commonFunctions from "../functions/commonFunctions"
import homeRenfe from "../pages/homeRenfe"

Cypress.Commands.add('visitRenfe', () => {
  cy.fixture('dataRenfe').then((data) => {
    cy.visit(data.Home)
    cy.title().should('include', data.Title)
    commonFunctions.clickOn(homeRenfe.selectors.acceptCookies)
  })
}) 