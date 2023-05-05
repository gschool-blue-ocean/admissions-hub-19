import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit_Profile from "../pages/Edit_Profile.jsx";
import Interview from "../pages/Interview.jsx";



const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">Login</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/editprofile">Edit Profile</Link>

        <Link to="/interview">Interview</Link>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/editprofile" element={<Edit_Profile/>} />

        <Route path="/interview" element={<Interview/>} />
      </Routes>
    </Router>
  );
};

export default App;
