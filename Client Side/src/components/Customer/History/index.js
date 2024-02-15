import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import Footer from "../../Footer";
import { images, api, postApiCall, getApiCall } from "../../constant";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [historyData, setHistoryData] = React.useState([]);

  const navigate = useNavigate();

  const getHistory = async () => {
    const res = await postApiCall(api.FETCH_CUSTOMER_HISTORY, {
      customerId: localStorage.getItem("user_id"),
    });
    return res;
  };

  React.useEffect(() => {
    getHistory().then((res) => {
      if (res.data.data.length > 0) {
        setHistoryData(res.data.data);
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
          {historyData.length > 0 ? (
            <div>
              <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ fontWeight: "700" }}>
                    <TableRow>
                      <TableCell>Station Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Amount Paid</TableCell>
                      <TableCell>Payment Id</TableCell>
                      <TableCell>Booked Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.station_name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.date_slot}</TableCell>
                        <TableCell>{row.time_slot}</TableCell>
                        <TableCell>{row.amount_paid}</TableCell>
                        <TableCell>{row.razorpay_payment_id}</TableCell>
                        <TableCell>{row.created_date}</TableCell>
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
