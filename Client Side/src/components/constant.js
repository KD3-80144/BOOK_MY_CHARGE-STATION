import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";

export const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export const api = {
  LOGIN: "http://localhost:3001/users/login",
  GET_OWNER_LIST: "http://localhost:3001/admin/getStationOwners",
  GET_CUSTOMER_LIST: "http://localhost:3001/admin/getCustomers",
  UPDATE_OWNER_CUSTOMER: "http://localhost:3001/admin/updateUser",
  GET_STATE: "http://localhost:3001/users/getState",
  GET_CITY: "http://localhost:3001/users/getCity",
  GET_ROLE: "http://localhost:3001/users/getRole",
  REGISTER: "http://localhost:3001/users/register",
  GET_STATION_LIST: "http://localhost:3001/customer/getStationList",
  ADD_CHAREGE_STATION: "http://localhost:3001/stationOwner/addChargeStation",
  CREATE_ORDER: "http://localhost:3001/payment/createOrder",
  FETCH_CUSTOMER_HISTORY: "http://localhost:3001/customer/getCustomerHistory",
  FETCH_CUSTOMER_REQUEST:
    "http://localhost:3001/stationOwner/getCustomerRequests",
  FORGOT_PASSWORD: "http://localhost:3001/users/forgotPassword",
  UPDATE_PROFILE: "http://localhost:3001/users/updateProfile",
  GET_PROFILE: "http://localhost:3001/users/getUserProflieData",
  GET_FEEDBACK: "http://localhost:3001/admin/getFeedbacks",
  ADD_FEEDBACK: "http://localhost:3001/stationOwner/addFeedback",
  GET_VEHICLE_TYPE: "http://localhost:3001/stationOwner/getVehicleType",
  GET_ADMIN_DASHBOARD_DATA: "http://localhost:3001/admin/getDashboardData",
  GET_ADMIN_DASHBOARD_DETAILS:
    "http://localhost:3001/admin/getDashboardDetails",
  GET_CUSTOMER_DASHBOARD_DATA:
    "http://localhost:3001/customer/getDashboardData",
  GET_OWNER_DASHBOARD_DATA:
    "http://localhost:3001/stationOwner/getDashboardData",
};

export const postApiCall = async (url, body) => {
  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getApiCall = async (url) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const AdminHeaderMenu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin-dashboard",
  },
  {
    name: "Station Owners",
    icon: <ManageAccountsIcon />,
    path: "/station-owner-list",
  },
  {
    name: "Customers",
    icon: <GroupIcon />,
    path: "/customer-list",
  },
  {
    name: "View Feedback",
    icon: <GroupIcon />,
    path: "/feedback-list",
  },
];

export const StationOwnerHeaderMenu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/station-owner-dashboard",
  },
  {
    name: "Add Charge Station",
    icon: <ManageAccountsIcon />,
    path: "/charge-station-details",
  },
  {
    name: "Customer Request",
    icon: <GroupIcon />,
    path: "/customer-requests",
  },
  {
    name: "Add Feedback",
    icon: <GroupIcon />,
    path: "/feedback",
  },
];

export const CustomerHeaderMenu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/customer-dashboard",
  },
  {
    name: "Book Charge Station",
    icon: <ManageAccountsIcon />,
    path: "/book-charge-station",
  },
  {
    name: "History",
    icon: <GroupIcon />,
    path: "/history",
  },
  {
    name: "Add Feedback",
    icon: <GroupIcon />,
    path: "/feedback",
  },
];
