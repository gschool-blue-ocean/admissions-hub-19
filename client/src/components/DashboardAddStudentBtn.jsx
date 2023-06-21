import React, { useState } from "react";
import baseurl from "../url";
import { Modal, Button, Form } from "react-bootstrap";

const AddStudentButton = () => {
  const routeHTTPPost = `${baseurl}/student`;

  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    status: "",
    start_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddStudent = async () => {
    const newStudentData = {
      ...studentData,
      status: parseInt(studentData.status),
    };
    try {
      // Post the student data to the server
      const response = await fetch(routeHTTPPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const newStudent = await response.json();
      console.log("Added student:", newStudent);

      // TODO: Optimistically add new user to array of users to update the options

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
    setStudentData({
      first_name: "",
      last_name: "",
      email: "",
      status: "",
      start_date: "",
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        onClick={handleModalOpen}
        style={{
          backgroundColor: "#0D99FF",
          padding: "2px",
          paddingLeft: "12px",
          paddingRight: "12px",
          marginTop: "8px",
          marginBottom: "8px",
          border: "none",
        }}
      >
        Add new student
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label className="m-0">
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label className="m-0">
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="m-0">
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label className="m-0">
                Status <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="status" onChange={handleInputChange}>
                <option>Select a status</option>
                <option value="1">Prep work</option>
                <option value="2">Code challenge</option>
                <option value="3">Tech interview</option>
                <option value="4">Finished</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label className="m-0">Targeted start date</Form.Label>
              <Form.Control
                name="start_date"
                type="date"
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentButton;
