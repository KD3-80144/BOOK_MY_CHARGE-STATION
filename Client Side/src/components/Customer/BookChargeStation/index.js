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

export default function BookChargeStation() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [statesData, setStatesData] = React.useState([]);
  const [cityData, setCityData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const [typeData, setTypeData] = React.useState([]);
  const [type, setType] = React.useState("");

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

  const onTypeChange = (e) => {
    setType(e.target.value);
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

  const onSearch = async (e) => {
    e.preventDefault();
    const searchBody = {
      state: state,
      city: city,
      pincode: pincode,
      type: type,
    };
    const res = await postApiCall(api.GET_STATION_LIST, searchBody);
    if (res.data.data.length > 0) {
      setSearchData(res.data.data);
    } else {
      setSearchData([]);
    }
  };

  const bookChargeStation = async (e, row) => {
    e.preventDefault();
    navigate(`/book-station/${row.id}`, {
      state: {
        row: row,
      },
    });
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
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            style={{ padding: "20px" }}
          >
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
                <FormControl fullWidth>
                  <InputLabel id="role" style={{ marginTop: "15px" }}>
                    Vehicle Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
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
            <Grid container>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                  onClick={onSearch}
                  style={{
                    width: "27%",
                    marginLeft: "87%",
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        {searchData.length > 0 ? (
          <div>
            <h3 style={{ marginLeft: "43%" }}>Available Stations</h3>
            <hr
              style={{
                width: "19%",
                marginLeft: "42%",
                border: "2px dotted #8bc34a",
                marginTop: "-14px",
              }}
            ></hr>
            <TableContainer component={Paper} style={{ marginTop: "10px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>Station Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Cost Per Unit</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchData.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.owner_name}</TableCell>
                      <TableCell>{row.station_name}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.cost_per_unit}</TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="outlined"
                          startIcon={<ElectricalServicesIcon />}
                          size="small"
                          onClick={(e) => bookChargeStation(e, row)}
                        >
                          Book Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
}
