class homeRenfe {

    constructor() {
        this.selectors = {
            acceptCookies : '#onetrust-accept-btn-handler', 
            origin : "#origin", 
            destination : "#destination", 
            calendar : "#first-input",
            calendarDay : ".lightpick__days",
            buttonAcceptDate : ".lightpick__apply-action-sub", 
            buttonSearchTicket : ".mdc-button__ripple",
            confirmationOrigin : "#stv-ida > .lugares > :nth-child(1) > :nth-child(3)",
            confirmationDestination : "#stv-ida > .lugares > :nth-child(2) > :nth-child(3)",
            dropDownOrigin: "#awesomplete_list_1",
            dropDownDestination: "#awesomplete_list_2"
        }
    }

    clickOn(selector) {
        cy.get(selector).click({force: true})
    }

    selectTravel () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.origin).type(data.Origin)
            cy.get(this.selectors.dropDownOrigin).should('be.visible').click()
            cy.get(this.selectors.destination).type(data.Destination)
            cy.get(this.selectors.dropDownDestination).should('be.visible').click()
            cy.get(this.selectors.calendar).click()
            cy.get(this.selectors.calendarDay).should('be.visible').contains(data.Departure_date).click({force:true})
            cy.get(this.selectors.calendarDay).contains(data.Return_date).click({force:true})
            cy.get(this.selectors.buttonAcceptDate).click({force:true})
            cy.get(this.selectors.buttonSearchTicket).should('be.visible').click({force:true})
        })      
    } 

    searchTicketButton () {
        this.clickOn(this.selectors.buttonSearchTicket)
    }

    confirmationTravel() {
        cy.fixture('dataRenfe').then((data) => {
            cy.wait(3000)
            cy.get(this.selectors.confirmationOrigin).should('be.visible').contains(data.Origin)
            cy.wait(3000)
            cy.get(this.selectors.confirmationDestination).should('be.visible').contains(data.Destination)
        })
    }
}

module.exports = new homeRenfe();