import React, { useContext, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { createUser } from "../../../firebase/requests/auth";

import { MessengerContext } from "../../../Provider";

import EmailInput from "../../common/CustomInput/EmailInput";
import PasswordInput from "../../common/CustomInput/PasswordInput";
import NameInput from "../../common/CustomInput/NameInput";

import { Button } from "@material-ui/core";

import "../Auth.scss";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { currentUser } = useContext(MessengerContext);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { login, password, name };
    createUser(data);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up form-wrapper">
      <div className="container">
        <form className="sign-up-form" onSubmit={submit}>
          <EmailInput value={login} setValue={setLogin} />
          <PasswordInput value={password} setValue={setPassword} />
          <NameInput value={name} setValue={setName} />
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
