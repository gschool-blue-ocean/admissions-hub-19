import React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
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
    //console.log("event:", event.target.target);
    setCohort(event.target.target);
    if (event.target.target != 0) {
      fetch(`${baseurl}/students/cohort/${event.target.target}`, {
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
    setStudent(event.target.target);
    await fetch(`${baseurl}/student/${event.target.target}`, {
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
    <div style={{ display: "flex", flex: "flex", marginBottom: "8px" }}>
      {/*
      <div className="cohort-select">
        <select
          name="cohort-select"
          id="cohort-select"
          onChange={handleCohortSelection}
        >
          <option key={0} target="0">
            All Cohorts
          </option>
          {allCohorts.map((cohort) => {
            return (
              <option key={cohort.cohort_id} target={cohort.cohort_id}>
                {cohort.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="student-select">
        <select
          name="student-select"
          id="student-select"
          onChange={handleStudentSelection}
        >
          <option key={0} target="0">
            Select Student
          </option>
          {allStudents.map((student) => {
            return (
              <option key={student.student_id} target={student.student_id}>
                {student.first_name} {student.last_name}
              </option>
            );
          })}
        </select>
      </div>
      */}
      <Dropdown>
        <Dropdown.Toggle variant="primary">Select Cohort</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item key={0} target={0} onClick={handleCohortSelection}>
            All Cohorts
          </Dropdown.Item>
          <Dropdown.Divider />
          {allCohorts.map((cohort) => {
            return (
              <Dropdown.Item
                key={cohort.cohort_id}
                target={cohort.cohort_id}
                onClick={handleCohortSelection}
              >
                {cohort.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ width: "8px" }}></div>
      <Dropdown>
        <Dropdown.Toggle variant="primary">Select Student</Dropdown.Toggle>
        <Dropdown.Menu>
          {allStudents.map((student) => {
            return (
              <Dropdown.Item
                key={student.student_id}
                target={student.student_id}
                onClick={handleStudentSelection}
              >
                {student.first_name} {student.last_name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default StudentSelector;
