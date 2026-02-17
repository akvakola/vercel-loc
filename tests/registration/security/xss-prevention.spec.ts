// tests/registration/security/xss-prevention.spec.ts

import { expect } from "@playwright/test";
import { test } from "../../../fixtures/basePage";
import {
  FIRST_NAME,
  LAST_NAME,
  PHONE,
  STREET,
  CITY,
  ZIP_CODE,
  PASSWORD,
} from "../../../data/userData";
import { generateRandomString } from "../../../helpers/helpers";

test.describe("XSS Prevention", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = page.getByRole("link", { name: "Create New Account" });
    await loginPage.click();
  });

  test("TC_REG_087: XSS in First Name - Script Tag", async ({
    page,
    registrationPage,
  }) => {
    let requestPayload: any;

    await page.route("**/register", (route) => {
      requestPayload = route.request().postDataJSON();
      route.continue();
    });

    await registrationPage.fillRegistrationForm({
      firstName: "<script>alert('XSS')</script>",
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

    expect(requestPayload?.firstName).not.toBe("<script>alert('XSS')</script>");
  });

  test("TC_REG_087: XSS - Image Tag with onerror", async ({
    registrationPage,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "<img src=x onerror=alert('XSS')>",
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

    await expect(registrationPage.firstNameInput).not.toHaveValue(
      "<img src=x onerror=alert('XSS')>"
    );
  });

  test("TC_REG_087: XSS in Email Field", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: "<script>alert('XSS')</script>@mail.loc",
    });

    await registrationPage.createAccountButton.click();

    await expect(registrationPage.emailInput).toHaveValue(
      "<script>alert('XSS')</script>@mail.loc"
    );
  });

  test("TC_REG_087: XSS - SVG with onload", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm({
      firstName: "<svg/onload=alert('XSS')>",
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

    await expect(registrationPage.firstNameInput).not.toHaveValue(
      "<svg/onload=alert('XSS')>"
    );
  });
});
