Feature: Registration form
    Scenario: User registers with valid data
        Given User is on the registration form page
        When User fills form with valid data
        And User accepts 'Terms and Conditions' and 'Privacy Policy'
        And User submits form
        Then Confirmation Page displays correct name and email

    Scenario: Required fields show error message when input is blank
        Given User is on the registration form page
        When User submits the empty registration form
        Then Required fields show validation error 

    Scenario: Terms and Conditions link displays correct content 
        Given User is on the registration form page
        When User opens Terms and Conditions link
        Then Terms and Conditions are displayed

    Scenario: Privacy Policy link displays correct content 
        Given User is on the registration form page
        When User opens Privacy Policy link
        Then Privacy Policy is displayed
