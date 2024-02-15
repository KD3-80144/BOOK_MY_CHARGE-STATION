import * as React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Footer from "../../Footer";
import { images, api, postApiCall, getApiCall } from "../../constant";
import { useNavigate } from "react-router-dom";

export default function CustomerRequests() {
  const [customerRequestData, setCustomerRequestData] = React.useState([]);

  const navigate = useNavigate();

  const getHistory = async () => {
    const res = await postApiCall(api.FETCH_CUSTOMER_REQUEST, {
      owner_id: localStorage.getItem("user_id"),
    });
    return res;
  };

  React.useEffect(() => {
    getHistory().then((res) => {
      if (res.data.data.length > 0) {
        setCustomerRequestData(res.data.data);
      }
    });
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#8bc34a" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="white" component="div">
            Book My Charge Station
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="main-content">
        <Paper>
          {customerRequestData.length > 0 ? (
            <div>
              <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ fontWeight: "700" }}>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Station Name</TableCell>
                      <TableCell>Vehicle Type</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Pincode</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone No</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Amount Paid</TableCell>
                      <TableCell>Payment Id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerRequestData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.station_name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.pincode}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.date_slot}</TableCell>
                        <TableCell>{row.time_slot}</TableCell>
                        <TableCell>{row.amount_paid}</TableCell>
                        <TableCell>{row.razorpay_payment_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            ""
          )}
        </Paper>
      </div>
      <Footer />
    </>
  );
}
