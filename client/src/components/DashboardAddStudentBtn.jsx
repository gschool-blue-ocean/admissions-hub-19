import React, { useState, useEffect } from "react";
import baseurl from "../url";
import { Modal, Button, Form } from "react-bootstrap";

const AddStudentButton = () => {
  const routeHTTPPost = `${baseurl}/student`;
  const routeHTTPGet = `${baseurl}/cohorts`;

  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cohort_id: "",
    numattempts: "",
    paid: false,
    paperwork: false,
  });
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async () => {
    try {
      const response = await fetch(routeHTTPGet);
      if (!response.ok) {
        throw new Error("Failed to fetch cohorts");
      }
      const data = await response.json();
      setCohorts(data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "cohort_id") {
      console.log("Selected Cohort ID:", value);
    }
  };

  const handleAddStudent = async () => {
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

      // Fetch cohorts again to update the options
      fetchCohorts();

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
      cohort_id: "",
      numattempts: "",
      paid: false,
      paperwork: false,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch cohorts again whenever the showModal state changes
    if (showModal) {
      fetchCohorts();
    }
  }, [showModal]);

  return (
    <div>
      <Button onClick={handleModalOpen}>Add Student</Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={studentData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={studentData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={studentData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCohortId">
              <Form.Label>Cohort ID</Form.Label>
              <Form.Control
                as="select"
                name="cohort_id"
                value={studentData.cohort_id}
                onChange={handleInputChange}
              >
                <option value="">Select a cohort</option>
                {cohorts.map((cohort) => {
                  console.log("Cohort ID:", cohort.cohort_id);
                  return (
                    <option key={cohort.cohort_id} value={cohort.cohort_id}>
                      {cohort.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNumAttempts">
              <Form.Label>Number of Attempts</Form.Label>
              <Form.Control
                type="number"
                name="numattempts"
                value={studentData.numattempts}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPaid">
              <Form.Check
                type="checkbox"
                label="Paid"
                name="paid"
                checked={studentData.paid}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPaperwork">
              <Form.Check
                type="checkbox"
                label="Paperwork"
                name="paperwork"
                checked={studentData.paperwork}
                onChange={handleInputChange}
              />
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
