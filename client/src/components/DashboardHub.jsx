import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import '../css/DashboardHub.css';

const DashboardHub = () => {





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
            <Button className='FilterBtn' variant="primary" >Filter</Button>
            <Table borderedless hover height='525px' width='1900px' className="Table">
                <thead>
                    <tr>
                        <th height="20px">Student Name</th>
                        <th height="20px">Email Address</th>
                        <th height="20px">Cohort</th>
                        <th height="20px">Last Interview</th>
                        <th height="20px">Attempt</th>
                        <th height="20px">Status</th>
                        <th height="20px">Submitted Pay</th>
                        <th height="20px">Paperwork1</th>
                        <th height="20px">Paperwork2</th>
                        <th height="20px">Paperwork3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                    <tr>
                        <td >Joe Johnson</td>
                        <td >IsoJoe@hotmail.com</td>
                        <td >MCSP-19</td>
                        <td >August 28, 2022</td>
                        <td >1</td>
                        <td >Retired</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                        <td >Y</td>
                    </tr>
                </tbody>
            </Table>
            <Button className='AddStudentBtn' variant="primary">Add Student</Button>
            <Button className='DeleteStudentBtn' variant="primary">Delete Student</Button>
            <Button className='UpdateStudentBtn' variant="primary">Update Student</Button>
            <Button className='LaunchInterviewBtn' variant="primary">Launch Interview</Button>
            <Button className='ExportStudentBtn' variant="primary">Export Student</Button>


        </div>
    );
};

export default DashboardHub;