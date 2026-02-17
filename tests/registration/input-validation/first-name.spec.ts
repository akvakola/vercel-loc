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

test.describe("First name", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_001: Valid First Name", async ({ registrationPage, page }) => {
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

  test("TC_REG_002: Empty First Name", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      // firstName intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.firstNameInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_003: First Name with Numbers", async ({
    registrationPage,
    page,
  }) => {
    const randomNumber = Date.now().toString();

    await registrationPage.fillRegistrationForm({
      firstName: randomNumber,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.firstNameInput).toHaveValue(randomNumber);

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_004: First Name with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "@#$%^&*",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.firstNameInput).toHaveValue("@#$%^&*");

    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_005: First Name Min Length", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "J",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.firstNameInput).toHaveValue("J");

    await expect(
      page.getByText(/invalid|error|too short|minimum/i)
    ).toBeVisible();
  });

  test("TC_REG_006: First Name Max Length", async ({
    registrationPage,
    page,
  }) => {
    const longName = "A".repeat(100);

    await registrationPage.fillRegistrationForm({
      firstName: longName,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.firstNameInput).toHaveValue(longName);

    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });

  test("TC_REG_007: First Name with Spaces", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "  John  ",
    });

    await registrationPage.createAccountButton.click();

    const fieldValue = await registrationPage.firstNameInput.inputValue();

    expect(fieldValue).toBe("John");
  });

  test("TC_REG_008: First Name - Only Spaces", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "     ",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.firstNameInput).toHaveValue("     ");

    await expect(page.getByText(/invalid|error|required/i)).toBeVisible();
  });
});
