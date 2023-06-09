import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import baseurl from "../url";
import Logo from '../assets/GSymbol.webp'
import useUserStore from "../store/userStore";

function NavBar() {
  const userid = useUserStore((state) => state.userid);
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
    fetch(`${baseurl}/user/${userid}`)
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
    <Navbar collapseOnSelect style={{ background:"radial-gradient(circle, rgb(216,245,169), rgba(110,218,150,255))  " }}>
      <Container>
        <div>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>Galvanize</span>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={userName} id="collasible-nav-dropdown"
            style={{
              backgroundColor: "rgb(57,204,140)",
              borderRadius: "20px",
            }}
            >
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
