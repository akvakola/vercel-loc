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

test.describe("Mobile Responsiveness", () => {
  test("TC_REG_100: Mobile Responsiveness (320px)", async ({
    page,
    registrationPage,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });

    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();
    await page.pause();
    // Verify all form elements are visible
    await expect(registrationPage.firstNameInput).toBeVisible();
    await expect(registrationPage.lastNameInput).toBeVisible();
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.phoneNumberInput).toBeVisible();
    await expect(registrationPage.streetAddressInput).toBeVisible();
    await expect(registrationPage.cityInput).toBeVisible();
    await expect(registrationPage.zipCodeInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
    await expect(registrationPage.confirmPasswordInput).toBeVisible();
    await expect(registrationPage.createAccountButton).toBeVisible();

    // Test registration works
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

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });

  test("TC_REG_100: Mobile Responsiveness (480px)", async ({
    page,
    registrationPage,
  }) => {
    await page.setViewportSize({ width: 480, height: 800 });

    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();

    await expect(registrationPage.firstNameInput).toBeVisible();
    await expect(registrationPage.createAccountButton).toBeVisible();

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

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });
});

test.describe("Tablet Responsiveness", () => {
  test("TC_REG_101: Tablet Responsiveness (768px) - BUG-012", async ({
    page,
    registrationPage,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();
    await page.pause();
    // BUG-012: Street Address field replaced by advertisement at this width
    await expect(registrationPage.streetAddressInput).toBeVisible();
    await expect(page.locator(".overlay-image-tablet")).not.toBeVisible();
  });

  test("TC_REG_101: Tablet Responsiveness (1024px)", async ({
    page,
    registrationPage,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();

    // Verify all form elements are visible
    await expect(registrationPage.firstNameInput).toBeVisible();
    await expect(registrationPage.lastNameInput).toBeVisible();
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.phoneNumberInput).toBeVisible();
    await expect(registrationPage.streetAddressInput).toBeVisible();
    await expect(registrationPage.cityInput).toBeVisible();
    await expect(registrationPage.zipCodeInput).toBeVisible();
    await expect(registrationPage.createAccountButton).toBeVisible();

    // Test registration works
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

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(page).toHaveURL(
      "https://qa-test-web-app.vercel.app/index.html?registered=true"
    );
  });
});
