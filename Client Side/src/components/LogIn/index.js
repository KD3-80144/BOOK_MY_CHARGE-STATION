import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import Logo from "../../staticfiles/logo.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Footer from "../Footer";
import { images, api, postApiCall } from "../constant";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Book My Charge Station
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invalidUserError, setInvalidUserError] = React.useState(false);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    const res = await postApiCall(api.LOGIN, data);

    if (res.data.data.length > 0) {
      setInvalidUserError(false);
      localStorage.setItem("user_id", res.data.data[0].id);
      localStorage.setItem("user_role", res.data.data[0].role_id);
      localStorage.setItem("user_email", res.data.data[0].email);
      localStorage.setItem("first_name", res.data.data[0].first_name);
      if (res.data.data[0].role_id === 1) {
        navigate("/admin-dashboard");
      } else if (res.data.data[0].role_id === 2) {
        navigate("/station-owner-dashboard");
      } else if (res.data.data[0].role_id === 3) {
        navigate("/customer-dashboard");
      }
    } else {
      setInvalidUserError(true);
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
            p: 2,
            borderRadius: "16px",
            borderColor: "text.secondary",
            marginBottom: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ height: "100px", width: "140px" }}
              src={Logo}
            ></Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "10px" }}
            >
              Sign in
            </Typography>
            {invalidUserError ? (
              <Alert variant="filled" severity="error">
                Invalid Credentials, Please Enter Valid Credentials
              </Alert>
            ) : (
              ""
            )}
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                onClick={onLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"Don't have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Divider>
              <Chip label="OR" />
            </Divider>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Box>
      </Container>
    </>    
  );
}
