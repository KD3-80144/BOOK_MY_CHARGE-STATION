import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { api, getApiCall, postApiCall } from "../../constant";
import user from "../../../staticfiles/user.png";
import customer from "../../../staticfiles/customer.png";
import owner from "../../../staticfiles/owner.png";
import paidCustomer from "../../../staticfiles/paidCustomer.png";
import totalPaidAmount from "../../../staticfiles/totalPaidAmount.png";
import station from "../../../staticfiles/station.png";
import feedback from "../../../staticfiles/feedback.png";

export default function CustomerDashboard() {
  const [dashboardData, setDashboardData] = React.useState([]);

  const getDashboardData = async () => {
    const res = await postApiCall(api.GET_CUSTOMER_DASHBOARD_DATA, {
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
                image={user}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.totalBookedCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Bookings
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
                  Rs.{dashboardData?.amountpaid?.[0]?.count || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Paid Amount
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
                image={feedback}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.feedbackCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Feedbacks
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
