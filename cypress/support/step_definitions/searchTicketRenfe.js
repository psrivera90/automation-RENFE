import homeRenfe from "../../pages/homeRenfe"
import selectTrainPage from "../../pages/selectTrain"
import dataFormPage from "../../pages/dataForm"
import customizeTripPage from "../../pages/customizeTrip"
import paymentMethodPage from "../../pages/paymentMethod"


//View of available trains
Given('the user is on the Renfe home page', () => {
    cy.visitRenfe()
})

When('the user enters origin {string}, destination {string}, departure date {string} and return date {string}', (origin, destination, departureDate, returnDate) => {
    homeRenfe.selectTravelExamples(origin, destination, departureDate, returnDate)
})

And('the user click on search ticket button', () => {
    homeRenfe.searchTicketButton()
})

Then('the website should show a list of available trains according to origin {string} and destination {string} searched', (origin, destination) => {
    homeRenfe.confirmationTravelExamples(origin, destination)
})

//Selection of trains available
Given('the user is on the select your trip page', () => {
    selectTrainPage.tripPage()
})

When('the user selects a list of available trains', () => {
    selectTrainPage.selectTrain()
})

Then('the website should show a form to complete de travelers information', () => {
    selectTrainPage.confirmationTrain()
})    

//Empty fields in data form
Given("the user is on the 'Traveler Data' page", () => {
    dataFormPage.travelerData()
})

When('the user does not complete the required fields {string}, {string}, {string} and {string}', (name, firstLastname, DNI, phone) => {
    dataFormPage.insertEmptyCredentials(name, firstLastname, DNI, phone)
})

And("the user click on 'Customize trip' button", () => {
    dataFormPage.customizeTripButton()
})

Then('the fields should be painted red and the error {string} will be marked below', (error) => {
    dataFormPage.emptyFieldsError(error)
})

//Data form completed successfully
Given('the user is on the "Traveler Data" page', () => {
    dataFormPage.travelerData()
})

When('the user completes their personal information', () => {
    dataFormPage.insertCredentials()
})

And('the user click on "Customize trip" button', () => {
    dataFormPage.customizeTripButton()
})

Then('the website should show me a page to customize my trip', () => {
    dataFormPage.confirmationForm()
})

//Continue trip whitout personalizing
Given('the user is on the "Customize your trip" page', () => {
    customizeTripPage.customizeTrip()
})

When('the user click the "Continue with the purchase" button', () => {
    customizeTripPage.purchasingButton()
})

Then('the website should show a form to select the payment method', () => {
    customizeTripPage.confirmationPay()
})

//Payment form completed successfully
Given('the user is on the "Payment method" page', () => {
    paymentMethodPage.paymentMethod()
})

When('the user completes the buyers data fields', () => {
    paymentMethodPage.insertBuyerData()
})

And('the user selects the payment method', () => {
    paymentMethodPage.userCheckCard()
})

And('the user accepts the website conditions', () => {
    paymentMethodPage.userCheckConditions()
})

And('the user click on "Finalize your purchase" button', () => {
    paymentMethodPage.finalizePurchase()
})

Then('the website should redirect me to the payment gateway', () => {
    paymentMethodPage.confirmationPurchase()
})

//Empty fields in payment form
Given('the user is on the "Payment method" page', () => {
    paymentMethodPage.paymentMethod()
})

When('the user selects the payment method', () => {
    paymentMethodPage.userCheckCard()
})

And('the user accepts the website conditions', () => {
    paymentMethodPage.userCheckConditions()
})

And('the user click on "Finalize your purchase" button whitout completing the buyers data fields', () => {
    paymentMethodPage.finalizePurchase()
})

Then('the website should show a pop up with an error message', () => {
    paymentMethodPage.errorEmptyFields()
})

//Finalize purchase button disabled
Given('the user is on the "Payment method" page', () => {
    paymentMethodPage.paymentMethod()
})

When('the user completes the buyers data fields but does not select the payment method and does not accept the conditions', () => {
    paymentMethodPage.insertBuyerData()
})

Then('the "Finalize your purchase" button must be disabled', () => {
    paymentMethodPage.payButtonDisabled()
})