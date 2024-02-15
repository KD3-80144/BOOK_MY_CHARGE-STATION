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
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Footer from "../../Footer";
import { images, api, postApiCall, getApiCall } from "../../constant";
import { useNavigate } from "react-router-dom";

export default function ChargeStationData() {
  const [stationname, setStationname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [statesData, setStatesData] = React.useState([]);
  const [cityData, setCityData] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [typeData, setTypeData] = React.useState([]);
  const [type, setType] = React.useState("");
  const [dateTimeForamt, setDateTimeForamt] = React.useState(
    dayjs("2022-04-17T15:30")
  );
  const [stationAddedFlag, setStationAddedFlag] = React.useState(false);

  const navigate = useNavigate();

  const getState = async () => {
    const res = await getApiCall(api.GET_STATE);
    return res;
  };

  const getCity = async (stateid) => {
    const res = await postApiCall(api.GET_CITY, { state: stateid });
    return res;
  };

  const getType = async () => {
    const res = await getApiCall(api.GET_VEHICLE_TYPE);
    return res;
  };

  React.useEffect(() => {
    getState().then((res) => {
      if (res.data.data.length > 0) {
        setStatesData(res.data.data);
      }
    });
  }, []);

  React.useEffect(() => {
    getType().then((res) => {
      if (res.data.data.length > 0) {
        setTypeData(res.data.data);
      }
    });
  }, []);

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
  const onStationNameChange = (e) => {
    setStationname(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onCostChange = (e) => {
    setCost(e.target.value);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onPincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const onAddStation = async (e) => {
    e.preventDefault();
    const stationData = {
      station_name: stationname,
      owner_id: localStorage.getItem("user_id"),
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      date: date,
      type: type,
      cost_per_unit: cost,
      time: time,
    };

    const res = await postApiCall(api.ADD_CHAREGE_STATION, stationData);
    if (res.data.data.length > 0) {
      setStationAddedFlag(true);
    } else {
      setStationAddedFlag(false);
    }
  };

  React.useEffect(() => {
    const formattedDate = dateTimeForamt.format("YYYY-MM-DD HH:mm:ss");
    const dateTime = formattedDate.split(" ");
    setDate(dateTime[0]);
    setTime(dateTime[1]);
  }, [dateTimeForamt]);

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
        {stationAddedFlag ? (
          <Alert
            variant="filled"
            severity="success"
            style={{
              marginTop: "18px",
              marginBottom: "22px",
              width: "50%",
              marginLeft: "24%",
            }}
          >
            Station Added Successfully!!!
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
                  id="Station Name"
                  label="Station Name"
                  name="stationname"
                  autoComplete="stationname"
                  value={stationname}
                  onChange={onStationNameChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="type" style={{ marginTop: "15px" }}>
                    Vehicle Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="State"
                    onChange={onTypeChange}
                    style={{ marginTop: "14px" }}
                  >
                    {typeData.map((item) => {
                      return <MenuItem value={item.id}>{item.type}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="cost"
                  label="Cost"
                  id="cost"
                  autoComplete="Cost"
                  value={cost}
                  onChange={onCostChange}
                />
              </Grid>
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
                  <InputLabel id="city" style={{ marginTop: "15px" }}>
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
            </Grid>
            <Grid container spacing={2}>
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
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Select Date and Time"
                      value={dateTimeForamt}
                      onChange={(newValue) => {
                        setDateTimeForamt(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                  onClick={onAddStation}
                  style={{
                    width: "32%",
                    marginLeft: "80%",
                  }}
                >
                  Add Station
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
      <Footer />
    </>
  );
}
