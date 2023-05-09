import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from "react-bootstrap";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit_Profile from "../pages/Edit_Profile.jsx";
import Interview from "../pages/Interview.jsx";



const App = () => {
  return (
    <Router>
      <div>
        <Nav variant="tabs">
          <Nav.Item>
        <Nav.Link as={Link} to="/">Login</Nav.Link>
          </Nav.Item>

  
          <Nav.Item>
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>

          <Nav.Item>
        <Nav.Link as={Link} to="/editprofile">Edit Profile</Nav.Link>
          </Nav.Item>

          <Nav.Item>
        <Nav.Link as={Link} to="/interview">Interview</Nav.Link>
          </Nav.Item>
        </Nav>

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
