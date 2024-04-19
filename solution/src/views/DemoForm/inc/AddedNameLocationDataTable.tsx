import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

function createData(name: string, location: string) {
  return { name, location };
}

// const rows = [createData("Test Name1", "Seattle, WA")];

export default function BasicTable({
  enteredData,
}: {
  enteredData: { name: string; location: string }[];
}) {
  const [rows, setRows] = useState<{ name: string; location: string }[]>([
    { name: "Test Name1", location: "Test Location" },
  ]);
  useEffect(() => {
    console.log(enteredData);
    setRows(enteredData);
  }, [enteredData]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name + "-" + index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
