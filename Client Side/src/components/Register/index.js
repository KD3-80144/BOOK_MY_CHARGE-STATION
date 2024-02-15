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
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

import Footer from "../Footer";
import { images, api, postApiCall, getApiCall } from "../constant";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmpassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [invalidUserError, setInvalidUserError] = React.useState(false);
  const [statesData, setStatesData] = React.useState([]);
  const [cityData, setCityData] = React.useState([]);
  const [roles, setRolesData] = React.useState([]);
  const [registerFlag, setRegisterFlag] = React.useState(false);

  const getState = async () => {
    const res = await getApiCall(api.GET_STATE);
    return res;
  };

  const getCity = async (stateid) => {
    const res = await postApiCall(api.GET_CITY, { state: stateid });
    return res;
  };

  const getRole = async () => {
    const res = await getApiCall(api.GET_ROLE);
    return res;
  };

  React.useEffect(() => {
    getState().then((res) => {
      if (res.data.data.length > 0) {
        setStatesData(res.data.data);
      }
    });
    getRole().then((res) => {
      if (res.data.data.length > 0) {
        setRolesData(res.data.data);
      }
    });
  }, []);

  const onFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastname(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmpassword(e.target.value);
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onStateChange = (e) => {
    setState(e.target.value);
    getCity(e.target.value).then((res) => {
      if (res.data.data.length > 0) {
        setCityData(res.data.data);
      } else {
        setCityData([]);
      }
    });
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onPincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      phone: phone,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      role: role,
    };

    const res = await postApiCall(api.REGISTER, data);

    if (res.data.data.length > 0) {
      setRegisterFlag(true);
    } else {
      setRegisterFlag(false);
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
      {registerFlag ? (
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
          Register Successfully!!!
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
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="First Name"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                value={firstname}
                onChange={onFirstNameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Last Name"
                label="Last Name"
                type="lastname"
                id="lastname"
                autoComplete="lastname"
                value={lastname}
                onChange={onLastNameChange}
              />
            </Grid>
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
          </Grid>
          <Grid container spacing={2}>
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
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="role" style={{ marginTop: "15px" }}>
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={onRoleChange}
                  style={{ marginTop: "14px" }}
                >
                  {roles.map((item) => {
                    return <MenuItem value={item.id}>{item.role}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Phone"
                label="Phone No"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={onPhoneChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Address"
                label="Address"
                id="address"
                autoComplete="Address"
                value={address}
                onChange={onAddressChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="role" style={{ marginTop: "15px" }}>
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="State"
                  onChange={onStateChange}
                  style={{ marginTop: "14px" }}
                >
                  {statesData.map((item) => {
                    return <MenuItem value={item.id}>{item.state}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="role" style={{ marginTop: "15px" }}>
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="City"
                  onChange={onCityChange}
                  style={{ marginTop: "14px" }}
                >
                  {cityData.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Pincode"
                label="Pincode"
                id="Pincode"
                autoComplete="pincode"
                value={pincode}
                onChange={onPincodeChange}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                onClick={onRegister}
                style={{
                  width: "27%",
                  marginLeft: "70%",
                }}
              >
                Register
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
