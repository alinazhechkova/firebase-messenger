import React, { Dispatch, SetStateAction, useState } from "react";

import { FormControl, FormHelperText, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
}

const PasswordInput = ({ value, setValue, error }: Props) => {
  const [show, setShow] = useState(false);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.substring(0, 15);
    setValue(newValue);
  };

  const showPassword = show ? "Hide" : "Show";

  return (
    <div className="password-field">
      <FormControl variant="standard" fullWidth margin="normal">
        <label htmlFor="passwordInput">Password</label>
        <Input
          type={`${show ? "text" : "password"}`}
          className="login-input login-input__password input-password"
          value={value}
          endAdornment={
            <span className="hide-btn" onClick={() => setShow(!show)}>
              {showPassword}
            </span>
          }
          onChange={onInput}
          id="passwordInput"
        />
        <FormHelperText id="component-error-text" className="form-helper">
          {error}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default PasswordInput;
