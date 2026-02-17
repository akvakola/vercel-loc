import { generateRandomString } from "../helpers/helpers";

export const FIRST_NAME = "John";
export const LAST_NAME = "Doe";
export const PHONE = "1234567890";
export const STREET = "123 Main Street";
export const CITY = "New York";
export const ZIP_CODE = "10001";
export const PASSWORD = "Test@1234";

export const generateEmail = () => `mail${generateRandomString()}@mail.loc`;
