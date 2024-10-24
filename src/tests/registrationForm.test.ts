import { expect, test } from "@playwright/test";
import {
  RegistrationFormPage,
  RegistrationConfirmationPage,
} from "../page-objects";
import {
  expectedRegistrationConfirmationHeader,
  expectedRegistrationConfirmationMessage,
  validRegistrationFormData,
  navigationLinks,
} from "../test-data";

test.describe("Registration form", () => {
  test("User registers with valid data", async ({ page }) => {
    const registrationFormPage = new RegistrationFormPage({ page });
    const registrationConfirmationPage = new RegistrationConfirmationPage({
      page,
    });

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
  });

  test("Required fields show error message when input is blank", async ({ page }) => {
    const registrationFormPage = new RegistrationFormPage({ page });

    // Given
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // When
    await registrationFormPage.submitRegistrationForm();

    // Then
    await expect.soft(registrationFormPage.firstNameErrorMessage).toBeVisible();
    await expect.soft(registrationFormPage.lastNameErrorMessage).toBeVisible();
    await expect.soft(registrationFormPage.emailErrorMessage).toBeVisible();
    await expect.soft(registrationFormPage.passwordErrorMessage).toBeVisible();
    await expect
      .soft(registrationFormPage.repeatPasswordErrorMessage)
      .toBeVisible();
    await expect.soft(registrationFormPage.birthDateErrorMessage).toBeVisible();
    await expect(
      registrationFormPage.termsAndConditionCheckboxErrorMessage
    ).toBeVisible();
  });

  test("Terms and Conditions link displays correct content", async ({ page }) => {
    const registrationFormPage = new RegistrationFormPage({ page });

    // Given
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // When
    await registrationFormPage.openTermsAndConditions();

    // Then
    await expect(page).toHaveURL(navigationLinks.registrationForm.termsAndConditions);

  });

  test("Privacy policy link displays correct content", async ({ page }) => {
    const registrationFormPage = new RegistrationFormPage({ page });

    // Given
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // When
    await registrationFormPage.openPrivacyPolicy();

    // Then
    await expect(page).toHaveURL(navigationLinks.registrationForm.privacyPolicy);

  });
});
