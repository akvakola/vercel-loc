import { expect, Locator, Page } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly createNewAccountButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewAccountButton = page.getByRole("link", {
      name: "Create New Account",
    });
    this.emailInput = page.getByRole("textbox", { name: "Email Address" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }
}
