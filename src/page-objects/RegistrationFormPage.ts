import { Locator } from "@playwright/test";
import { BasePage, WebsiteDriverProps } from "./BasePage";
import { validRegistrationFormData } from "../test-data/registrationFormUserData";

export class RegistrationFormPage extends BasePage {
  //Registration Form
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly repeatPassword: Locator;
  readonly birthDate: Locator;
  readonly language: Locator;
  readonly phoneNumber: Locator;
  readonly termsAndConditionCheckbox: Locator;
  readonly submitButton: Locator;
  readonly termsAndConditionsLink: Locator;
  readonly privacyPolicyLink: Locator;

  //Registration form error messages
  readonly firstNameErrorMessage: Locator;
  readonly lastNameErrorMessage: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly repeatPasswordErrorMessage: Locator;
  readonly birthDateErrorMessage: Locator;
  readonly termsAndConditionCheckboxErrorMessage: Locator;

  constructor({ page }: WebsiteDriverProps) {
    super({ page });

    //Registration form
    this.firstName = this.page.getByPlaceholder("Imię");
    this.lastName = this.page.getByPlaceholder("Nazwisko");
    this.email = this.page.getByPlaceholder("Twój adres e-mail");
    this.password = this.page.getByPlaceholder("Hasło", { exact: true });
    this.repeatPassword = this.page.getByPlaceholder("Powtórz hasło", {
      exact: true,
    });
    this.birthDate = this.page.getByPlaceholder("Data urodzenia");
    this.language = this.page.getByLabel("Język");
    this.phoneNumber = this.page.getByPlaceholder("Numer telefonu");
    this.termsAndConditionCheckbox = this.page
      .locator("form div")
      .filter({ hasText: "Akceptuję regulamin oraz" })
      .locator("div");
    this.submitButton = this.page.getByRole("button", { name: "Zarejestruj" });
    this.termsAndConditionsLink = this.page.getByRole('link', { name: 'regulamin' });
    this.privacyPolicyLink = this.page.getByRole('link', { name: 'politykę prywatności' });
  

  //Registration form error messages
  this.firstNameErrorMessage = this.page.getByText('Pole Imię jest wymagane');
  this.lastNameErrorMessage = this.page.getByText('Pole Nazwisko jest wymagane');
  this.emailErrorMessage = this.page.getByText('Pole E-mail jest wymagane');
  this.passwordErrorMessage = this.page.getByText('Pole Hasło jest wymagane');
  this.repeatPasswordErrorMessage = this.page.getByText('Pole Powtórz hasło jest wymagane');
  this.birthDateErrorMessage = this.page.getByText('Pole Data urodzenia jest wymagane');
  this.termsAndConditionCheckboxErrorMessage = this.page.getByText('To pole jest wymagane');
  }
  
  async fillFormWithValidData(): Promise<void> {
    await this.firstName.fill(validRegistrationFormData.firstName);
    await this.lastName.fill(validRegistrationFormData.lastName);
    await this.email.fill(validRegistrationFormData.email);
    await this.password.fill(validRegistrationFormData.password);
    await this.repeatPassword.fill(validRegistrationFormData.repeatPassword);
    await this.birthDate.fill(validRegistrationFormData.birthDate);
    await this.language.selectOption(validRegistrationFormData.language);
    await this.phoneNumber.fill(validRegistrationFormData.phoneNumber);
    await this.termsAndConditionCheckbox.check();
    await this.submitButton.click();
  }
  async submitBlankForm(): Promise<void> {
    await this.submitButton.click();
  }

  async openTermsAndConditions(): Promise<void> {
    await this.termsAndConditionsLink.click();
  }
  async openPrivacyPolicy(): Promise<void> {
    await this.privacyPolicyLink.click();
  }
}
