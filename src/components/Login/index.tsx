import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { Button } from "@material-ui/core";
import LoginInput from "../common/CustomInput/LoginInput";
import PasswordInput from "../common/CustomInput/PasswordInput";
import { signIn } from "../../firebase/requests/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useSelector((state: RootState) => state);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(email, password);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="login form-wrapper">
        <form className="login-form" onSubmit={submit}>
          <LoginInput value={email} setValue={setEmail} />
          <PasswordInput value={password} setValue={setPassword} />
          <Button
            type="submit"
            className="custom-button custom-button-margin"
            variant="contained"
            color="secondary"
          >
            Sign In
          </Button>
          <p>
            Have an account?{" "}
            <Link className="link-to-page" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
