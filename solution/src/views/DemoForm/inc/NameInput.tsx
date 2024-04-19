import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { isNameValid } from "../../../mock-api/apis";
import { ChangeEventHandler, useState } from "react";

const NameInput = ({
  enteredName,
  setEnteredName,
  setIsError,
}: {
  enteredName: string;
  setEnteredName: any;
  setIsError: any;
}) => {
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkName = async (name: string) => {
    const isValid = await isNameValid(name);
    setLoading(false);
    if (!isValid) {
      setNameError(true);
      setIsError(true);
    } else {
      setNameError(false);
      setIsError(false);
    }

    return isValid;
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: any) => {
    setNameError(false);
    setLoading(true);
    checkName(event.target.value);
    setEnteredName(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{ paddingBottom: "1rem" }}>
      <InputLabel htmlFor="my-name">Name</InputLabel>
      <Input
        id="my-name"
        aria-describedby="my-helper-text"
        onChange={handleChange}
        value={enteredName}
      />
      {loading && "..."}
      {nameError && (
        <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
          This name has already been taken.
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NameInput;
