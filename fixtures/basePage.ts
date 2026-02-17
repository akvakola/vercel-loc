import { test as base } from "@playwright/test";
import { Login } from "../pages/login.page";
import { RegistrationPage } from "../pages/registration.page";

export const test = base.extend<{
  login: Login;
  registrationPage: RegistrationPage;
}>({
  login: async ({ page }, use) => {
    await use(new Login(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});
