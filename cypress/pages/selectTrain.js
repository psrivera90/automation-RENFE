const commonFunctions = require("../functions/commonFunctions")
const homeRenfePage = require("./homeRenfe")

class selectTrainPage {

    constructor() {
        this.selectors = {
            selectFirstTrain : "#tren_i_1",
            selectOptionFirstTrain : "#planes-opciones_i_2 > [data-cod-tarifa='VR015']",
            selectSecondTrain : "#tren_v_1",
            selectOptionSecondTrain : "#planes-opciones_v_1 > [data-cod-tarifa='VR015']",
            selectionButton : "[style='margin: 0'] > #resumenSelected > .fluid-container > .total-slim > .rowitem2 > #btnSeleccionar",
            confirmationTrain : ".titulo"
        }
    }

    tripPage () {
        cy.clearCookies()
        cy.visitRenfe()
        homeRenfePage.selectTravelHarcoding()
        homeRenfePage.searchTicketButton()
        homeRenfePage.confirmationTravelHarcoding()
    }
    
    selectTrain () {
        cy.wait(5000)
        cy.get(this.selectors.selectFirstTrain).should('be.visible').click({force:true})
        cy.get(this.selectors.selectOptionFirstTrain).should('not.be.visible').click({force:true})
        commonFunctions.clickOn(this.selectors.selectionButton)
        cy.get(this.selectors.selectSecondTrain).should('be.visible').click({force:true})
        cy.get(this.selectors.selectOptionSecondTrain).should('not.be.visible').click({force:true})
        commonFunctions.clickOn(this.selectors.selectionButton)
    }

    confirmationTrain () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationTrain).should('be.visible').and('contain.text', data.Title_traveler)
        })
    }
}

module.exports = new selectTrainPage();