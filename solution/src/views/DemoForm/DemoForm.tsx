import { Box, Button, styled } from "@mui/material";
import NameInput from "./inc/NameInput";
import LocationSelect from "./inc/LocationSelect";
import { useEffect, useState } from "react";
import { getLocations } from "../../mock-api/apis";
import AddedNameLocationDataTable from "./inc/AddedNameLocationDataTable";

const Div = styled("div")`
  margin: 1rem;
  background: rgb(169, 250, 251);
  background: linear-gradient(
    0deg,
    rgba(169, 250, 251, 1) 0%,
    rgba(222, 237, 236, 1) 100%
  );
  input,
  .MuiInputBase-root {
    background: white;
  }
`;

const DemoForm = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredLocation, setEnteredLocation] = useState<string>("");
  const [enteredData, setEnteredData] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const [isNameCheckLoading, setIsNameCheckLoading] = useState(true);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    const getMyLocations = async () => {
      const myLocations = await getLocations();
      console.log(myLocations);
      setLocations(myLocations);
    };
    getMyLocations();
  }, []);

  const onClear = () => {
    setEnteredName("");
    setEnteredLocation("");
    // setEnteredData([]);
    setIsError(false);
    setNameError(false);
  };

  const onAdd = () => {
    setEnteredData((currentData) => {
      const newData = [
        ...currentData,
        { name: enteredName, location: enteredLocation },
      ];
      return newData;
    });
    onClear();
  };

  const isAddDisabled = () => {
    console.log(
      `${isError} || ${isNameCheckLoading} || ${!enteredName} || ${!enteredLocation}`
    );
    return isError || isNameCheckLoading || !enteredName || !enteredLocation;
  };

  return (
    <>
      <Div
        sx={{
          border: "4px solid #a9fafb",
          borderRadius: "2rem",
          padding: "1rem",
        }}
      >
        <NameInput
          enteredName={enteredName}
          setEnteredName={setEnteredName}
          setIsError={setIsError}
          nameError={nameError}
          setNameError={setNameError}
          setIsNameCheckLoading={setIsNameCheckLoading}
        />
        <LocationSelect
          locations={locations}
          setEnteredLocation={setEnteredLocation}
          enteredLocation={enteredLocation}
        />
        <Button onClick={onClear}>Clear</Button>{" "}
        <Button onClick={onAdd} disabled={isAddDisabled()}>
          Add
        </Button>
      </Div>

      <Box sx={{ padding: "1rem 4rem" }}>
        <AddedNameLocationDataTable enteredData={enteredData} />
      </Box>
    </>
  );
};

export default DemoForm;
