import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import "../css/DashboardHub.css";
import { useNavigate } from "react-router-dom";
import AddCohortButton from "./DashboardAddCohortBtn";
import AddStudentButton from "./DashboardAddStudentBtn";
import DeleteCohortButton from "./DashboardDeleteCohortBtn";
import baseurl from "../url";

const DashboardHub = () => {
  const navigate = useNavigate();
  const routeHTTP = baseurl;
  const [allStudentsArray, setAllStudentsArray] = useState([]);
  const [oneStudentObject, setOneStudentObject] = useState({});
  const [allStudentsCohort, setAllStudentsCohort] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [showStudents, setShowStudents] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [yesDeleteStudent, setYesDeleteStudent] = useState(false);
  const [showUpdateStudents, setShowUpdateStudents] = useState(false);
  const [updateStudentData, setUpdateStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cohort_id: "",
    numattempts: "",
    paid: false,
    paperwork: false,
  });
  // const [deletedStudents, setDeletedStudents] = useState([]);
  //create a useEffect that recognizes that when changes occur getAllStudent

  
  const fetchCohorts = async () => {
    try {
      const response = await fetch(`${routeHTTP}/cohorts`);
      if (!response.ok) {
        throw new Error("Failed to fetch cohorts");
      }
      const data = await response.json();
      setCohorts(data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };
  
  const handleUpdateStudent = async () => {
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

  const handleDelete = (studentId) => {
    // const deletedStudent = allStudentsArray.find(() => student.student_id === studentId);
    // if(deletedStudent){
    // //store data in state
    // setDeletedStudents([...deletedStudents, deletedStudent])
    // Make an HTTP DELETE request to the server endpoint to delete the data
    
    const updatedData = allStudentsArray.filter((student) => student.student_id === studentId);
    setAllStudentsArray(updatedData);
    
  }

  // const handleUpdateStudent = () => {
  //   axios.patch()
  // }

  // const handleRowRestore = (student, studentId) => {
  //   const restoredStudents = deletedStudents.find(() => student.id === studentId);
  //   if (restoredStudents) {
  //     axios.post(`${routeHTTP}/student/${student.student_id}/`)
  //     .then((response) => {
  //       // Handle the success response, e.g., update the component's state or perform any necessary actions
  //       console.log(response.data.message);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error('Error deleting data:', error);
  //     });
  //     const updatedData = [...allStudentsArray, restoredStudents];
  //     setAllStudentsArray(updatedData);
  //     setDeletedStudents(restoredStudents.filter(() => student.id !== studentId));
  //   }
  // };

  useEffect(() => {
    //getOneStudentData();
    getAllStudentsData();
    fetchCohorts();
    //getAllStudentsFromCohort();
  }, []);

  const getAllStudentsData = () => {
    fetch(`${routeHTTP}/students`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setAllStudentsArray(data);
      });
  };

  const getOneStudentData = (userid) => {
    fetch(`${routeHTTP}/student/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setOneStudentObject(data);
      });
  };

  const getAllStudentsFromCohort = (cohortid) => {
    fetch(`${routeHTTP}/students/cohort/${cohortid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setAllStudentsCohort(data);
      });
  };

  const getLastInterViewDate = (userid) => {
    // fetch(`${routeHTTP}/attempts/student/${userid}`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //console.log("data:", data);
    const data = [];
    let answer = "";
    if (data.length == 0) {
      answer = "N/A";
    } else {
      answer = data.at(-1).date;
    }
    return answer;
    //   });
  };

  const getPaperworkStatus = (studentObject) => {
    let count = 0;
    if (studentObject.paperwork1) {
      count++;
    }
    if (studentObject.paperwork2) {
      count++;
    }
    if (studentObject.paperwork3) {
      count++;
    }
    return count + " / 3";
  };

  const handleShowMoreStudents = () => {
    setShowStudents(showStudents + 5);
  }

  // useEffect(() => {
  // //   //getAllStudentsData();
  // //   //getOneStudentData(1);
  // //   //getAllStudentsFromCohort();
  // //   // EXAMPLE DATA FROM DATABASE
  //   const testObject = {
  //     student_id: 1,
  //     user_id: 1,
  //     cohort_id: 1,
  //     numattempts: 0,
  //     paid: true,
  //     paperwork1: true,
  //     paperwork2: false,
  //     paperwork3: true,
  //     name: "MCSP-35",
  //     start_date: "2023-07-01T00:00:00.000Z",
  //     first_name: "John",
  //     last_name: "Doe",
  //     email: "john.doe@example.com",
  //     is_staff: false,
  //     password_hash: "password1",
  //     salt: {
  //       type: "Buffer",
  //       data: [115, 97, 108, 116, 49],
  //     },
  //   };
  //   setAllStudentsArray([testObject, testObject, testObject, testObject, testObject, testObject, testObject]);
  //   setOneStudentObject(testObject);
  //   setAllStudentsCohort([testObject, testObject]);
  // }, []);
  // const handleSelectedStudents = (studentId, index) => {
  //   if (selectedStudents.includes(studentId, index)) {
  //     setSelectedStudents(selectedStudents.filter((selectedStudents) => selectedStudents !== index && selectedStudents !== studentId));
  //   } else {
  //     setSelectedStudents([...selectedStudents, studentId, index]);
  //   }
  // }




  // const deleteRows = (studentId) => {
  //   const updatedData = allStudentsArray.filter((student) => student.student_id !== studentId);
  //   setAllStudentsArray(updatedData);
  // }

  return (
    <div className="DashboardHub">
      {showAlert === true ?
        <Alert show={showAlert} variant="danger">
          <Alert.Heading> Are you sure ? </Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setYesDeleteStudent(true)} variant="primary">
              Yes
            </Button>
            <Button onClick={() => setShowAlert(false)} variant="primary">
              No
            </Button>
          </div>
        </Alert> : null
      }
      <Modal show={showUpdateStudents}>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder=""
                autoFocus
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder=""
                autoFocus
              />
                <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                autoFocus
              />
                  <Form.Group controlId="formCohortId">
              <Form.Label>Cohort ID</Form.Label>
              <Form.Control
                as="select"
                name="cohort_id"
                // value={studentData.cohort_id}
                // onChange={handleInputChange}
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
                // value={studentData.numattempts}
                // onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Paid?" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox"></Form.Group>
                <Form.Check type="checkbox" label="Paperwork?"/>
         </Form.Group>
          </Form>
          <Button >Update</Button>
          <Button onClick={() => setShowUpdateStudents(false)}>Close</Button>
        </Modal.Body>
      </Modal>
      <div className="SearchAndAdd">
        <Form className="Searchbar">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 rounded-pill"
            aria-label="Search"
          />
        </Form>
        <AddCohortButton />
        <AddStudentButton />
      </div>
      <Table hover height="525px" width="1900px" className="Table">
        <thead>
          <tr>
            <th height="20px">Delete</th>
            <th height="20px">Update</th>
            <th height="20px">Student Name</th>
            <th height="20px">Email Address</th>
            <th height="20px">Cohort</th>
            <th height="20px">Last Interview</th>
            <th height="20px">Attempt</th>
            <th height="20px">Submitted Pay</th>
            <th height="20px">Paperwork?</th>
          </tr>
        </thead>
        <tbody>
          {allStudentsArray.slice(0, showStudents).map((student, index) => {
            return (
              <tr key={index} /*onClick={() => handleSelectedStudents(index)} onClickCapture={() => deleteRows(index)} className={selectedStudents.includes(index) ? 'SelectedRows' : ''}*/>
                <td>
                  <Button
                    className="DeleteStudentBtn"
                    variant="primary"
                    onClick={() => setShowAlert(true)}
                  >
                    Delete
                  </Button>
                </td>
                {yesDeleteStudent && handleDelete(student.student_id)}
                <td>
                  <Button
                    className="UpdateStudentBtn"
                    variant="primary"
                    onClick={() => setShowUpdateStudents(true)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.email}</td>
                <td>{student.name}</td>
                <td>{getLastInterViewDate(student)}</td>
                <td>{student.numattempts}</td>
                <td>{student.paid ? "Y" : "N"}</td>
                <td>{getPaperworkStatus(student)}</td>
                <td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showStudents < allStudentsArray.length && (
        <Button variant="primary" onClick={handleShowMoreStudents}>Show More</Button>
      )}
      <Button
        className="UpdateStudentBtn"
        variant="primary"
        onClick={() => navigate("/editprofile")}
        userid={1}
      >
        Update Student
      </Button>
      <Button
        className="LaunchInterviewBtn"
        variant="primary"
        onClick={() => navigate("/interview")}
      >
        Launch Interview
      </Button>
      <AddCohortButton />
      <AddStudentButton />
      <DeleteCohortButton />

    </div>
  );
};

export default DashboardHub;
