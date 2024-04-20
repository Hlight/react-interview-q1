import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { isNameValid } from "../../../mock-api/apis";
import { ChangeEventHandler, useState } from "react";
import Spinner from "../../../components/Spinner";
import Progress from "../../../components/Progress";

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
      // setNameError(false);
      setIsError(false);
    }

    return isValid;
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: any) => {
    setNameError(false);
    setLoading(true);
    setEnteredName(event.target.value);
    checkName(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{ paddingBottom: "1rem" }}>
      <InputLabel htmlFor="my-name">Name{loading && <Progress />}</InputLabel>
      <Input
        id="my-name"
        aria-describedby="my-helper-text"
        onChange={handleChange}
        value={enteredName}
      />

      {nameError && (
        <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
          This name has already been taken.
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NameInput;
