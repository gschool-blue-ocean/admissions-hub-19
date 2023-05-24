import React from "react";
import NavBar from "../components/DashboardNavBar";
import DashboardHub from "../components/DashboardHub";
import CohortComponent from "../components/DashboardCohortStudentTableBtn";

const Dashboard = ({ userid }) => {
  return (
    <div>
      <NavBar userid={userid} />
      <CohortComponent/>
    </div>
  );
};

export default Dashboard;
