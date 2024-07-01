const commonFunctions = require("../functions/commonFunctions")
class homeRenfePage {

    constructor() {
        this.selectors = {
            acceptCookies : '#onetrust-accept-btn-handler', 
            origin : "#origin", 
            destination : "#destination", 
            calendar : "#first-input",
            calendarDay : '.lightpick__months',
            buttonAcceptDate : ".lightpick__apply-action-sub", 
            buttonSearchTicket : ".mdc-button__ripple",
            confirmationOrigin : "#stv-ida > .lugares > :nth-child(1) > :nth-child(3)",
            confirmationDestination : "#stv-ida > .lugares > :nth-child(2) > :nth-child(3)",
            dropDownOrigin: "#awesomplete_list_1",
            dropDownDestination: "#awesomplete_list_2"
        }
    }

    //This function and the next one are only used solely for the purpose of hardcoding the data and being able to move to the next pages quickly and easily.
    selectTravelHarcoding () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.origin).type(data.Origin)
            cy.get(this.selectors.dropDownOrigin).should('be.visible').click()
            cy.get(this.selectors.destination).type(data.Destination)
            cy.get(this.selectors.dropDownDestination).should('be.visible').click()
            commonFunctions.clickOn(this.selectors.calendar)

            cy.get(this.selectors.calendarDay).within(() => {
                const selectAndClickDay = (date) => {
                    cy.get('.lightpick__day')
                    .filter('.is-available')
                    .contains(date)
                    .click({force:true})
                }
                selectAndClickDay(data.Departure_date)
                selectAndClickDay(data.Return_date)
            })

            commonFunctions.clickOn(this.selectors.buttonAcceptDate)
            commonFunctions.clickOn(this.selectors.buttonSearchTicket)
        })      
    }

    confirmationTravelHarcoding() {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationOrigin).should('be.visible').and('contain.text', data.Origin)
            cy.get(this.selectors.confirmationDestination).should('be.visible').and('contain.text', data.Destination)
        })
    }
    
    selectTravelExamples (origin, destination, departureDate, returnDate) {
        cy.get(this.selectors.origin).type(origin)
        cy.get(this.selectors.dropDownOrigin).should('be.visible').click()
        cy.get(this.selectors.destination).type(destination)
        cy.get(this.selectors.dropDownDestination).should('be.visible').click()

        commonFunctions.clickOn(this.selectors.calendar)

        cy.get(this.selectors.calendarDay).within(() => {
            const selectAndClickDay = (date) => {
                cy.get('.lightpick__day')
                .filter('.is-available')
                .contains(date)
                .click({force:true})
            }
            selectAndClickDay(departureDate)
            selectAndClickDay(returnDate)
        })

        commonFunctions.clickOn(this.selectors.buttonAcceptDate)
        commonFunctions.clickOn(this.selectors.buttonSearchTicket)
    }

    confirmationTravelExamples (origin, destination) {
        cy.get(this.selectors.confirmationOrigin).should('be.visible').and('contain.text', origin)
        cy.get(this.selectors.confirmationDestination).should('be.visible').and('contain.text', destination)
    }

    searchTicketButton () {
        commonFunctions.clickOn(this.selectors.buttonSearchTicket)
    }
}

module.exports = new homeRenfePage();