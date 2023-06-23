import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Form, Button } from "react-bootstrap";
import useUserStore from "../../store/userStore";
import baseurl from "../../url";
import Logo from "../../../public/GSymbol.webp";
import { ToastContainer, toast } from "react-toastify";
import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const handleUser = useUserStore((state) => state.setUserId);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        // Send credentials to the server for authentication
        const response = await fetch(`${baseurl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
          }),
        });
        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.userId);
          handleUser(data.userId);
          navigate("/dashboard");
        } else {
          toast("Invalid email or password.");
        }
      } catch (error) {
        console.error(error);
        toast("An error occurred during authentication");
      }
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
          <h3>Login to Galvanize Admissions</h3>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" name="email" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" />
              <Form.Control.Feedback type="invalid">
                Passwords must be at least 8 characters long.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className={styles.buttonWrapper}>
            <Button type="submit">Login</Button>
            <div className={styles.signupWrapper}>
              <p>Don't have an account yet?</p>
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
