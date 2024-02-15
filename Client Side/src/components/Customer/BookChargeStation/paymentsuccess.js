import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import PS from "../../../staticfiles/PS.png";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/book-charge-station");
  };
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
          <div style={{ marginLeft: "40%" }}>
            <Avatar sx={{ height: "100px", width: "140px" }} src={PS}></Avatar>
            <h3>Payment Successfull</h3>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                onClick={onBack}
                style={{
                  width: "64%",
                  marginLeft: "71%",
                }}
              >
                Back To Book Station Page
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
