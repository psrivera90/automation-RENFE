import commonFunctions from "../functions/commonFunctions"
import customizeTripPage from "./customizeTrip"

class paymentMethodPage {

    constructor() {
        this.selectors = {
            inputEmail : '#inputEmail',
            inputPhone : '#telefonoComprador',
            checkCard : '#datosPago_cdgoFormaPago_tarjetaRedSys',
            checkConditions : '#aceptarCondiciones',
            payButton : '#butonPagar',
            confirmationPurchase : '.datosDeLaOperacion',
            popUpError : '#modalGeneric'
        }
    }

    paymentMethod () {
        customizeTripPage.customizeTrip()
        commonFunctions.clickOn(customizeTripPage.selectors.continuePurchasingButton)
        customizeTripPage.confirmationPay()
    }

    insertBuyerData () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.inputEmail).type(data.Passenger_email)
            cy.get(this.selectors.inputPhone).type(data.Passenger_phone)
        })
    }

    userCheckCard () {
        cy.get(this.selectors.checkCard).click()
    }

    userCheckConditions () {
        cy.get(this.selectors.checkConditions).check()
    }

    finalizePurchase () {
        commonFunctions.clickOn(this.selectors.payButton)
    }

    confirmationPurchase () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationPurchase).should('be.visible').contains(data.Title_purchase)
        })
    }

    emptyRequireFields () {
        cy.get(this.selectors.inputEmail).invoke('val').should('be.empty')
        cy.get(this.selectors.inputPhone).invoke('val').should('be.empty')
    }

    errorEmptyFields() {
        cy.on('window:error', (error) => {
            cy.fixture('dataRenfe').then((data) => {
                expect(error.message).to.include(data.Pop_up_error)
            })
        })
    }

    uncheckedCard () {
        cy.get(this.selectors.checkCard).should('exist')
    }

    uncheckedConditions () {
        cy.get(this.selectors.checkConditions).should('not.be.checked')
    }

    payButtonDisabled () {
        cy.get(this.selectors.payButton).should('be.disabled')
    }
}

module.exports = new paymentMethodPage();