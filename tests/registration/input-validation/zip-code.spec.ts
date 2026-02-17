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

test.describe("ZIP Code", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_044: Valid ZIP Code", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
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

  test("TC_REG_045: Empty ZIP Code", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
      phone: PHONE,
      street: STREET,
      city: CITY,
      // zipCode intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.zipCodeInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_046: ZIP with Letters", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: "ABCDE",
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.zipCodeInput).toHaveValue("ABCDE");

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_047: ZIP Format Validation", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: "123",
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.zipCodeInput).toHaveValue("123");

    await expect(page.getByText(/invalid|error|format/i)).toBeVisible();
  });

  test("TC_REG_048: Extended ZIP Format", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: "12345-6789",
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_049: ZIP with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: `mail${generateRandomString()}@mail.loc`,
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: "123@#",
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.zipCodeInput).toHaveValue("123@#");

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });
});
