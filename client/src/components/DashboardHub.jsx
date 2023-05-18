import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "../css/DashboardHub.css";
import { useNavigate } from "react-router-dom";
import AddCohortButton from "./DashboardAddCohortBtn";
import AddStudentButton from "./DashboardAddStudentBtn";
import DeleteCohortButton from "./DashboardDeleteCohortBtn";

const DashboardHub = () => {
  const navigate = useNavigate();
  const routeHTTP = "http://localhost:8000";

  const [allStudentsArray, setAllStudentsArray] = useState([]);
  const [oneStudentObject, setOneStudentObject] = useState({});
  const [allStudentsCohort, setAllStudentsCohort] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    getOneStudentData();
    getAllStudentsData();
    getAllStudentsFromCohort();
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

  const deleteRows = (studentId) => {
    const updatedData = allStudentsArray.filter(
      (student) => student.student_id !== studentId
    );
    setAllStudentsArray(updatedData);
  };

  return (
    <div className="DashboardHub">
      <Form className="Searchbar">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 rounded-pill"
          aria-label="Search"
        />
      </Form>
      <Table borderedless hover height="525px" width="1900px" className="Table">
        <thead>
          <tr>
            <th height="20px">Student Name</th>
            <th height="20px">Email Address</th>
            <th height="20px">Cohort</th>
            <th height="20px">Last Interview</th>
            <th height="20px">Attempt</th>
            <th height="20px">Submitted Pay</th>
            <th height="20px">Paperwork?</th>
            <th height="20px"></th>
            <th height="20px"></th>
          </tr>
        </thead>
        <tbody>
          {allStudentsArray.map((student, index) => {
            return (
              <tr
                key={
                  index
                } /*onClick={() => handleSelectedStudents(index)} onClickCapture={() => deleteRows(index)} className={selectedStudents.includes(index) ? 'SelectedRows' : ''}*/
              >
                <td>
                  <Button
                    className="DeleteStudentBtn"
                    variant="primary"
                    onClick={() => deleteRows(student.student_id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    className="UpdateStudentBtn"
                    variant="primary"
                    onClick={() => navigate("/editprofile")}
                    userid={1}
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
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
