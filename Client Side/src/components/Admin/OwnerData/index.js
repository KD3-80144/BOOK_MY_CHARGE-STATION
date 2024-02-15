import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../index.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { api, getApiCall, postApiCall } from "../../constant";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function OwnerData() {
  const [ownerData, setOwnerData] = React.useState([]);
  const [ownerDeleteFlag, setOwnerDeleteFlag] = React.useState(false);

  const getOwnerList = async () => {
    const res = await getApiCall(api.GET_OWNER_LIST);
    setOwnerData(res.data.data);
  };

  const deleteOwner = async (event, ownerData) => {
    const data = {
      isdelete: 1,
      id: ownerData.id,
    };
    const res = await postApiCall(api.UPDATE_OWNER_CUSTOMER, data);
    setOwnerDeleteFlag(true);
  };

  React.useEffect(() => {
    getOwnerList();
  }, []);

  return (
    <div className="main-content">
      {ownerDeleteFlag ? (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          style={{ width: "100%" }}
          autoHideDuration={6000}
          open={ownerDeleteFlag}
        >
          <SnackbarContent
            style={{
              backgroundColor: "MediumSeaGreen",
              width: "96%",
            }}
            message={
              <span id="client-snackbar">Owner Deleted Successfully!</span>
            }
          />
        </Snackbar>
      ) : (
        ""
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownerData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.first_name} &nbsp;
                  {row.last_name}
                </TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={(event) => {
                      deleteOwner(event, row);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
