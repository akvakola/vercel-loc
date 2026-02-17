import { test } from "../../../fixtures/basePage";
import { expect } from "@playwright/test";
import { generateRandomString } from "../../../helpers/helpers";

test.describe("Street", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_034: Valid Street Address", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: `mail${generateRandomString()}@mail.loc`,
      phone: "1234567890",
      street: "123 Main Street",
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

  test("TC_REG_035: Empty Street Address", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: `mail${generateRandomString()}@mail.loc`,
      phone: "1234567890",
      // street intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.streetAddressInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_036: Street with Numbers and Letters", async ({
    registrationPage,
    page,
  }) => {
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

  test("TC_REG_037: Street with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: `mail${generateRandomString()}@mail.loc`,
      phone: "1234567890",
      street: "123 Main St., Apt #5",
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

  test("TC_REG_038: Street Max Length", async ({ registrationPage, page }) => {
    const longStreet = "A".repeat(200);

    await registrationPage.fillRegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: `mail${generateRandomString()}@mail.loc`,
      phone: "1234567890",
      street: longStreet,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.streetAddressInput).toHaveValue(longStreet);

    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });
});
