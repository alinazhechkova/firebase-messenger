import React, { SetStateAction } from "react";
import { FormDataType } from "@/components/auth/Register";

export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Please enter your data";
  }
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email)) {
    return "Please enter your email address in format: yourname@example.com";
  }

  return "";
};

const validateRegister = (
  object: FormDataType,
  setError: React.Dispatch<SetStateAction<Partial<FormDataType>>>
): void => {
  const errorObj: FormDataType = {
    name: "",
    email: "",
    password: "",
  };

  errorObj.email = validateEmail(object.email);

  Object.keys(object).forEach((key) => {
    if (object[key].trim() === "") {
      errorObj[key] = "Please enter your data";
    }
  });

  setError(errorObj);
};

export default validateRegister;
