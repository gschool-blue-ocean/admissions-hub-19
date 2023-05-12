import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap'; // not using row or column yet
//import {Tabs, Tab} from 'react-bootstrap-tabs';
import InterviewCSS from '../css/Interview.css';

const InputNotes = () => {
  
  return (
  <div>
    <Container className="interview-container">
      <h2>Student Name, Cohort</h2>
      <Button variant="primary">Launch Interview</Button>
      
          <h2>Something</h2>
          <h3>container or tabs here</h3>

      <Button variant="primary">Save and Exit</Button>
      <Button variant="primary">Save and Submit</Button>
    </Container>
    <Container className="code-container">Your code here</Container>
  </div>
  );
}

export default InputNotes;
