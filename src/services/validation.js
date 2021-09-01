import * as Yup from "yup";

export const emailValidation = Yup.string()
  .max(20, "Email must be shorter than 20 characters")
  .required();

export const passwordValidation = Yup.string()
  .min(5, "Password should be longer than 5 characters")
  .required();

export const nameValidation = Yup.string()
  .max(15, "Name must be shorter than 15 characters")
  .required();
