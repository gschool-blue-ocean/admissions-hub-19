import React, { useState, useEffect } from "react";
import baseurl from "../url";
import { Button, Modal, ListGroup, Row, Col } from "react-bootstrap";

function DeleteCohortButton() {
  const routeHTTPGet = `${baseurl}/cohorts`;
  const routeHTTPDel = `${baseurl}/cohort`;

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch cohorts from the server
  const fetchCohorts = async () => {
    try {
      const response = await fetch(routeHTTPGet);
      const data = await response.json();
      setCohorts(data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  // Delete cohort
  const handleDeleteCohort = async () => {
    if (selectedCohort) {
      console.log("Selected Cohort ID:", selectedCohort.id);
      try {
        // Send a DELETE request to the server to delete the selected cohort
        await fetch(`${routeHTTPDel}/${selectedCohort.id}`, {
          method: "DELETE",
        });

        // Update the cohorts state by removing the deleted cohort
        setCohorts((prevCohorts) =>
          prevCohorts.filter((cohort) => cohort.id !== selectedCohort.id)
        );

        // Close the modal
        handleModalClose();
      } catch (error) {
        console.error("Error deleting cohort:", error);
      }
    }
  };

  // Select
  const handleSelectCohort = (cohort) => {
    console.log("Selected Cohort:", cohort);
    setSelectedCohort({
      id: cohort.cohort_id,
      name: cohort.name,
      start_date: cohort.start_date,
    });
  };

  // Modal
  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Fetch cohorts when component mounts
  useEffect(() => {
    fetchCohorts();
  }, []);

  useEffect(() => {
    // Fetch cohorts again whenever the showModal state changes
    if (showModal) {
      fetchCohorts();
    }
  }, [showModal]);

  return (
    <>
      <Button
        className="DeleteCohortBtn"
        variant="primary"
        onClick={handleModalShow}
      >
        Delete Cohort
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cohorts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {cohorts.map((cohort) => (
              <ListGroup.Item
                key={cohort.id}
                active={selectedCohort === cohort.id}
                onClick={() => handleSelectCohort(cohort)}
              >
                {cohort.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteCohort}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCohortButton;
