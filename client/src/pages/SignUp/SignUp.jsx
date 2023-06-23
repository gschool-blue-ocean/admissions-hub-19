import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../../public/GSymbol.webp";
import baseurl from "../../url";
import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const routeHTTP = `${baseurl}/user`;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      console.log(Object.fromEntries(formData));

      fetch(routeHTTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast("Welcome to Galvanize! Redirecting to Login...");
          setTimeout(() => {
            navigate("/login"); // Route to the login page after delay
          }, 6000);
        })
        .catch((error) => console.error(error));
    }

    setValidated(true);
  };

  return (
    <div className={styles.cardWrapper}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <img src={Logo} alt="Logo" width={"72px"} />
          <h3>Create an account</h3>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control required type="text" name="first_name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control required type="text" name="last_name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" name="email" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                pattern=".{8,}"
              />
              <Form.Control.Feedback type="invalid">
                Passwords must be at least 8 characters long.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <div className={styles.buttonWrapper}>
            <Button type="submit">
              Create account
            </Button>
            <div className={styles.loginWrapper}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
