import { test } from "../../../fixtures/basePage";
import { expect } from "@playwright/test";
import { generateRandomString } from "../../../helpers/helpers";

test.describe("Email", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_016: Valid Email", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: `mail${generateRandomString()}@mail.loc`,
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_017: Empty Email", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      // email intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.emailInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_018: Email without @ Symbol", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "testexample.com",
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_019: Email without Domain", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "test@",
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_020: Email without Local Part", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "@example.com",
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_021: Email with Spaces", async ({ registrationPage, page }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "test @example.com",
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_023: Email with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "test+tag@example.com",
      phone: "9876543210",
      street: "456 Oak Ave",
      city: "Boston",
      zipCode: "02101",
      password: "Pass@5678",
      confirmPassword: "Pass@5678",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.emailInput).toHaveValue(
      "test+tag@example.com"
    );
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_024: Email Max Length", async ({ registrationPage, page }) => {
    const longEmail = "a".repeat(250) + "@example.com";

    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: longEmail,
      phone: "9876543210",
      street: "456 Oak Ave",
      city: "Boston",
      zipCode: "02101",
      password: "Pass@5678",
      confirmPassword: "Pass@5678",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.emailInput).toHaveValue(longEmail);
    await expect(page.getByText(/invalid|error|too long/i)).toBeVisible();
  });

  test("TC_REG_025: Email with Multiple @ Symbols", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "test@@example.com",
      phone: "9876543210",
      street: "456 Oak Ave",
      city: "Boston",
      zipCode: "02101",
      password: "Pass@5678",
      confirmPassword: "Pass@5678",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.emailInput).toHaveValue("test@@example.com");
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("TC_REG_026: Email Case Sensitivity", async ({
    registrationPage,
    page,
  }) => {
    const timestamp = Date.now();
    const emailLowercase = `test${timestamp}@example.com`;
    const emailMixedCase = `Test${timestamp}@Example.com`;

    // First registration with lowercase
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: emailLowercase,
      phone: "1234567890",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      password: "Test@1234",
      confirmPassword: "Test@1234",
    });

    await registrationPage.createAccountButton.click();
    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );

    // Navigate back to registration
    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();

    // Second registration with mixed case
    await registrationPage.fillRegistrationForm({
      firstName: "Jane",
      lastName: "Smith",
      email: emailMixedCase,
      phone: "9876543210",
      street: "456 Oak Ave",
      city: "Boston",
      zipCode: "02101",
      password: "Pass@5678",
      confirmPassword: "Pass@5678",
    });

    await registrationPage.createAccountButton.click();
    await expect(page.getByText("User with this email already")).toBeVisible();
  });
});
