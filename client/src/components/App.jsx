import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit_Profile from "../pages/Edit_Profile.jsx";
import Interview from "../pages/Interview/Interview.jsx";
import Signup from "../pages/SignUp.jsx";
import Test from "../pages/Test.jsx";

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
        {/* This is the navigation bar that will be on every page allowing access to each page without logging in
        
        REMINDER: THIS IS A SAFETY NET CODE. THIS WILL BE REMOVED ONCE WE HAVE A LOGIN PAGE WORKING 

        */}
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

          {/* This link will take you to a blank test page where you can test out components 
        you want to see and interact with before applying it to the main component/page it belongs to */}
          {/* <Nav.Item>
            <Nav.Link as={Link} to="/test">
              Test
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </div>
      <Routes>
        <Route path="/" element={<Login handleUser={handleUser} />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard userid={userId} />} />

        <Route path="/editprofile" element={<Edit_Profile userid={userId} />} />

        <Route path="/interview" element={<Interview userid={userId} />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
