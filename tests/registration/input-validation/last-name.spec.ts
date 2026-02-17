import { test } from "../../../fixtures/basePage";
import { expect } from "@playwright/test";
import { generateRandomString } from "../../../helpers/helpers";

test.describe("Last name", () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto("/");
    await login.createNewAccountButton.click();
  });
  test("TC_REG_009: Valid Last Name", async ({ registrationPage, page }) => {
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

    await expect(registrationPage.successfullRegistrationMessage).toBeVisible();
  });

  test("TC_REG_010: Empty Last Name", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "John",
      // lastName intentionally empty
    });

    await registrationPage.createAccountButton.click();

    await registrationPage.validateInputValidationMessage(
      registrationPage.lastNameInput,
      "Please fill out this field."
    );
  });

  test("TC_REG_011: Last Name with Numbers", async ({
    registrationPage,
    page,
  }) => {
    const randomNumber = Date.now().toString();

    await registrationPage.fillRegistrationForm({
      lastName: randomNumber,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.lastNameInput).toHaveValue(randomNumber);
    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_012: Last Name with Special Characters", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      lastName: "@#$%^&*",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.lastNameInput).toHaveValue("@#$%^&*");
    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });

  test("TC_REG_013: Last Name Min Length", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      lastName: "D",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.lastNameInput).toHaveValue("D");
    await expect(
      page.getByText(/invalid|error|too short|minimum/i)
    ).toBeVisible();
  });

  test("TC_REG_014: Last Name Max Length", async ({
    registrationPage,
    page,
  }) => {
    const longName = "D".repeat(100);

    await registrationPage.fillRegistrationForm({
      lastName: longName,
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.lastNameInput).toHaveValue(longName);
    await expect(
      page.getByText(/invalid|error|too long|maximum/i)
    ).toBeVisible();
  });

  test("TC_REG_015: Last Name with Spaces", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      lastName: "  Doe  ",
    });

    await registrationPage.createAccountButton.click();

    const fieldValue = await registrationPage.lastNameInput.inputValue();

    expect(fieldValue).toBe("Doe");
  });
});
