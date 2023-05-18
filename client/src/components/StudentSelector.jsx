import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import baseurl from "../url";

function StudentSelector({ updateStudent }) {
  const [allCohorts, setAllCohorts] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [cohort, setCohort] = useState(0);
  const [student, setStudent] = useState(0);

  const getAllCohorts = () => {
    fetch(`${baseurl}/cohorts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setAllCohorts(data);
      });
  };

  const getAllStudents = () => {
    fetch(`${baseurl}/students`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setAllStudents(data);
      });
  };

  const handleCohortSelection = (event) => {
    setCohort(event.target.value);
    if (event.target.value != 0) {
      fetch(`${baseurl}/students/cohort/${event.target.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log("data:", data);
          setAllStudents(data);
        });
    } else {
      getAllStudents();
    }
  };

  const handleStudentSelection = async (event) => {
    setStudent(event.target.value);
    await fetch(`${baseurl}/student/${event.target.value}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        updateStudent(data);
      });
  };

  useEffect(() => {
    getAllCohorts();
    getAllStudents();
  }, []);

  return (
    <div>
      <div className="cohort-select">
        {/* <label>Cohort</label> */}
        <select
          name="cohort-select"
          id="cohort-select"
          onChange={handleCohortSelection}
        >
          <option key={0} value="0">
            All Cohorts
          </option>
          {allCohorts.map((cohort) => {
            return (
              <option key={cohort.cohort_id} value={cohort.cohort_id}>
                {cohort.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="student-select">
        {/* <label>Student</label> */}
        <select
          name="student-select"
          id="student-select"
          onChange={handleStudentSelection}
        >
          <option key={0} value="0">
            Select Student
          </option>
          {allStudents.map((student) => {
            return (
              <option key={student.student_id} value={student.student_id}>
                {student.first_name} {student.last_name}
              </option>
            );
          })}
        </select>
      </div>
      {/*
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownCohorts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Cohorts
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownCohorts">
            {allCohorts.map((cohort, index) => {
                <a className="dropdown-item" key={index} value={cohort.cohort_id} onClick={handleCohortSelection}>{cohort.name}</a>
            })}
        </div>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownStudents" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Students
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownStudents">
            {allStudents.map((student, index) => {
                <a className="dropdown-item" key={index} value={student.student_id} onClick={handleStudentSelection}>{cohort.name}</a>
            })}
        </div>
        */}
    </div>
  );
}

export default StudentSelector;
