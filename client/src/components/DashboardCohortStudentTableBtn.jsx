import React, { useState, useEffect } from "react";
import baseurl from "../url";
import {
  Dropdown,
  DropdownButton,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

const CohortComponent = () => {
  const routeHTTPGetCohorts = `${baseurl}/cohorts`;
  const routeHTTPGetStudents = `${baseurl}/students/cohort`;
  const routeHTTPDelStudent = `${baseurl}/student`;
  const routeHTTPPatchStudent = `${baseurl}/student`;

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("");
  const [students, setStudents] = useState([]);
  const [editedStudent, setEditedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await fetch(routeHTTPGetCohorts);
        const data = await response.json();
        setCohorts(data);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    };

    fetchCohorts();
  }, []);

  useEffect(() => {
    if (selectedCohort) {
      fetchStudentsForCohort(selectedCohort);
    } else {
      setStudents([]);
    }
  }, [selectedCohort]);

  const fetchStudentsForCohort = async (cohort_id) => {
    try {
      const response = await fetch(`${routeHTTPGetStudents}/${cohort_id}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCohortSelect = (cohort_id) => {
    console.log("Selected Cohort ID:", cohort_id);
    setSelectedCohort(cohort_id);
  };

  const handleDeleteStudent = async (student_id) => {
    try {
      const response = await fetch(`${routeHTTPDelStudent}/${student_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStudents(
          students.filter((student) => student.student_id !== student_id)
        );
        console.log("Student deleted:", student_id);
      } else {
        console.error("Error deleting student:", response.status);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      console.log("Updating student:", editId);

      const url = `${routeHTTPPatchStudent}/${editId}`;
      console.log("Update URL:", url);

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedStudent),
      });

      console.log("Update response status:", response.status);
      console.log("Update response body:", await response.json());

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.student_id === editedStudent.id ? editedStudent : student
          )
        );
        handleCloseModal();
      } else {
        console.error("Error updating student:", response.status);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEditStudent = (student) => {
    const editData = {
      first_name: student.first_name,
      last_name: student.last_name,
      numattempts: student.numattempts,
      cohort_id: student.cohort_id,
      email: student.email,
      paid: student.paid,
      paperwork: student.paperwork,
    };
    setEditId(student.student_id);
    setEditedStudent(editData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditedStudent(null);
    setShowModal(false);
  };

  return (
    <div>
      <DropdownButton title="Select Cohort" onSelect={handleCohortSelect}>
        {cohorts.map((cohort) => (
          <Dropdown.Item key={cohort.cohort_id} eventKey={cohort.cohort_id}>
            {cohort.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <br />
      <Table striped bordered>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Cohort</th>
            {/* <th>Last Interview</th> */}
            <th>Attempt</th>
            <th>Submitted Pay</th>
            <th>Paperwork</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditStudent(student)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(student.student_id)}
                >
                  Delete
                </Button>
              </td>
              <td>
                {student.first_name} {student.last_name}
              </td>
              <td>{student.email}</td>
              <td>{student.name}</td>
              {/* <td>{student.last_interview}</td> */}
              <td>{student.numattempts}</td>
              <td>{student.paid ? "Y" : "N"}</td>
              <td>{student.paperwork ? "Y" : "N"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {students.length === 0 && selectedCohort && (
        <p>No students available for the selected cohort.</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={editedStudent ? editedStudent.first_name : ""}
                onChange={(e) =>
                  setEditedStudent({
                    ...editedStudent,
                    first_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editedStudent ? editedStudent.last_name : ""}
                onChange={(e) =>
                  setEditedStudent({
                    ...editedStudent,
                    last_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedStudent ? editedStudent.email : ""}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCohort">
              <Form.Label>Cohort</Form.Label>
              <Form.Control
                type="text"
                value={editedStudent ? editedStudent.cohort_id : ""}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, cohort: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAttempts">
              <Form.Label>Attempts</Form.Label>
              <Form.Control
                type="text"
                value={editedStudent ? editedStudent.numattempts : ""}
                onChange={(e) =>
                  setEditedStudent({
                    ...editedStudent,
                    numattempts: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPaid">
              <Form.Check
                type="checkbox"
                label="Paid"
                checked={editedStudent ? editedStudent.paid : false}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, paid: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPaperwork">
              <Form.Check
                type="checkbox"
                label="Paperwork"
                checked={editedStudent ? editedStudent.paperwork : false}
                onChange={(e) =>
                  setEditedStudent({
                    ...editedStudent,
                    paperwork: e.target.checked,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateStudent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CohortComponent;
