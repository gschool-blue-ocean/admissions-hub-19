import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

function CohortPopUp() {

    const routeHTTP = "http://localhost:8000/cohorts";

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch cohorts from the server
  const fetchCohorts = async () => {
    try {
      const response = await fetch(routeHTTP);
      const data = await response.json();
      setCohorts(data);
    } catch (error) {
      console.error('Error fetching cohorts:', error);
    }
  };

  // Function to handle cohort selection
  const handleSelectCohort = (cohort) => {
    setSelectedCohort(cohort);
  };

  // Function to handle modal visibility
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

  return (
    <>
      <Button className='CohortBtn' variant="primary" onClick={handleModalShow}>
        Show Cohorts
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
                active={selectedCohort === cohort}
                onClick={() => handleSelectCohort(cohort)}
              >
                {cohort.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CohortPopUp;
