// tests/registration/security/sql-injection.spec.ts

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

test.describe("SQL Injection Protection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = page.getByRole("link", { name: "Create New Account" });
    await loginPage.click();
  });

  test("TC_REG_086: SQL Injection in First Name", async ({
    page,
    registrationPage,
  }) => {
    let requestPayload: any;

    await page.route("**/register", (route) => {
      requestPayload = route.request().postDataJSON();
      route.continue();
    });

    await registrationPage.fillRegistrationForm({
      firstName: "' OR '1'='1",
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

    expect(requestPayload?.firstName).not.toBe("' OR '1'='1");
  });

  test("TC_REG_086: SQL Injection - DROP TABLE", async ({
    page,
    registrationPage,
  }) => {
    let requestPayload: any;

    await page.route("**/register", (route) => {
      requestPayload = route.request().postDataJSON();
      route.continue();
    });

    await registrationPage.fillRegistrationForm({
      firstName: "'; DROP TABLE users--",
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
    console.log(requestPayload);
    expect(requestPayload?.firstName).not.toBe("'; DROP TABLE users--");
  });

  test("TC_REG_086: SQL Injection in Email", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      firstName: FIRST_NAME,
      lastName: LAST_NAME,
      email: "admin'--@mail.loc",
      phone: PHONE,
      street: STREET,
      city: CITY,
      zipCode: ZIP_CODE,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    });

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    await expect(registrationPage.emailInput).not.toHaveValue(
      "admin'--@mail.loc"
    );
  });
});
