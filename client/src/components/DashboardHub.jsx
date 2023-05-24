import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
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
  const [student, setStudent] = useState();
  const [update, setUpdate] = useState(false);
  const [showMoreStudents, setShowMoreStudents] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [yesDeleteStudent, setYesDeleteStudent] = useState(false);
  const [showUpdateStudents, setShowUpdateStudents] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState();
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

  const studentToUpdate = (student) => {
    setStudent(student);
    setShowUpdateStudents(true);
  }

  const startUpdate = () => {
    setUpdate(true);
    handleUpdateStudent();
  }


  const handleUpdateStudent = async () => {
    if (update === true) {
      try {
        // Post the student data to the server
        const response = await fetch(`${routeHTTP}/student/${student.student_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateStudentData),
        });

        if (!response.ok) {
          throw new Error("Failed to add student");
        }

        const updatedStudent = await response.json();
        console.log("Updated student:", updatedStudent);

        // Fetch cohorts again to update the options
        fetchCohorts();

        // Close the modal
        setShowUpdateStudents(false);

      } catch (error) {
        console.error("Error adding student:", error);
      }
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

  const getAllStudentsData = async () => {
    try {
      const response = await fetch(`${routeHTTP}/students`);
      const data = await response.json();
      console.log("data:", data);
      data.forEach(async (student) => {
        student.last_interview = await getLastInterViewDate(student.student_id);
      });
      console.log("data:", data);
      setAllStudentsArray(data);
    } catch (err) {
      console.error(err.message);
    }
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

  const getLastInterViewDate = async (userid) => {
    //return "N/A";
    // Vite refuses to work with Async/Await
    try {
      let response = await fetch(`${routeHTTP}/attempts/student/${userid}`);
      if (response.status == 404) {
        // console.log("Returning N/A");
        return "N/A";
      } else {
        let data = await response.json();
        // console.log("response", response);
        // console.log("data", data);
        // console.log("Returning date", data.at(-1).date.slice(0, 10));
        return data.at(-1).date.slice(0, 10);
      }
    } catch (err) {
      console.error(err.message);
    }
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
    setShowMoreStudents(showMoreStudents + 5);
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
    <div
      style={{
        backgroundColor: "#ffebc7",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Button variant="primary">
        Select Cohort
      </Button>
      {/* <div className="SearchAndAdd">
        <Form className="Searchbar">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 rounded-pill"
            aria-label="Search"
          />
        </Form>
      </div> */}
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
          {allStudentsArray.map((student, index) => {
            return (
              <tr key={index} /*onClick={() => handleSelectedStudents(index)} onClickCapture={() => deleteRows(index)} className={selectedStudents.includes(index) ? 'SelectedRows' : ''}*/>
                <td>
                  <Button
                    className="DeleteStudentBtn"
                    variant="danger"
                    onClick={() => deleteRows(student.student_id)}
                  >
                    Delete
                  </Button>
                </td>
                {yesDeleteStudent && handleDelete(student.student_id)}
                <td>
                  <Button
                    className="UpdateStudentBtn"
                    variant="primary"
                    onClick={() => studentToUpdate(student)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.email}</td>
                <td>{student.name}</td>
                <td>{student.last_interview}</td>
                <td>{student.numattempts}</td>
                <td>{student.paid ? "Y" : "N"}</td>
                <td>{student.paperwork ? "Y" : "N"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="SearchAndAdd">
        {/* <Button
          className="UpdateStudentBtn"
          variant="primary"
          onClick={() => navigate("/editprofile")}
          userid={1}
        >
          Update Student
        </Button> */}
        <Button
          className="LaunchInterviewBtn"
          variant="primary"
          onClick={() => navigate("/interview")}
        >
          Launch Interview
        </Button>
        <DeleteCohortButton />
      </div>
    </div>
  );
};

export default DashboardHub;
