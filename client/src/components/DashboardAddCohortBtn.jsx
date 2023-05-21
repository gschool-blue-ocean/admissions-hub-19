import React, { useState } from "react";
import baseurl from "../url";
import { Button, Modal, Form } from "react-bootstrap";

const AddCohortButton = () => {
  const routeHTTPPost = `${baseurl}/cohort`;

  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setName("");
    setStartDate("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(routeHTTPPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, start_date: startDate }),
      });
      const data = await response.json();
      console.log("Record created:", data);
    } catch (error) {
      console.error("Error creating record:", error);
    }

    handlePopupClose();
  };

  return (
    <div>
      <Button
        className="AddCohortBtn"
        variant="primary"
        onClick={handleButtonClick}
      >
        Add Cohort
      </Button>
      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Cohort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Cohort Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="MCSP-00"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="YYYY-MM-DD"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
              <br />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={handlePopupClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCohortButton;
