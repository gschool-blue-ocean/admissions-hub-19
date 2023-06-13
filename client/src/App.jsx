import React from "react";
import { Outlet, Link } from "react-router-dom";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import "./App.css";

const App = () => {
  // Note: App will be used as a wrapper for all pages
  return (
    <main>
      <SidebarNav />
      <section>
        <header>
          <h3 className="m-0 p-4 fs-3">Dashboard</h3>
        </header>

        {/* // Note: Outlet will be used to render nested routes */}
        <Outlet />
      </section>
    </main>
  );
};

export default App;
