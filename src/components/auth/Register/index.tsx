import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { createUser } from "../../../firebase/requests/auth";

import { Button } from "@material-ui/core";
import LoginInput from "../../common/CustomInput/LoginInput";
import PasswordInput from "../../common/CustomInput/PasswordInput";
import NameInput from "../../common/CustomInput/NameInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

import "../Auth.scss";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const currentUser = useSelector((state: RootState) => state);

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
          <LoginInput value={login} setValue={setLogin} />
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
