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
test.describe("Passwords", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  // Category 8: Password Field

  test("TC_REG_050: Valid Password", async ({ registrationPage, page }) => {
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

  test("TC_REG_051: Empty Password", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      // password intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.passwordInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_052: Password Min Length", async ({
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
      password: "123",
      confirmPassword: "123",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.passwordInput).toHaveValue("123");

    await expect(
      page.getByText(/invalid|error|too short|minimum/i)
    ).toBeVisible();
  });

  test("TC_REG_053: Password Max Length", async ({
    registrationPage,
    page,
  }) => {
    const longPassword = "A".repeat(200);

    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: longPassword,
      confirmPassword: longPassword,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.passwordInput).toHaveValue(longPassword);

    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });

  test("TC_REG_054: Password - Only Lowercase", async ({
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
      password: "abcdefgh",
      confirmPassword: "abcdefgh",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(/invalid|error|weak|complexity/i)
    ).toBeVisible();
  });

  test("TC_REG_055: Password - Only Uppercase", async ({
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
      password: "ABCDEFGH",
      confirmPassword: "ABCDEFGH",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(/invalid|error|weak|complexity/i)
    ).toBeVisible();
  });

  test("TC_REG_056: Password - Only Numbers", async ({
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
      password: "12345678",
      confirmPassword: "12345678",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(/invalid|error|weak|complexity/i)
    ).toBeVisible();
  });

  test("TC_REG_057: Password - Only Special Chars", async ({
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
      password: "!@#$%^&*",
      confirmPassword: "!@#$%^&*",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(/invalid|error|weak|complexity/i)
    ).toBeVisible();
  });

  test("TC_REG_058: Strong Password Requirements", async ({
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
      password: "weak",
      confirmPassword: "weak",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(
        /invalid|error|weak|complexity|uppercase|lowercase|number|special/i
      )
    ).toBeVisible();
  });

  test("TC_REG_059: Password Visibility Toggle", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      password: PASSWORD,
    });

    // Check if password is masked
    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );

    // Look for visibility toggle button (eye icon)
    const toggleButton = page
      .locator('button[aria-label*="password"], button[type="button"]')
      .first();

    await expect(toggleButton).toBeVisible();
  });

  test("TC_REG_060: Password with Spaces", async ({
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
      password: "Pass Word 123",
      confirmPassword: "Pass Word 123",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.passwordInput).toHaveValue("Pass Word 123");

    await expect(page.getByText(/invalid|error|spaces/i)).toBeVisible();
  });

  // Category 9: Confirm Password Field

  test("TC_REG_061: Matching Passwords", async ({ registrationPage, page }) => {
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

  test("TC_REG_062: Non-Matching Passwords", async ({
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
      password: "Password123",
      confirmPassword: "DifferentPass456",
    });

    await registrationPage.createAccountButton.click();

    await expect(
      page.getByText(/password.*match|passwords.*not.*match/i)
    ).toBeVisible();
  });

  test("TC_REG_063: Empty Confirm Password", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: generateEmail(),
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      // confirmPassword intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.confirmPasswordInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_064: Confirm Password Validation Timing", async ({
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
      password: "Password123",
      confirmPassword: "Different456",
    });

    // Check if validation occurs on blur
    await registrationPage.confirmPasswordInput.blur();

    const errorOnBlur = await page
      .getByText(/password.*match/i)
      .isVisible({ timeout: 1000 })
      .catch(() => false);

    // If not on blur, check on submit
    if (!errorOnBlur) {
      await registrationPage.createAccountButton.click();
      await expect(page.getByText(/password.*match/i)).toBeVisible();
    }
  });
});
