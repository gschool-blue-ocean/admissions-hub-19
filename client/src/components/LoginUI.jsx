import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import LoginCSS from '../css/LoginUI.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"; //to be used for the login button signup

const LoginUI = () => {
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
      </Container>
      <Container className={LoginCSS.btnwrap}>
      <Button className={LoginCSS.btn} variant="primary" type="submit">
        Sign Up!
      </Button>
      </Container>
    </Form>
    </div>
    </div>
    )
}

export default LoginUI;