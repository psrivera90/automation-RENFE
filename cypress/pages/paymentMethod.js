import customizeTripPage from "./customizeTrip"
import homeRenfe from "./homeRenfe"

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
        homeRenfe.clickOn(customizeTripPage.selectors.continuePurchasingButton)
        customizeTripPage.confirmationPay()
    }

    insertBuyerData () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.inputEmail).type(data.Passenger_email)
            cy.get(this.selectors.inputPhone).type(data.Passenger_phone)
        })
    }

    userCheckCard () {
        cy.get(this.selectors.checkCard).check()
    }

    userCheckConditions () {
        cy.get(this.selectors.checkConditions).check()
    }

    finalizePurchase () {
        homeRenfe.clickOn(this.selectors.payButton)
    }

    confirmationPurchase () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationPurchase).should('be.visible').contains(data.Title_purchase)
        })
    }

    errorEmptyFields() {
        cy.on('window:error', (error) => {
            cy.fixture('dataRenfe').then((data) => {
                expect(error.message).to.include(data.Pop_up_error)
            })
        })
    }

    payButtonDisabled () {
        cy.get(this.selectors.payButton).should('be.disabled')
    }
}

module.exports = new paymentMethodPage();