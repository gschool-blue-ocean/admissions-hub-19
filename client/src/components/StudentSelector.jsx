import React from 'react';
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import baseurl from "../url";

function StudentSelector() {
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
            console.log("data:", data);
            setAllCohorts(data);
        });
    }

    const getAllStudents = () => {
        fetch(`${baseurl}/students`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
          })
        .then((response) => response.json())
        .then((data) => {
            console.log("data:", data);
            setAllStudents(data);
        });
    }

    const handleCohortSelection = (event) => {
        setCohort(event.target.valStudentue);
    }

    const handleStudentSelection = (event) => {
        setStudent(event.target.value);
    }

    useEffect(() => {
        getAllCohorts();
        getAllStudents();
      }, []);

  return (
    <div>
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
    </div>
  );
}

export default StudentSelector;