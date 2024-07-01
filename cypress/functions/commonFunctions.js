class commonFunctions {

    clickOn (element) {
        cy.get(element).click({force: true})
    }
}

module.exports = new commonFunctions();