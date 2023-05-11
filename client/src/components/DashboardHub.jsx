import React from "react";
import Button from 'react-bootstrap/Button';
import '../css/DashboardHub.css';

const DashboardHub = () => {
    return (
    <div className="DashboardHub">
        <Button className='FilterBtn' variant="primary">Filter</Button>
        <Button className='AddStudentBtn' variant="primary">Add Student</Button>
        <Button className='DeleteStudentBtn' variant="primary">Delete Student</Button>
        <Button className='UpdateStudentBtn' variant="primary">Update Student</Button>
        <Button className='LaunchInterviewBtn' variant="primary">Launch Interview</Button>
        <Button className='ExportStudentBtn' variant="primary">Export Student</Button>


    </div>
    );
  };

export default DashboardHub;