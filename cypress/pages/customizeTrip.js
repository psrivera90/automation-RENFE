import dataFormPage from "./dataForm"
import homeRenfe from "./homeRenfe"

class customizeTripPage {

    constructor() {
        this.selectors = {
            continuePurchasingButton : '#submitFormaPago',
            confirmationPay : '.titulo'
        }
    }

    customizeTrip () {
        dataFormPage.travelerData()
        dataFormPage.insertCredentials()
        homeRenfe.clickOn(dataFormPage.selectors.customizeButton)
        dataFormPage.confirmationForm()
    }

    confirmationPay () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationPay).should('be.visible').contains(data.Title_pay)
        })
    }

    purchasingButton () {
        homeRenfe.clickOn(this.selectors.continuePurchasingButton)
    }
}

module.exports = new customizeTripPage();