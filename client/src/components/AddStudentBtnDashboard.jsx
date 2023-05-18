import React, { useState } from 'react';
import baseurl from "../url";
import { Modal, Button, Form } from 'react-bootstrap';

const AddStudentButton = () => {

  const routeHTTPPost = `${baseurl}/student`;

  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cohort_id: '',
    numattempts: '',
    paid: false,
    paperwork: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddStudent = async () => {
    try {
      // Post the student data to the server
      const response = await fetch(routeHTTPPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const newStudent = await response.json();
      console.log('Added student:', newStudent);

      // Close the modal
      setShowModal(false);

    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

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
                value={studentData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={studentData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={studentData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCohortId">
              <Form.Label>Cohort ID</Form.Label>
              <Form.Control
                type="number"
                name="cohort_id"
                value={studentData.cohort_id}
                onChange={handleInputChange}
              />
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
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentButton;
