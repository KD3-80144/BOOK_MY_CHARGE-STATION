import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import user from "../../../staticfiles/user.png";
import customer from "../../../staticfiles/customer.png";
import owner from "../../../staticfiles/owner.png";
import paidCustomer from "../../../staticfiles/paidCustomer.png";
import totalPaidAmount from "../../../staticfiles/totalPaidAmount.png";
import station from "../../../staticfiles/station.png";
import feedback from "../../../staticfiles/feedback.png";
import { api, getApiCall, postApiCall } from "../../constant";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = React.useState([]);
  const [dashboardDetails, setDashboardDetails] = React.useState([]);

  const getDashboardData = async () => {
    const res = await getApiCall(api.GET_ADMIN_DASHBOARD_DATA);
    setDashboardData(res.data.data);
  };

  const getDashboardDetails = async () => {
    const res = await getApiCall(api.GET_ADMIN_DASHBOARD_DETAILS);
    setDashboardDetails(res.data.data);
  };

  React.useEffect(() => {
    getDashboardData();
    getDashboardDetails();
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
                  {dashboardData?.totalCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Onboraded Users
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
                image={customer}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.customerCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Onboraded Customers
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
                image={owner}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardData?.ownerCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Onboraded Owners
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                  {dashboardDetails?.totalCutomerPaidCount?.[0]?.count}
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
                  Rs.{dashboardDetails?.totalPaidAmount?.[0]?.count}
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
                image={station}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dashboardDetails?.onboardedStationCount?.[0]?.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Onboraded Stations
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                  {dashboardDetails?.feedbackCount?.[0]?.count}
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
