Feature: Search for tickets on RENFE

As a user who needs to travel by train i want to be able to access the Renfe website to search for and select a ticket

Scenario: view of available trains
  Given the user is on the Renfe home page
  When the user enters origin, destination, departure date and return date
  And the user click on 'Search ticket' button
  Then the website should display a list of available trains


Scenario: selection of trains available
  Given the user is on the 'Select your trip' page
  When the user selects a list of available trains
  Then the website should show a form to complete de travelers information


Scenario Outline: empty fields in data form
  Given the user is on the 'Traveler Data' page
  When the user does not complete the required fields "<name>", "<first_lastname>", "<DNI>" and "<phone>"
  And the user click on 'Customize trip' button
  Then the fields should be painted red and the error "<error>" will be marked below

  Examples:
  | name  | first_lastname | DNI       | phone     | error                                |
  |       | Rivera         | 12345678z | 637709563 | El nombre es obligatorio.            |
  | Pablo |                | 12345678z | 637709563 | El primer apellido es obligatorio.   |
  | Pablo | Rivera         |           | 637709563 | El documento es un campo obligatorio |
  | Pablo | Rivera         | 12345678z |           | El teléfono es un campo obligatorio  |


Scenario: data form completed successfully
  Given the user is on the "Traveler Data" page
  When the user completes their personal information
  And the user click on "Customize trip" button
  Then the website should show me a page to customize my trip


Scenario: continue trip without personalizing
  Given the user is on the "Customize your trip" page
  When the user click the "Continue with the purchase" button
  Then the website should show a form to select the payment method
 

Scenario: payment form completed successfully
  Given the user is on the "Payment method" page
  When the user completes the buyers data fields
  And the user selects the payment method
  And the user accepts the website conditions
  And the user click on "Finalize your purchase" button
  Then the website should redirect me to the payment gateway

Scenario: empty fields in payment form
  Given the user is on the "Payment method" page
  When the user selects the payment method
  And the user accepts the website conditions
  And the user click on "Finalize your purchase" button whitout completing the buyers data fields
  Then the website should show a pop up with an error message

Scenario: finalize purchase button disabled
  Given the user is on the "Payment method" page
  When the user completes the buyers data fields but does not select the payment method and does not accept the conditions
  Then the "Finalize your purchase" button must be disabled