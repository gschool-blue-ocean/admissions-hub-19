import React from "react";
import Header from "../components/Layout/Header/Header.jsx";
import SideNav from "../components/Layout/SideNav.jsx";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <SideNav />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
