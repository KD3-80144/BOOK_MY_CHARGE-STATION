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

import Footer from "../Footer";
import { images, api, postApiCall, getApiCall } from "../constant";
import { useNavigate } from "react-router-dom";

export default function FeedbackList() {
  const [feedbackData, setFeedbackData] = React.useState([]);

  const getFeedback = async () => {
    const res = await getApiCall(api.GET_FEEDBACK);
    return res;
  };

  React.useEffect(() => {
    getFeedback().then((res) => {
      if (res.data.data.length > 0) {
        setFeedbackData(res.data.data);
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
          {feedbackData.length > 0 ? (
            <div>
              <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ fontWeight: "700" }}>
                    <TableRow>
                      <TableCell>User Id</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone No</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feedbackData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.role}</TableCell>
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
