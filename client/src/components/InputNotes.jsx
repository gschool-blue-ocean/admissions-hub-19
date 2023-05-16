import React, { useState, useEffect } from "react";
import baseurl from "../url";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
//import baseurl from "../url";
//import InterviewCSS from "../css/Interview.css";

const InputNotes = () => {
  const [activeTab, setActiveTab] = useState("problem1");
  const [question1, setQuestion1] = useState({});
  const [question2, setQuestion2] = useState({});
  const [question3, setQuestion3] = useState({});
  const [notes1, setNotes1] = useState([]);
  const [notes2, setNotes2] = useState([]);
  const [notes3, setNotes3] = useState([]);


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

  const getAllNotesData = async () => {
    await fetch(`${routeHTTP}/question_notes/question/1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setNotes1(data);
      });

    await fetch(`${routeHTTP}/question_notes/question/2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setNotes2(data);
      });

    await fetch(`${routeHTTP}/question_notes/question/3`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("data:", data);
        setNotes3(data);
      });
  };


  useEffect(() => {
    getAllQuestionsData();
    getAllNotesData();
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
            <p>{question1.question}</p>
            <p>{question1.description}</p>
            <h3>Notes for Question</h3>
            {notes1.map((note, index) => {
              return <p key={index}> {note.note} </p>; })}
            <h3>Notes for Student</h3>
            <input type="text"></input>
            <h3>Rating</h3>
            <p>Problem 1 content goes here for Rating</p>
          </>
        )}

        {activeTab === "problem2" && (
          <>
            <h3>{question2.title}</h3>
            <p>{question2.question}</p>
            <p>{question2.description}</p>
            <h3>Notes for Question</h3>
            {notes2.map((note, index) => {
              return <p key={index}> {note.note} </p>; })}
            <h3>Notes for Student</h3>
            <input type="text"></input>
            <h3>Rating</h3>
            <p>Problem 2 content goes here for Rating</p>
          </>
        )}

        {activeTab === "problem3" && (
          <>
            <h3>{question3.title}</h3>
            <p>{question3.question}</p>
            <p>{question3.description}</p>
            <h3>Notes for Question</h3>
            {notes3.map((note, index) => {
              return <p key={index}> {note.note} </p>; })}
            <h3>Notes for Student</h3>
            <input type="text"></input>
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
