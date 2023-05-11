import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
  const [password, setPassword] = useState("");

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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_staff: userType === "staff",
      salt: "salt",
      password_hash: password,
    };

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
      setPassword("");
      alert("Welcome to Galvanize!");
    })
    .catch((error) => console.error(error));
};

  return (
    <div>
      <h2>Sign Up!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            style={{ width: "50%" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            style={{ width: "50%" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "50%" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "50%" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Are you a student or staff member?</Form.Label>
          <br />
          <Form.Check
            type="radio"
            label="Student"
            name="userType"
            value="student"
            checked={userType === "student"}
            onChange={handleUserTypeChange}
          />
          <Form.Check
            type="radio"
            label="Staff"
            name="userType"
            value="staff"
            checked={userType === "staff"}
            onChange={handleUserTypeChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Button
        as={Link}
        to="/"
        onClick={handleCancel}
        variant="primary"
        type="cancel"
      >
        Cancel
      </Button>
    </div>
  );
};

export default SignUp;
