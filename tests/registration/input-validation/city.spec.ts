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

test.describe("City", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_039: Valid City Name", async ({ registrationPage, page }) => {
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

    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_040: Empty City", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      // city intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.cityInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_041: City with Numbers", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: "New York 123",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.cityInput).toHaveValue("New York 123");

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_042: City with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: "New@York#",
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_043: City Max Length", async ({ registrationPage, page }) => {
    const longCity = "A".repeat(200);

    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: longCity,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.cityInput).toHaveValue(longCity);

    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });
});
