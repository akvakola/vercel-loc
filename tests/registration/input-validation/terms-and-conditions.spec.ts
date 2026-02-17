import { test } from "../../../fixtures/basePage";
import { expect } from "@playwright/test";
import {
  CITY,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PHONE,
  STREET,
  ZIP_CODE,
  generateEmail,
} from "../../../data/userData";
import { generateRandomString } from "../../../helpers/helpers";

test.describe("TNC", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  // Category 10: Terms and Conditions Checkbox

  test("TC_REG_065: T&C Checked", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });
    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_066: T&C Not Checked", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    // Ensure T&C is unchecked
    await registrationPage.termsAndConditionsCheckbox.uncheck();
    await registrationPage.createAccountButton.click();
    await page.waitForTimeout(2000);
    await expect(page).not.toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_067: T&C Link", async ({ registrationPage, page }) => {
    // Check if "Terms and Conditions" text is a clickable link
    const termsLink = page.getByRole("link", { name: /terms.*conditions/i });

    await expect(termsLink).toBeVisible();
  });

  test("TC_REG_068: T&C Toggle", async ({ registrationPage }) => {
    // Check checkbox
    await registrationPage.termsAndConditionsCheckbox.check();
    await expect(registrationPage.termsAndConditionsCheckbox).toBeChecked();

    // Uncheck checkbox
    await registrationPage.termsAndConditionsCheckbox.uncheck();
    await expect(registrationPage.termsAndConditionsCheckbox).not.toBeChecked();

    // Check again
    await registrationPage.termsAndConditionsCheckbox.check();
    await expect(registrationPage.termsAndConditionsCheckbox).toBeChecked();
  });

  test("TC_REG_069: Newsletter Checked", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.subscribeToNewsletterCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_070: Newsletter Unchecked", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.subscribeToNewsletterCheckbox.uncheck();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_071: Newsletter Optional", async ({
    registrationPage,
    page,
  }) => {
    // Register without checking newsletter (should succeed)
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });
});
