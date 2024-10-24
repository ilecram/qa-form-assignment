import { Locator } from "@playwright/test";
import { BasePage, WebsiteDriverProps } from "./BasePage";

export class RegistrationConfirmationPage extends BasePage {
  readonly confirmationHeader: Locator;
  readonly confirmationMessage: Locator;

  constructor({ page }: WebsiteDriverProps) {
    super({ page });
    this.confirmationHeader = this.page.getByRole("heading");
    this.confirmationMessage = this.page.getByRole("paragraph");
  }
}
