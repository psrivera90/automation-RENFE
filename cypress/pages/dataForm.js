import homeRenfe from "./homeRenfe";
import selectTrainPage from "./selectTrain";

class dataFormPage {

    constructor() {
        this.selectors = {
            customizeButton : '#submitpersonaliza',
            inputName : '#nombre0',
            inputFirstLastName : '#apellido10',
            inputDNI : '#documento0', 
            inputPhone : '#telefono0',
            errorName : '#errornombre0',
            errorFirstLastName : '#errorapellido10',
            errorDNI : '#errordocumento0',
            errorPhone : '#errortelefono0',
            confirmationForm : '.titulo'
        }
    }

    travelerData () {
        selectTrainPage.tripPage()
        selectTrainPage.selectTrain()
        selectTrainPage.confirmationTrain()
    }

    insertEmptyCredentials (name, firstLastname, DNI, phone) {
        if(name !== "") {
            cy.get(this.selectors.inputName).clear().type(name)
        } 
        if(firstLastname !== "") {
            cy.get(this.selectors.inputFirstLastName).clear().type(firstLastname)
        }
        if(DNI !== "") {
            cy.get(this.selectors.inputDNI).clear().type(DNI)
        }
        if(phone !== "") {
            cy.get(this.selectors.inputPhone).clear().type(phone)
        }
    }

    emptyFieldsError (name, firstLastname, DNI, phone, expectedError) {
        if (name === "") {
            cy.get(errorName).should('have.text', expectedError);
        }
        if (firstLastname === "") {
            cy.get(errorFirstLastName).should('have.text', expectedError);
        }
        if (DNI === "") {
            cy.get(errorDNI).should('have.text', expectedError);
        }
        if (phone === "") {
            cy.get(errorPhone).should('have.text', expectedError);
        }
    }

    insertCredentials () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.inputName).type(data.Passenger_name)
            cy.get(this.selectors.inputFirstLastName).type(data.Passenger_first_last_name)
            cy.get(this.selectors.inputDNI).type(data.Passenger_DNI)
            cy.get(this.selectors.inputPhone).type(data.Passenger_phone)
        })
    }

    confirmationForm () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.confirmationForm).should('be.visible').contains(data.Title_customize)
        })
    }
    
    customizeTripButton () {
        homeRenfe.clickOn(this.selectors.customizeButton)
    }

}

module.exports = new dataFormPage();