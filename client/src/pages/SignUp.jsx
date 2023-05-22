import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import baseurl from "../url";

const SignUp = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate.push("/");
  };

  const routeHTTP = `${baseurl}/user`;

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
      password: password1,
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
          setPassword1("");
          setPassword2("");
          alert("Welcome to Galvanize!");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(2,3,129)", backgroundSize: "cover", minHeight: "100vh" }}>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
          Welcome to Galvanize Admissions
        </h1>
          <br />
        <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
          Please Sign Up!
        </h2>
        <Container
          style={{ backgroundColor: "#ef6e47", padding: "30px", borderRadius: "10px" }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Row className="justify-content-md-center">
                <Form.Label column sm={1} style={{color: "white", fontWeight: "bold"}}>
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
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Row className="justify-content-md-center">
                <Form.Label column sm={1} style={{color: "white", fontWeight: "bold"}}>
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
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Row className="justify-content-md-center">
                <Form.Label column sm={1} style={{color: "white", fontWeight: "bold"}}>
                  Email address
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                  />
                  <Form.Text style={{color: "white", fontWeight: "bold"}}>
                    Please use the email that you check most often.
                  </Form.Text>
                </Col>
              </Row>
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Row className="justify-content-md-center">
                <Form.Label column sm={1} style={{color: "white", fontWeight: "bold"}}>
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
              <br />
            </Form.Group>
            <Form.Group
              controlId="formBasicConfirmPassword"
            >
              <Row className="justify-content-md-center">
                <Form.Label column sm={1} style={{color: "white", fontWeight: "bold"}}>
                  Confirm Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    value={password2}
                    onChange={handlePassword2Change}
                    placeholder="Confirm Password"
                  />
                  <Form.Text style={{color: "white", fontWeight: "bold"}}>
                    Passwords must be at least 8 characters long.<br></br>
                    Must have a capital letter, a lowercase letter,<br></br>a
                    number, and a special character.<br></br>
                  </Form.Text>
                </Col>
              </Row>
            </Form.Group>
            <Container className="d-flex justify-content-between">
              <Button
                className="btn"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
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
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
