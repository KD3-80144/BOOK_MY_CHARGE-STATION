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

export default function AddFeedback() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = React.useState("");
  const [feedbackSaveFlag, setFeedbackSaveFlag] = React.useState(false);

  const onFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id: localStorage.getItem("user_id"),
      feedback: feedback,
    };

    const res = await postApiCall(api.ADD_FEEDBACK, data);

    if (res.data.data.length > 0) {
      setFeedbackSaveFlag(true);
    } else {
      setFeedbackSaveFlag(false);
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
        {feedbackSaveFlag ? (
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
            Feedback Provided Successfully!!!
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
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Feedback"
                  label="Feedback"
                  type="feedback"
                  id="feedback"
                  autoComplete="feedback"
                  value={feedback}
                  onChange={onFeedbackChange}
                />
              </Grid>
              <Grid item xs={2}></Grid>
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
                    width: "38%",
                    marginLeft: "70%",
                  }}
                >
                  Submit Feedback
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
