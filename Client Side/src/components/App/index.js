import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "../LogIn";
import AdminDashboard from "../Admin/Dashboard";
import OwnerData from "../Admin/OwnerData";
import CustomerData from "../Admin/CustomerData";
import StationOwnerDashboard from "../StationOwner/Dashboard";
import ChargeStationData from "../StationOwner/ChargeStationData";
import CustomerRequests from "../StationOwner/CustomerRequests";
import CustomerDashboard from "../Customer/Dashboard";
import BookChargeStation from "../Customer/BookChargeStation";
import BookSpecificChargeStation from "../Customer/BookChargeStation/bookspecificchargestation";
import Payment from "../Customer/BookChargeStation/payment";
import History from "../Customer/History";
import PaymentSuccess from "../Customer/BookChargeStation/paymentsuccess";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import Profile from "../Profile";
import AddFeedback from "../Feedback/AddFeedback";
import FeedbackList from "../Feedback/FeedbackList";
import { SidebarLayout } from "../SideBarLayout";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route
              exact
              path="/admin-dashboard"
              element={<AdminDashboard />}
            ></Route>
            <Route
              exact
              path="/station-owner-list"
              element={<OwnerData />}
            ></Route>
            <Route
              exact
              path="/customer-list"
              element={<CustomerData />}
            ></Route>
            <Route
              exact
              path="/feedback-list"
              element={<FeedbackList />}
            ></Route>
          </Route>
          <Route element={<SidebarLayout />}>
            <Route
              exact
              path="/station-owner-dashboard"
              element={<StationOwnerDashboard />}
            ></Route>
            <Route
              exact
              path="/charge-station-details"
              element={<ChargeStationData />}
            ></Route>
            <Route
              exact
              path="/customer-requests"
              element={<CustomerRequests />}
            ></Route>
            <Route exact path="/feedback" element={<AddFeedback />}></Route>
          </Route>
          <Route element={<SidebarLayout />}>
            <Route
              exact
              path="/customer-dashboard"
              element={<CustomerDashboard />}
            ></Route>
            <Route
              exact
              path="/book-station/:id"
              element={<BookSpecificChargeStation />}
            ></Route>
            <Route
              exact
              path="/book-charge-station"
              element={<BookChargeStation />}
            ></Route>
            <Route exact path="/payment" element={<Payment />}></Route>
            <Route
              exact
              path="/payment-success"
              element={<PaymentSuccess />}
            ></Route>

            <Route exact path="/history" element={<History />}></Route>
            <Route exact path="/feedback" element={<AddFeedback />}></Route>
          </Route>
          <Route exact path="/" element={<LogIn />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route element={<SidebarLayout />}>
            <Route exact path="/edit-profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
