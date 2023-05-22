import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit_Profile from "../pages/Edit_Profile.jsx";
import Interview from "../pages/Interview.jsx";
import Signup from "../pages/SignUp.jsx";

const App = () => {
  const [userId, setUserId] = useState(null);

  if (userId) {
    console.log("userId: " + userId);
  }

  const handleUser = (data) => {
    setUserId(data);
  };

  return (
    <Router>
      <div>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/editprofile">
              Edit Profile
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/interview">
              Interview
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Routes>
        <Route path="/" element={<Login handleUser={handleUser} />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard userid={userId} />} />

        <Route path="/editprofile" element={<Edit_Profile userid={userId} />} />

        <Route path="/interview" element={<Interview userid={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
