import React, { Dispatch, SetStateAction } from "react";
import { FormControl, Input } from "@material-ui/core";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  err?: string;
}

const NameInput = ({ value, setValue, err }: Props) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.substring(0, 20);
    setValue(newValue);
  };

  return (
    <FormControl variant="standard">
      <label htmlFor={"nameInput"}>Name</label>
      <Input
        fullWidth
        type="text"
        className="name-input"
        value={value}
        onChange={onInput}
        id="nameInput"
      />
    </FormControl>
  );
};

export default NameInput;
