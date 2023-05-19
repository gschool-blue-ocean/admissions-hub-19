import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form } from "react-bootstrap";
import axios from "axios";
import baseurl from "../url";
import LoginCSS from "../css/LoginUI.module.css";

export const LoginUI = ({ handleUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    try {
      // Send credentials to the server for authentication
      const response = await axios.post(`${baseurl}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        handleUser(response.data.userId);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className={LoginCSS.loginContainer} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <img
        src="../Images/GSymbol.webp"
        alt="Background Image"
        style={{ display: "block", margin: "0 auto" }}
        />
        <h1 style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Welcome to Galvanize Admissions</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Row className="mb-3">
              <Form.Label style={{ color: "white", fontWeight: "bold" }} column sm={2}>
                Email Address
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="sm"
                />
                <Form.Text  style={{ color: "white", fontWeight: "bold" }}>
                  Please use the email that you check most often.
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Row className="mb-3">
              <Form.Label style={{ color: "white", fontWeight: "bold" }} column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="sm"
                />
                <Form.Text style={{ color: "white", fontWeight: "bold" }}>
                  Password must be 8 characters long.<br />
                  Must have a special character eg., @$#! <br />
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="Loginbtn" />
          <Container className="d-flex justify-content-between">
            <Button
              className="btn"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Login!
            </Button>
            <Button
              as={Link}
              to="/signup"
              onClick={handleClick}
              className="btn"
              variant="primary"
              type="submit"
            >
              Create Account!
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default LoginUI;
