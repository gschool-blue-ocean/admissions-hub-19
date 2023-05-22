import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import baseurl from "../url";

function NavBar({ userid }) {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const handleEditProfile = () => {
    // localStorage.removeItem('token'); // remove token from local storage // awaiting login functionality to test
    navigate("/editprofile");
  };

  const handleLogout = () => {
    // localStorage.removeItem('token'); // remove token from local storage // awaiting login functionality to test
    navigate.push("/");
  };

  const getUserName = () => {
    fetch(`${baseurl}/user/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user data:", data);
        setUserName(`${data.first_name} ${data.last_name}`);
      });
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Galvanize-Awesome!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={userName} id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/editprofile"
                onClick={handleEditProfile}
              >
                View/Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
