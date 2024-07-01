import commonFunctions from "../functions/commonFunctions";
import selectTrainPage from "./selectTrain";

class dataFormPage {

    constructor() {
        this.selectors = {
            customizeButton : '#submitpersonaliza',
            inputName : '#nombre0',
            inputFirstLastname : '#apellido10',
            inputDNI : '#documento0', 
            inputPhone : '#telefono0',
            errorName : '#errornombre0',
            errorFirstLastname : '#errorapellido10',
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

    insertEmptyCredentials (credentials) {
        const fields = {
            name: this.selectors.inputName,
            firstLastname: this.selectors.inputFirstLastname,
            DNI: this.selectors.inputDNI,
            phone: this.selectors.inputPhone
        };

        Object.keys(fields).forEach(field => {
            if (credentials[field] !== "") {
                cy.get(fields[field]).clear().type(credentials[field]);
            }
        });
    }

    emptyFieldsError (credentials, error) {
        const errorFields = {
            name: this.selectors.errorName,
            firstLastname: this.selectors.errorFirstLastname,
            DNI: this.selectors.errorDNI,
            phone: this.selectors.errorPhone
        };

        Object.keys(errorFields).forEach(field => {
            if (credentials[field] === "") {
                cy.get(errorFields[field]).should('have.text', error);
            }
        });
    }

    insertCredentials () {
        cy.fixture('dataRenfe').then((data) => {
            cy.get(this.selectors.inputName).type(data.Passenger_name)
            cy.get(this.selectors.inputFirstLastname).type(data.Passenger_first_last_name)
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
        commonFunctions.clickOn(this.selectors.customizeButton)
    }
}

module.exports = new dataFormPage();