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
     
      const response = await axios.post(`${baseurl}/login`, { email, password });
      if(response.status === 200)  {
        const token = response.data.token
        localStorage.setItem('token', token);
        handleUser(response.data.userId)
        navigate('/Dashboard');
      }
      
    else {
      alert('Invalid email or password.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during authentication.');
  }
};

  const handleClick = () => {
    navigate("/signup");
  };

    return (
      <div className = {LoginCSS.formbg}>
        <div>
          <h2 className={LoginCSS.headers}>Welcome to Galvanize Admissions</h2>
      <Form>
        
      <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
      <Row>
        <Form.Label column sm={4}> Email address</Form.Label>
        <Col sm={8}>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          Please use the email that you check most often.
        </Form.Text>
      </Col>
      </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Row>
        <Form.Label column sm={4}>Password</Form.Label>
        <Col sm={8}>        
        <Form.Control 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Form.Text className="text-muted">
          Password must be 8 characters long.<br>
          </br>
          Must have a special character eg., @$#! <br>
          </br>
        </Form.Text>
        </Col>
        </Row>
      </Form.Group>


      <Form.Group className="mb-3" controlId="Loginbtn">
      </Form.Group>

      <Container className={LoginCSS.btnwrap}>
      <Button 
        className={LoginCSS.btn} 
        variant="primary" 
        type="submit"
        onClick={handleSubmit}
      >
        Login!
      </Button>
      {/* <Users /> //this is the refernce for the signup */}
      </Container>
      <Container className={LoginCSS.btnwrap}>
      <Button as={Link} to='/signup' onClick={handleClick} className={LoginCSS.btn} variant="primary" type="submit" >
        Create Account!
      </Button>
      </Container>
    </Form>
    </div>
    </div>
  );
    }
export default LoginUI;
