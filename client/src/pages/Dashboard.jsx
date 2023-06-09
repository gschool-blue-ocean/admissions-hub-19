import React from "react";
import NavBar from "../components/DashboardNavBar";
import DashboardHub from "../components/DashboardHub";
import Layout from "./Layout";

const Dashboard = ({ userid }) => {
  return (
    <Layout>
      <h1>Hello world</h1>
      <NavBar userid={userid} />
      <DashboardHub />
    </Layout>
  );
};

export default Dashboard;
