// tests/registration/security/password-masking.spec.ts

import { expect } from "@playwright/test";
import { test } from "../../../fixtures/basePage";

test.describe("Password Masking", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = page.getByRole("link", { name: "Create New Account" });
    await loginPage.click();
  });

  test("TC_REG_085: Password Field is Masked", async ({ registrationPage }) => {
    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("TC_REG_085: Confirm Password Field is Masked", async ({
    registrationPage,
  }) => {
    await expect(registrationPage.confirmPasswordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("TC_REG_085: Password Value is Hidden", async ({ registrationPage }) => {
    await registrationPage.passwordInput.fill("MySecretPassword123");

    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );
    await expect(registrationPage.passwordInput).toHaveValue(
      "MySecretPassword123"
    );
  });
});
