import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

function CohortPopUp() {

    const routeHTTPGet = "http://localhost:8000/cohorts";
    const routeHTTPDel= "http://localhost:8000/cohort";

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
      console.error('Error fetching cohorts:', error);
    }
  };

  // Delete cohort
  const handleDeleteCohort = async () => {
    if (selectedCohort) {
      console.log('Selected Cohort ID:', selectedCohort.id);
      try {
        // Send a DELETE request to the server to delete the selected cohort
        await fetch(`${routeHTTPDel}/${selectedCohort.id}`, {
          method: 'DELETE',
        });
  
        // Update the cohorts state by removing the deleted cohort
        setCohorts(prevCohorts =>
          prevCohorts.filter(cohort => cohort.id !== selectedCohort.id)
          );
  
        // Reset the selected cohort to null
        setSelectedCohort(null);

        // Close the modal
        handleModalClose();
      } catch (error) {
        console.error('Error deleting cohort:', error);
      }
    }
  }


  // Select
  const handleSelectCohort = (cohort) => {
    console.log('Selected Cohort:', cohort);
    setSelectedCohort({ id: cohort.cohort_id, name: cohort.name, start_date: cohort.start_date });
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
                active={selectedCohort && selectedCohort.id === cohort.id}
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CohortPopUp;
