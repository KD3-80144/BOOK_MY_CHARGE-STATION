import * as React from "react";
import Typography from "@mui/material/Typography";
import { api, getApiCall, postApiCall } from "../../constant";
import paidCustomer from "../../../staticfiles/paidCustomer.png";
import totalPaidAmount from "../../../staticfiles/totalPaidAmount.png";
import station from "../../../staticfiles/station.png";
import feedback from "../../../staticfiles/feedback.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function StationOwnerDashboard() {
  const [dashboardData, setDashboardData] = React.useState([]);

  const getDashboardData = async () => {
    const res = await postApiCall(api.GET_OWNER_DASHBOARD_DATA, {
      user_id: localStorage.getItem("user_id"),
    });
    setDashboardData(res.data.data);
  };

  React.useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="main-content">
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item lg={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="290"
                image={station}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.onboardedStationCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Onboraded Stations
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="290"
                image={paidCustomer}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.customerCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Paid Customers
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="290"
                image={totalPaidAmount}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Rs.{dashboardData?.receivedAmount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Recived Amount
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
