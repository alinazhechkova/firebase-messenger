import React, { Dispatch, SetStateAction } from "react";

import { FormControl, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const LoginInput = ({ value, setValue }: Props) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.substring(0, 30);
    setValue(email);
  };

  return (
    <FormControl variant="standard" fullWidth margin="normal">
      <label htmlFor={"loginInput"}>Email</label>
      <Input
        fullWidth
        type="text"
        className={`login-input`}
        value={value}
        onChange={onInput}
        id="loginInput"
      />
    </FormControl>
  );
};

export default LoginInput;
