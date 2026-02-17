import { test } from "../../../fixtures/basePage";
import { expect } from "@playwright/test";
import { generateRandomString } from "../../../helpers/helpers";
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

test.describe("Phone", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_027: Valid Phone Number", async ({ registrationPage, page }) => {
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

  test("TC_REG_028: Empty Phone Number", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: LAST_NAME,
      email: generateEmail(),
      // phone intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.phoneNumberInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_029: Phone with Letters", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: "12345abcde",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.phoneNumberInput).toHaveValue("12345abcde");

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_030: Phone with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: "(123) 456-7890",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.phoneNumberInput).toHaveValue(
      "(123) 456-7890"
    );

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_031: Phone Min Length", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: "1",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.phoneNumberInput).toHaveValue("123");

    await expect(
      page.getByText(/invalid|error|too short|minimum/i)
    ).toBeVisible();
  });

  test("TC_REG_032: Phone Max Length", async ({ registrationPage, page }) => {
    const longPhone = "1".repeat(30);

    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: longPhone,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.phoneNumberInput).toHaveValue(longPhone);

    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });

  test("TC_REG_033: International Phone Format", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: "+1-234-567-8900",
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
});
