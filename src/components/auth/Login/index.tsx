import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { Button } from "@material-ui/core";
import LoginInput from "../../common/CustomInput/LoginInput";
import PasswordInput from "../../common/CustomInput/PasswordInput";
import { signIn } from "../../../firebase/requests/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

import "../Auth.scss";
import { MessengerContext } from "../../../Provider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useContext(MessengerContext);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(email, password);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login form-wrapper">
      <div className="container">
        <form className="login__form" onSubmit={submit}>
          <LoginInput value={email} setValue={setEmail} />
          <PasswordInput value={password} setValue={setPassword} />
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
