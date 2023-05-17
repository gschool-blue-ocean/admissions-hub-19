import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginCSS from "../css/LoginUI.module.css";
import { Row, Col, Container } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate.push("/");
  };

  const routeHTTP = "http://localhost:8000/user";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let doFetch = false;

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_staff: userType === "staff",
      salt: "salt",
      password_hash: password1,
    };

    if (password1 != password2) {
      alert("Passwords do not match!\nPlease try again.\n\nNothing Updated");
    } else if (password1.length > 0 && password1.length < 8) {
      alert(
        "Password is not long enough!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[A-Z]+/.test(password1)) {
      alert(
        "Password has no capital letters!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[a-z]+/.test(password1)) {
      alert(
        "Password has no lowercase letters!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[0-9]+/.test(password1)) {
      alert("Password has no numbers!\nPlease try again.\n\nNothing Updated");
    } else if (!/[^A-Za-z0-9]+/.test(password1)) {
      alert(
        "Password has no special characters!\nPlease try again.\n\nNothing Updated"
      );
    } else {
      doFetch = true;
    }

    if (doFetch) {
      fetch(routeHTTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFirstName("");
          setLastName("");
          setEmail("");
          setUserType("");
          setPassword1("");
          setPassword2("");
          alert("Welcome to Galvanize!");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={LoginCSS.formbg}>
      <div>
        <h2 className={LoginCSS.headers}>
          Welcome to Galvanize Admissions
          <br />
          Please Sign Up!
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-left" controlId="formBasicFirstName">
            <Row>
              <Form.Label column sm={4}>
                First Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter your first name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicLastName">
            <Row>
              <Form.Label column sm={4}>
                Last Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter your last name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
            <Row>
              <Form.Label column sm={4}>
                Email address
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  Please use the email that you check most often.
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 text-left" controlId="formBasicPassword">
            <Row>
              <Form.Label column sm={4}>
                Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={handlePassword1Change}
                  placeholder="Enter Password"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group
            className="mb-3 text-left"
            controlId="formBasicConfirmPassword"
          >
            <Row>
              <Form.Label column sm={4}>
                Confirm Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={handlePassword2Change}
                  placeholder="Confirm Password"
                />
                <Form.Text className="text-muted">
                  Passwords must be at least 8 characters long.<br></br>
                  Must have a capital letter, a lowercase letter,<br></br>a
                  number, and a special character.<br></br>
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Container className={LoginCSS.btnwrap}>
            <Button className={LoginCSS.btn} variant="primary" type="submit">
              Submit
            </Button>
          </Container>
          <Container className={LoginCSS.btnwrap}>
            <Button
              as={Link}
              to="/"
              onClick={handleCancel}
              variant="primary"
              type="cancel"
            >
              Cancel
            </Button>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
