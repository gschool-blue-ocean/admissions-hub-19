import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  // TODO: put this in a context provider or Zustand store
  // TODO: move this logic to index.jsx
  const [userId, setUserId] = useState(1);
  if (userId) {
    console.log("userId: " + userId);
  }
  const handleUser = (data) => {
    setUserId(data);
  };

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
