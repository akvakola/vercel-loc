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

test.describe("Sensitive Data in URL", () => {
  test("TC_REG_088: HTTPS Connection", async ({ page }) => {
    await page.goto("/");

    const url = page.url();
    expect(url).toMatch(/^https:\/\//);
  });

  test("TC_REG_089: No Sensitive Data in Registration URL", async ({
    page,
    registrationPage,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();

    const email = `mail${generateRandomString()}@mail.loc`;
    const password = PASSWORD;

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

    await registrationPage.termsAndConditionsCheckbox.check();
    await registrationPage.createAccountButton.click();

    const currentURL = page.url();

    expect(currentURL).not.toContain(email);
    expect(currentURL).not.toContain(password);
  });

  test("TC_REG_089: Sensitive Data in Dashboard URL", async ({
    page,
    registrationPage,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create New Account" }).click();

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
