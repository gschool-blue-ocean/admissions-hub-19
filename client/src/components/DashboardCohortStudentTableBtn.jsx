import React, { useState, useEffect } from 'react';
import baseurl from "../url";
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';

const CohortComponent = () => {
  const routeHTTPGet = `${baseurl}/cohorts`;
  const routeHTTPGetStudents = `${baseurl}/students/cohort`;

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch cohorts data
    const fetchCohorts = async () => {
      try {
        const response = await fetch(routeHTTPGet);
        const data = await response.json();
        setCohorts(data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohorts();
  }, []);

  const handleCohortSelect = async (cohort_id) => {
    console.log("Selected Cohort ID:", cohort_id);
    setSelectedCohort(cohort_id);

    // Fetch students data for the selected cohort
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${routeHTTPGetStudents}/${cohort_id}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  };

  return (
    <div>
      <DropdownButton title="Select Cohort" onSelect={handleCohortSelect}>
        {cohorts.map(cohort => (
          <Dropdown.Item key={cohort.cohort_id} eventKey={cohort.cohort_id}>
            {cohort.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
  
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Cohort</th>
            <th>Last Interview</th>
            <th>Attempt</th>
            <th>Submitted Pay</th>
            <th>Paperwork</th>
          </tr>
        </thead>
        <tbody>
          {selectedCohort && students.map(student => (
            <tr key={student.student_id}>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.name}</td>
              <td>{student.last_interview}</td>
              <td>{student.numattempts}</td>
              <td>{student.paid ? "Y" : "N"}</td>
              <td>{student.paperwork ? "Y" : "N"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CohortComponent;
