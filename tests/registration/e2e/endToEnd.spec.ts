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

test.describe("End to end", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });

  test("TC_REG_072: Successful Registration", async ({
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
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_081: Login with New Credentials", async ({
    registrationPage,
    page,
    login,
  }) => {
    const email = `mail${generateRandomString()}@mail.loc`;
    const password = PASSWORD;
    // await page.pause();
    // Register
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: email,
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: password,
      confirmPassword: password,
    });
    // await page.pause();
    await registrationPage.termsAndConditionsCheckbox.check();
    await page.waitForTimeout(3000);
    await registrationPage.createAccountButton.click();
    await page.waitForTimeout(3000);
    await expect(login.loginButton).toBeVisible();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
    // Now login with same credentials
    await page.getByRole("textbox", { name: "Email Address" }).fill(email);
    await page
      .locator('input[placeholder="Enter your password"]')
      .fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByRole("heading", { name: "Welcome, John!" })
    ).toBeVisible();
  });

  test("TC_REG_022: Duplicate Email", async ({
    registrationPage,
    page,
    login,
  }) => {
    const email = `mail${generateRandomString()}@mail.loc`;

    // First registration
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: email,
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
    await login.createNewAccountButton.click();

    // Second registration with same email
    await registrationPage.fillRegistrationForm({
      firstName: "Jane",
      lastName: "Smith",
      email: email,
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
