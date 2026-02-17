import { expect, Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly createNewAccountButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly streetAddressInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsAndConditionsCheckbox: Locator;
  readonly subscribeToNewsletterCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly loginRedirectLink: Locator;
  readonly successfullRegistrationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email Address" });
    this.phoneNumberInput = page.getByRole("textbox", { name: "Phone Number" });
    this.streetAddressInput = page.getByRole("textbox", {
      name: "Street Address",
    });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.zipCodeInput = page.getByRole("textbox", { name: "ZIP Code" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm Password",
    });
    this.termsAndConditionsCheckbox = page.getByText(
      "I agree to the Terms and"
    );
    this.subscribeToNewsletterCheckbox = page.getByText(
      "Subscribe to newsletter"
    );
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    this.loginRedirectLink = page.getByRole("link", {
      name: "Already have an account? Login",
    });
    this.successfullRegistrationMessage = page.getByText(
      "Registration successful!"
    );
  }
  async fillRegistrationForm(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    zipCode?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    if (data.firstName !== undefined)
      await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined)
      await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phone !== undefined) await this.phoneNumberInput.fill(data.phone);
    if (data.street !== undefined)
      await this.streetAddressInput.fill(data.street);
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.zipCode !== undefined) await this.zipCodeInput.fill(data.zipCode);
    if (data.password !== undefined)
      await this.passwordInput.fill(data.password);
    if (data.confirmPassword !== undefined)
      await this.confirmPasswordInput.fill(data.confirmPassword);
  }
  async validateInputValidationMessage(selector: Locator, message: string) {
    const validationMsg = await selector.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect.soft(validationMsg).toBe(message);
  }
}
