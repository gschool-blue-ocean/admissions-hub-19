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
        setCohort(event.target.value);
        if (event.target.value != 0) {
            fetch(`${baseurl}/students/cohort/${event.target.value}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("data:", data);
                setAllStudents(data);
            });
        } else {
            getAllStudents();
        }
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
        <div className="cohort-select">
            <label>Cohort</label>
            <select name="cohort-select" id="cohort-select">
                <option value="0">All Cohorts</option>
                {allCohorts.map((cohort, index) => {
                    <option
                        key={index}
                        value={cohort.cohort_id}
                        onClick={handleCohortSelection}
                    >
                        {cohort.name}
                    </option>
                })}
            </select>
        </div>
        <div className="student-select">
            <label>Student</label>
            <select name="student-select" id="student-select">
                <option value="0">All Students</option>
                {allStudents.map((student, index) => {
                    <option
                        key={index}
                        value={student.student_id}
                        onClick={handleStudentSelection}
                    >
                        {student.first_name} {student.last_name}
                    </option>
                })}
            </select>
        </div>

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