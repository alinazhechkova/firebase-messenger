import React, { Dispatch, SetStateAction } from "react";

import { FormControl, FormHelperText, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
}

const EmailInput = ({ value, setValue, error }: Props) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.substring(0, 30);
    setValue(email);
  };

  return (
    <FormControl variant="standard" fullWidth margin="normal">
      <label htmlFor="emailInput">Email</label>
      <Input
        fullWidth
        type="text"
        className="login-input"
        value={value}
        onChange={onInput}
        id="emailInput"
      />
      <FormHelperText id="component-error-text" className="form-helper">
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default EmailInput;
