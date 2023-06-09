import React from "react";
import NavBar from "../components/DashboardNavBar";
import DashboardHub from "../components/DashboardHub";

const Dashboard = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <NavBar userid={userid} />
      <DashboardHub />
    </div>
  );
};

export default Dashboard;
