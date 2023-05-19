import React from "react";
import NavBar from "../components/DashboardNavBar";
import DashboardHub from "../components/DashboardHub";

const Dashboard = ({ userid }) => {
  return (
    <div>
      <NavBar userid={userid} />
      <DashboardHub />
    </div>
  );
};

export default Dashboard;
