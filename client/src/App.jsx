import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";
// import Login from "../pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Outlet, Link } from "react-router-dom";
// import Edit_Profile from "../pages/Edit_Profile.jsx";
// import Interview from "../pages/Interview.jsx";
// import Signup from "../pages/SignUp.jsx";
// import Test from "../pages/Test.jsx";

const App = () => {
  const [userId, setUserId] = useState(null);

  if (userId) {
    console.log("userId: " + userId);
  }

  const handleUser = (data) => {
    setUserId(data);
  };

  // Note: App will be used as a wrapper for all pages
  return (
    <main>
      <div className="header">
        <h1>Galvanize Admissions</h1>
      </div>
      <div className="side-navbar">
        <ul>
          <li>MAIN MENU</li>
          <li>
            <Link to="/dashboard">DASHBOARD</Link>
          </li>
          <li>
            <Link to="/interview">INTERVIEW</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </main>

    // <Router>
    //   <div>
    //     <Nav variant="tabs">
    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/">
    //           Login
    //         </Nav.Link>
    //       </Nav.Item>

    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/signup">
    //           Sign Up
    //         </Nav.Link>
    //       </Nav.Item>

    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/dashboard">
    //           Dashboard
    //         </Nav.Link>
    //       </Nav.Item>

    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/editprofile">
    //           Edit Profile
    //         </Nav.Link>
    //       </Nav.Item>

    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/interview">
    //           Interview
    //         </Nav.Link>
    //       </Nav.Item>
    //     </Nav>
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Login handleUser={handleUser} />} />

    //     <Route path="/signup" element={<Signup />} />

    //     <Route path="/dashboard" element={<Dashboard userid={userId} />} />

    //     <Route path="/editprofile" element={<Edit_Profile userid={userId} />} />

    //     <Route path="/interview" element={<Interview userid={userId} />} />

    //     <Route path="/test" element={<Test />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
