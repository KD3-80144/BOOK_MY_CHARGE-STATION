import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

export const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);
