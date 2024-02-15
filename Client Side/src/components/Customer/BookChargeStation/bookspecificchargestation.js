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
import Footer from "../../Footer";
import { images, api, postApiCall, getApiCall } from "../../constant";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookSpecificChargeStation() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [totalunits, setTotalunits] = React.useState("");
  const [totalcost, setTotalcost] = React.useState("");
  const [statesData, setStatesData] = React.useState([]);
  const [cityData, setCityData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const { state: data } = useLocation();

  const navigate = useNavigate();

  const getState = async () => {
    const res = await getApiCall(api.GET_STATE);
    return res;
  };

  const getCity = async (stateid) => {
    const res = await postApiCall(api.GET_CITY, { state: stateid });
    return res;
  };
  React.useEffect(() => {
    getState().then((res) => {
      if (res.data.data.length > 0) {
        setStatesData(res.data.data);
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
  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onTotalUnitsChange = (e) => {
    setTotalunits(e.target.value);
  };

  React.useEffect(() => {
    setTotalcost(data.row.cost_per_unit * totalunits);
  }, [totalunits]);

  const payNow = async (e) => {
    e.preventDefault();
    const paymentData = {
      customerId: localStorage.getItem("user_id"),
      amount: totalcost,
      currency: "INR",
      mapId: data.row.id,
    };
    const res = await postApiCall(api.CREATE_ORDER, paymentData);
    if (res.data) {
      navigate("/payment", {
        state: {
          data: res.data,
        },
      });
    } else {
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
      <div className="main-content">
        <Paper>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            style={{ padding: "20px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Station Name: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.station_name}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Address: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.address}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    State: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.state}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    City: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.city}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Pincode: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.pincode}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Date: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.date}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Time: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.time}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Cost Per Unit: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    Rs. {data.row.cost_per_unit}
                  </text>
                </div>
                <hr></hr>
                <div>
                  <text
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Vehicle Type: &nbsp; &nbsp;
                  </text>
                  <text
                    style={{
                      float: "right",
                    }}
                  >
                    {data.row.type}
                  </text>
                </div>
                <hr></hr>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Units"
                  label="Required Total Units"
                  id="Units"
                  autoComplete="units"
                  value={totalunits}
                  onChange={onTotalUnitsChange}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#8bc34a" }}
                  onClick={payNow}
                  style={{
                    width: "40%",
                    marginLeft: "80%",
                  }}
                >
                  Pay Now - Rs. {totalcost}
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
