import React, { Dispatch, SetStateAction } from "react";
import { FormControl, FormHelperText, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
}

const NameInput = ({ value, setValue, error }: Props) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.substring(0, 20);
    setValue(newValue);
  };

  return (
    <FormControl variant="standard" fullWidth margin="normal">
      <label htmlFor="nameInput">Name</label>
      <Input
        fullWidth
        type="text"
        className="name-input"
        value={value}
        onChange={onInput}
        id="nameInput"
      />
      <FormHelperText id="component-error-text" className="form-helper">
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default NameInput;
