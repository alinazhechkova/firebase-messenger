import React, { Dispatch, SetStateAction } from "react";

import { FormControl, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const EmailInput = ({ value, setValue }: Props) => {
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
    </FormControl>
  );
};

export default EmailInput;
