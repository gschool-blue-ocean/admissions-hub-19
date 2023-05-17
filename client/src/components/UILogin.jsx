import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import LoginCSS from '../css/LoginUI.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useAuth } from './auth';
import axios from 'axios';
import baseurl from '../url'
//needs to accept user input password and email 
//should check this nin the database that was logged on the signup page

// export const Login = () => {
//   const [user, setUser] = UseState('')
//   const auth = useAuth()
// }

// export const LoginUI = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/Login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/Dashboard');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClick = () => {
//     navigate('/signup');
//   };

  // if (email === 'user@example.com' && password === 'password') {
    // Valid credentials
    // alert('Login successful!');
    // Perform additional actions (e.g., redirect to dashboard)
  // } else {
    // Invalid credentials
//     alert('Invalid email or password.');
//   }
// };


// const LoginUI = () => {

//   const navigate = useNavigate();

//   const handleClick = () => {
//     // localStorage.removeItem('token'); // remove token from local storage // awaiting login functionality to test
//   navigate.push('/signup');
// };
export const LoginUI = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        'Invalid password format. Password must be 8 characters long and contain at least 1 letter and 1 number.'
      );
      return;
    }

    try {
      // Send credentials to the server for authentication
      const response = await axios.post(`${baseurl}/api/Login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/Dashboard');
    } catch (error) {
      console.error(error);
      alert('Invalid email or password.');
    }
  };

  const handleClick = () => {
    navigate('/signup');
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
        <Form.Control type="email" placeholder="Enter email" />
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
        <Form.Control type="password" placeholder="Password" />
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
      <Button className={LoginCSS.btn} variant="primary" type="submit">
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
    )
}


export default LoginUI;