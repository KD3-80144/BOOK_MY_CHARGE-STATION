import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Divider></Divider>
      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2022 - Book My Charge Station. ALL RIGHTS RESERVED.
        </Typography>
      </Box>
    </>
  );
}
