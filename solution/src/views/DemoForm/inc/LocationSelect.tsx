import * as React from "react";
import { ReactElement, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect({
  locations = [],
  enteredLocation,
  setEnteredLocation,
}: {
  locations: string[];
  enteredLocation: string;
  setEnteredLocation: any;
}) {
  const [location, setLocation] = React.useState("");
  //TODO: FIX ANY
  const [menuItems, setMenuItems] = React.useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
    setEnteredLocation(event.target.value as string);
  };

  const createMenuItem = (location: string) => (
    <MenuItem value={location} key={location}>
      {location}
    </MenuItem>
  );

  useEffect(() => {
    if (locations.length > 0) {
      const MenuItems = locations.map((location) => {
        return createMenuItem(location);
      });
      setMenuItems(MenuItems);
    }
  }, [locations]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Location</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={enteredLocation}
        label="Location"
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}
