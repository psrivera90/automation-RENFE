import commonFunctions from "../functions/commonFunctions"
import dataFormPage from "./dataForm"

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
        commonFunctions.clickOn(dataFormPage.selectors.customizeButton)
        dataFormPage.confirmationForm()
    }

    confirmationPay () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationPay).should('be.visible').contains(data.Title_pay)
        })
    }

    purchasingButton () {
        commonFunctions.clickOn(this.selectors.continuePurchasingButton)
    }
}

module.exports = new customizeTripPage();