import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AdminHeader } from "../Admin/Header";
import {
  AdminHeaderMenu,
  CustomerHeaderMenu,
  StationOwnerHeaderMenu,
} from "../constant";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import OwnerData from "../Admin/OwnerData";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const StyledList = styled(List)({
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "#8bc34a",
    "&, & .MuiListItemIcon-root": {
      color: "#FFFFFF",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "#D0F0C0",
    "&, & .MuiListItemIcon-root": {
      color: "#FFFFFF",
    },
  },
});

export default function SideBar() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(0);
  const menuChange = (event, path, index) => {
    setSelectedItem(index);
    navigate(path);
  };
  let menu;
  if (localStorage.getItem("user_role") == 1) {
    menu = AdminHeaderMenu;
  } else if (localStorage.getItem("user_role") == 2) {
    menu = StationOwnerHeaderMenu;
  } else if (localStorage.getItem("user_role") == 3) {
    menu = CustomerHeaderMenu;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <AdminHeader />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#8bc34a",
          },
        }}
        //style={{ background: "#8bc34a" }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <StyledList>
            <List>
              {menu
                ? menu.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton
                        selected={selectedItem === index}
                        onClick={(event) => menuChange(event, item.path, index)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  ))
                : ""}
            </List>
          </StyledList>
        </Box>
      </Drawer>
    </Box>
  );
}
