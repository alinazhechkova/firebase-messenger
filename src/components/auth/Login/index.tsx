import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signIn } from "../../../firebase/requests/auth";

import { MessengerContext } from "../../../context/Provider";

import EmailInput from "../../common/CustomInput/EmailInput";
import PasswordInput from "../../common/CustomInput/PasswordInput";

import { Button } from "@material-ui/core";

import validateRegister, { validateEmail } from "../../../utils/validation";
import { defaultErrorObj } from "../Register";

import "../Auth.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>(defaultErrorObj);
  const { currentUser } = useContext(MessengerContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateRegister({ email, password }, setErrors);

    if (!validateEmail(email) && password.trim()) {
      signIn(email, password);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login form-wrapper">
      <div className="container">
        <form className="login__form" onSubmit={onSubmit}>
          <EmailInput value={email} setValue={setEmail} error={errors?.email} />
          <PasswordInput
            value={password}
            setValue={setPassword}
            error={errors?.password}
          />
          <Button
            type="submit"
            className="custom-button"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign In
          </Button>
          <p>
            Don't have an account?{" "}
            <Link className="login__link" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
