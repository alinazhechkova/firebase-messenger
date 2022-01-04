import React, { useContext, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { createUser } from "../../../firebase/requests/auth";

import { MessengerContext } from "../../../context/Provider";

import EmailInput from "../../common/CustomInput/EmailInput";
import PasswordInput from "../../common/CustomInput/PasswordInput";
import NameInput from "../../common/CustomInput/NameInput";

import { Button } from "@material-ui/core";

import "../Auth.scss";
import validateRegister, { validateEmail } from "../../../utils/validation";

export type FormDataType = {
  name?: string;
  email: string;
  password: string;
};

export const defaultErrorObj = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [errors, setErrors] = useState<Partial<FormDataType>>(defaultErrorObj);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password, name };
    validateRegister(data, setErrors);

    if (!validateEmail(email) && password.trim() && name.trim()) {
      createUser(data);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { currentUser } = useContext(MessengerContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up form-wrapper">
      <div className="container">
        <form className="sign-up-form" onSubmit={onSubmit}>
          <EmailInput value={email} setValue={setEmail} error={errors?.email} />
          <PasswordInput
            value={password}
            setValue={setPassword}
            error={errors?.password}
          />
          <NameInput value={name} setValue={setName} error={errors?.name} />
          <Button
            type="submit"
            className="custom-button custom-button__register"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </Button>
          <p>
            Have an account?{" "}
            <Link className="link-to-page" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
