import { Button, styled } from "@mui/material";
import NameInput from "./inc/NameInput";
import LocationSelect from "./inc/LocationSelect";
import { useEffect, useState } from "react";
import { getLocations } from "../../mock-api/apis";
import AddedNameLocationDataTable from "./inc/AddedNameLocationDataTable";

const Div = styled("div")`
  margin: 1rem;
`;

const DemoForm = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredLocation, setEnteredLocation] = useState<string>("");
  const [enteredData, setEnteredData] = useState<any>([]);
  const [isError, setIsError] = useState(false);

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
    setEnteredData([]);
  };

  const onAdd = () => {
    setEnteredData((currentData) => {
      const newData = [
        ...currentData,
        { name: enteredName, location: enteredLocation },
      ];
      return newData;
    });
  };

  return (
    <>
      <Div
        sx={{ border: "4px solid blue", borderRadius: "2rem", padding: "1rem" }}
      >
        <NameInput
          enteredName={enteredName}
          setEnteredName={setEnteredName}
          setIsError={setIsError}
        />
        <LocationSelect
          locations={locations}
          setEnteredLocation={setEnteredLocation}
          enteredLocation={enteredLocation}
        />
        <Button onClick={onClear}>Clear</Button>{" "}
        <Button
          onClick={onAdd}
          disabled={isError || !enteredName || !enteredLocation}
        >
          Add
        </Button>
      </Div>

      <AddedNameLocationDataTable enteredData={enteredData} />
    </>
  );
};

export default DemoForm;
