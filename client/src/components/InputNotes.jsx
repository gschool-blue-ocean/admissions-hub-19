import React, { useState, useEffect } from "react";
import baseurl from "../url";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
//import InterviewCSS from "../css/Interview.css";

const InputNotes = () => {
  const [activeTab, setActiveTab] = useState("problem1");
  const [question1, setQuestion1] = useState({});
  const [question2, setQuestion2] = useState({});
  const [question3, setQuestion3] = useState({});

  const routeHTTP = `${baseurl}`
  

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const getAllQuestionsData = () => {
    fetch(`${routeHTTP}/questions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setQuestion1(data[0]);
        setQuestion2(data[1]);
        setQuestion3(data[2]);
      });
  };

  useEffect(() => {
    getAllQuestionsData();
  }, []);

  return (
    <div>
      <Container className="border p-3 mt-3 float-right w-30">
        <h2>Student Name, Cohort</h2>
        <Button variant="primary">Click Here to Copy Student URL</Button>

        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={handleSelect}
          style={{ marginTop: "10px" }}
        >
          <Nav.Item>
            <Nav.Link eventKey="problem1">Problem 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="problem2">Problem 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="problem3">Problem 3</Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === "problem1" && (
          <>
            <h3>{question1.title}</h3>
            <p>Problem 1 content goes here for Question</p>
            <h3>Notes</h3>
            <p>Problem 1 content goes here for Notes</p>
            <h3>Rating</h3>
            <p>Problem 1 content goes here for Rating</p>
          </>
        )}

        {activeTab === "problem2" && (
          <>
            <h3>Question</h3>
            <p>Problem 2 content goes here for Question</p>
            <h3>Notes</h3>
            <p>Problem 2 content goes here for Notes</p>
            <h3>Rating</h3>
            <p>Problem 2 content goes here for Rating</p>
          </>
        )}

        {activeTab === "problem3" && (
          <>
            <h3>Question</h3>
            <p>Problem 3 content goes here for Question</p>
            <h3>Notes</h3>
            <p>Problem 3 content goes here for Notes</p>
            <h3>Rating</h3>
            <p>Problem 3 content goes here for Rating</p>
          </>
        )}

        <Button variant="primary">Save and Exit</Button>
        <Button variant="primary">Save and Submit</Button>
      </Container>
    </div>
  );
};

export default InputNotes;
