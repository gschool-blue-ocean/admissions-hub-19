import React, { useState, useEffect } from "react";
import baseurl from "../url";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import StarRating from "./StarRating";
//import baseurl from "../url";
import InterviewCSS from "../css/Interview.css";
import StudentSelector from "./StudentSelector";

const InputNotes = () => {
  const [activeTab, setActiveTab] = useState("problem1");
  const [question1, setQuestion1] = useState({});
  const [question2, setQuestion2] = useState({});
  const [question3, setQuestion3] = useState({});
  const [notes1, setNotes1] = useState([]);
  const [notes2, setNotes2] = useState([]);
  const [notes3, setNotes3] = useState([]);
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [attemptNotes, setAttemptNotes] = useState("");


  const routeHTTP = `${baseurl}`
  

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  // Function to get all data from table Questions
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

  // Function to get all data from table Question_Notes
  const getAllNotesData = async () => {
    // Fetch for first tab
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

    // Fetch for second tab
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

    // Fetch for third tab
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

  // Save this attempt to the database
  const saveAttemptToDB = () => {
    // format today's date for input
    let testDate = new Date();
    testDate = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
    let rating = Math.round(((rating1 + rating2 + rating3) / 15) * 100);
    fetch(`${routeHTTP}/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: {
        date: testDate,
        student_id: "", // How to get this?
        staff_id: "",   // How to get this?
        question1_id: question1.question_id,
        answer1: "",    // How to get this from CodingWindow Component?
        rating1: rating1,
        question2_id: question2.question_id,
        answer2: "",    // How to get this from CodingWindow Component?
        rating2: rating2,
        question3_id: question3.question_id,
        answer3: "",    // How to get this from CodingWindow Component?
        rating3: rating3,
        notes: attemptNotes,
        rating_score: rating,
        pass: rating >= 60
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Submitted Attempt Info:", data);
      });
  };  

  // Function to run upon staff member adding notes for the interview session
  const updateNotes = (event) => {
    setAttemptNotes(event.target.value)
  }

  // Functions to pass down to StarRating component to update state
  const updateRating1 = (rating) => {
    console.log('Rating1:', rating);
    setRating1(rating);
  }

  const updateRating2 = (rating) => {
    console.log('Rating2:', rating);
    setRating2(rating);
  }

  const updateRating3 = (rating) => {
    console.log('Rating3:', rating);
    setRating3(rating);
  }

  // Function to run upon initial loading of the component
  useEffect(() => {
    getAllQuestionsData();
    getAllNotesData();
  }, []);
//Array of problems for star rating for map  
const problems = ["Problem 1", "Problem 2", "Problem 3"];

  return (
    <div>
      <Container className="interview-container">
        <h2>Student Name, Cohort</h2>
        
        <Button variant="primary">Click Here to Copy Student URL</Button>
        <StudentSelector/>
        
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
          <div className="Tab-Sections">
            <h3>{question1.title}</h3>
            <p>{question1.question}</p>
            <p>{question1.description}</p>
            {notes1.map((note, index) => {
              return <p key={index}> {note.note} </p>; })
            }
          </div>
        )}

        {activeTab === "problem2" && (
          <div className ="Tab-Sections">
            <h3>{question2.title}</h3>
            <p>{question2.question}</p>
            <p>{question2.description}</p>
            {notes2.map((note, index) => {
              return <p key={index}> {note.note} </p>; })
            }
          </div>
        )}

        {activeTab === "problem3" && (
          <div className="Tab-Sections">
            <h3>{question3.title}</h3>
            <p>{question3.question}</p>
            <p>{question3.description}</p>
            {notes3.map((note, index) => {
              return <p key={index}> {note.note} </p>; })
            }
          </div>
        )}
        <h3>Notes</h3>
        <textarea type="text"
          style={{  width: "375px", height: "200px"}}
          placeholder="Notes and results for the student attempt"
          onChange={updateNotes} />


        <StarRating onchange={updateRating1} title="Problem 1"/>
        <StarRating onchange={updateRating2} title="Problem 2"/>
        <StarRating onchange={updateRating3} title="Problem 3"/>    

        <Button variant="primary">Save and Exit</Button>
        {/* <Button variant="primary">Save and Submit</Button> */}
      </Container>
    </div>
  );
};

export default InputNotes;
