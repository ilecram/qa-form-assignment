## Running Tests
Tests are running over a local network, which is reflected in the playwright.config.ts:
baseURL: "http://192.168.0.123:8080"

Use the `playwright test` command from the `qa-form-assignment` directory.

### Run All Tests for all devices (5 Projects)

```bash
npx playwright test src/tests
```

### Run Tests in a Single Describe Group

```bash
npx playwright test -g "describe group name"
```

### Run Test in Headed Mode

```bash
npx playwright test src/tests --headed
```

### Run Tests for a Specific Project

  ```bash
  npx playwright test src/tests --project='chromium'
  npx playwright test src/tests --project='firefox'
  npx playwright test src/tests --project='webkit'
  npx playwright test src/tests --project='mobile - chromium'
  npx playwright test src/tests --project='mobile - safari'
  ```

## Approach

To test functionality across most popular browsers/devices specified in the assignment, the Playwright project was updated to include mobile - chromium and mobile - safari.

### Device Share (European Region)

- **Mobile:** ~70% Chrome, ~20% Safari
- **Desktop:** ~60% Chrome, ~15% Firefox, ~15% Edge

> **Comment:** As Edge is based on Chromium, tests are not covered with a brand-specific project. It could be easily extended by adding:
```json
{
  "name": "Microsoft Edge",
  "use": { "...devices['Desktop Edge']", "channel": "msedge" }
}
```
For more information, visit [SimilarWeb - Browsers](https://www.similarweb.com/browsers).

## Robustness

Use auto-retrying assertions for verifying the presence of UI elements. For more details, visit the [Playwright documentation](https://playwright.dev/docs/test-assertions#auto-retrying-assertions).

## Assignment Specific Comments

### Test Scenarios

Instead of writing low-level descriptive scenarios I opted for declarative style as presented on user registration scenario below:

Imperative style:
   ```gherkin
    Scenario: User registers with valid data
        Given User is on the registration form page
        When User enters first name <firstName>
        And User enters second name <secondName>
        And User enters email adress <email>
        And User enters password <password>
        And User enters repeat password <repeatPassword>
        And User enters date of birth <birthDate>
        And User selects a language <language>
        And User enters a phone number <phoneNumber>
        And User accepts Terms and Conditions and Privacy Policy
        And User submits registration form
        Then Confirmation Page is displayed

        Examples:
        | firstName | secondName | email           | password   | repeatPassword | birthDate  | language | phoneNumber |
        | Jan       | Kowalski   | email@email.com | Mypass123! | Mypass123!     | 2024-10-23 | polski   | 111222333   |
   ```

Declarative style:

   ```gherkin
          Scenario: User registers with valid data
        Given User is on the registration form page
        When User fills form with valid data
        And User accepts 'Terms and Conditions' and 'Privacy Policy'
        And User submits form
        Then Confirmation Page displays correct name and email
   ```

### Logical Order for Writing Tests

1. **Create Test Cases Based on the Assignment**  
   Example: **Registration Form:**
   ```gherkin
       Scenario: User registers with valid data
        Given User is on the registration form page
        When User fills form with valid data
        And User accepts 'Terms and Conditions' and 'Privacy Policy'
        And User submits form
        Then Confirmation Page displays correct name and email
   ```

2. **Implement the Test Based on the Test Case:**
   ```typescript
    // Given
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // When
    await registrationFormPage.fillFormWithValidData();
    await registrationFormPage.acceptTermsAndConditions();
    await registrationFormPage.submitRegistrationForm();

    // Then
    await expect
      .soft(registrationConfirmationPage.confirmationHeader)
      .toHaveText(
        expectedRegistrationConfirmationHeader(
          validRegistrationFormData.firstName,
          validRegistrationFormData.email
        )
      );
    await expect(registrationConfirmationPage.confirmationMessage).toHaveText(
      expectedRegistrationConfirmationMessage(
        validRegistrationFormData.firstName,
        validRegistrationFormData.email
      )
    );
   ```

### Tests failing
- Expected error message for the required password field differs from the implementation
- Expected navigation for Terms and Conditions and Privacy Policy throws error