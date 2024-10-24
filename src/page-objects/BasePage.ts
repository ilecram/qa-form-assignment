import { Page } from "@playwright/test";

export type WebsiteDriverProps = {
  page: Page;
};

export class BasePage {
  protected page: Page;

  constructor({ page }: WebsiteDriverProps) {
    this.page = page;
  }
}
