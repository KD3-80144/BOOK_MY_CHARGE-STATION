import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Footer from "../Footer";
import { api, postApiCall } from "../constant";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmpassword] = React.useState("");
  const [forgotPasswordFlag, setForgotPasswordFlag] = React.useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmpassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    };

    const res = await postApiCall(api.FORGOT_PASSWORD, data);

    if (res.data.data.length > 0) {
      setForgotPasswordFlag(true);
    } else {
      setForgotPasswordFlag(false);
    }
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
      {forgotPasswordFlag ? (
        <Alert
          variant="filled"
          severity="success"
          style={{
            marginTop: "18px",
            marginBottom: "22px",
            width: "70%",
            marginLeft: "14%",
          }}
        >
          Password Successfully Set !!!
        </Alert>
      ) : (
        ""
      )}
      <Paper>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          style={{ padding: "20px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onEmailChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onPasswordChange}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmmpassword"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                autoComplete="Confirm Password"
                value={confirmpassword}
                onChange={onConfirmPasswordChange}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                onClick={onSubmit}
                style={{
                  width: "27%",
                  marginLeft: "70%",
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                onClick={() => navigate("/")}
                style={{
                  width: "31%",
                  marginLeft: "2%",
                }}
              >
                Back To Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Footer />
    </>
  );
}
