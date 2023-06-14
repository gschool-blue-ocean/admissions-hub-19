import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import useUserStore from "../store/userStore";
import baseurl from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const userid = useUserStore((state) => state.userid);

  const handleToDashBoard = () => {
    navigate("/dashboard");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    };
    if (password1.length == 0 && password2.length == 0) {
      doFetch = true;
    } else if (password1 != password2) {
      toast("Passwords do not match!\nPlease try again.\n\nNothing Updated");
    } else if (password1.length > 0 && password1.length < 8) {
      toast(
        "Password is not long enough!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[A-Z]+/.test(password1)) {
      toast(
        "Password has no capital letters!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[a-z]+/.test(password1)) {
      toast(
        "Password has no lowercase letters!\nPlease try again.\n\nNothing Updated"
      );
    } else if (!/[0-9]+/.test(password1)) {
      toast("Password has no numbers!\nPlease try again.\n\nNothing Updated");
    } else if (!/[^A-Za-z0-9]+/.test(password1)) {
      toast(
        "Password has no special characters!\nPlease try again.\n\nNothing Updated"
      );
    } else {
      doFetch = true;
      formData.salt = "salt";
      formData.password_hash = password1;
    }

    if (doFetch) {
      fetch(`${baseurl}/user/${userid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast("Updated!");
        })
        .catch((error) => console.error(error));
    }
  };

  const getUserData = () => {
    fetch(`${baseurl}/user/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      });
  };

  useEffect(() => {
    getUserData();
  }, [userid]);

  return (
    <div
      style={{
        backgroundColor: "rgb(2,3,129)",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
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
      <div>
        <br />
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Update Your User Account!
        </h1>
        <Container
          style={{
            backgroundColor: "#ef6e47",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 70px rgba(255, 255, 255, 0.3)",
            animation: "glow 1.5s ease-in-out infinite",
          }}
        >
          <style>
            {`
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); // Initial box shadow
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); // Stronger glow
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); // Return to initial box shadow
          }
        }
        `}
          </style>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Row className="justify-content-md-center">
                <Form.Label
                  column
                  sm={1}
                  style={{ color: "white", fontWeight: "bold" }}
                >
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
                <Form.Label
                  column
                  sm={1}
                  style={{ color: "white", fontWeight: "bold" }}
                >
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
                <Form.Label
                  column
                  sm={1}
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Email address
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                  />
                  <Form.Text style={{ color: "white", fontWeight: "bold" }}>
                    Please use the email that you check most often.
                  </Form.Text>
                </Col>
              </Row>
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Row className="justify-content-md-center">
                <Form.Label
                  column
                  sm={1}
                  style={{ color: "white", fontWeight: "bold" }}
                >
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
            <Form.Group controlId="formBasicConfirmPassword">
              <Row className="justify-content-md-center">
                <Form.Label
                  column
                  sm={1}
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Confirm Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    value={password2}
                    onChange={handlePassword2Change}
                    placeholder="Confirm Password"
                  />
                  <Form.Text style={{ color: "white", fontWeight: "bold" }}>
                    Passwords must be at least 8 characters long.<br></br>
                    Must have a capital letter, a lowercase letter,<br></br>a
                    number, and a special character.<br></br>
                  </Form.Text>
                </Col>
              </Row>
            </Form.Group>
            <Container className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                as={Link}
                to="/dashboard"
                onClick={handleToDashBoard}
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

export default EditProfile;
