import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  // here's where we can retriueve the files with questions in the future
  // Note: App will be used as a wrapper for all pages
  return (
    <main>
      <header>
        <h1>Galvanize Admissions</h1>
      </header>
      <nav>
        <ul>
          <li>MAIN MENU</li>
          <li>
            <Link to="/dashboard">DASHBOARD</Link>
          </li>
          <li>
            <Link to="/interview">INTERVIEW</Link>
          </li>
          <li>
            <Link to="/edit-profile">EDIT PROFILE</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signup">SIGN UP</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
};

export default App;
