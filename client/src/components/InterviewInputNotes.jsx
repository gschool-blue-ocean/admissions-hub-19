import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../url";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import StarRating from "./InterviewStarRating";
import StudentSelector from "./InterviewStudentSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [totalRating, setTotalRating] = useState(0);
  const [attemptNotes, setAttemptNotes] = useState("");
  const [currentStudent, setCurrentStudent] = useState({});

  const routeHTTP = `${baseurl}`;
  const navigate = useNavigate();

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
    console.log("Running");
    // format today's date for input
    let testDate = new Date();
    testDate = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
    const body = {
      date: testDate,
      student_id: currentStudent.student_id,
      staff_id: userid,
      question1_id: question1.question_id,
      answer1: "", // How to get this from CodingWindow Component?
      rating1: rating1,
      question2_id: question2.question_id,
      answer2: "", // How to get this from CodingWindow Component?
      rating2: rating2,
      question3_id: question3.question_id,
      answer3: "", // How to get this from CodingWindow Component?
      rating3: rating3,
      notes: attemptNotes,
      rating_score: totalRating,
      pass: totalRating >= 75,
    };
    //console.log("POST Body:", body);
    fetch(`${routeHTTP}/attempt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        toast(
          `Thank you for your submittal for...\n   Student: ${currentStudent.first_name} ${currentStudent.last_name}\n   Notes: ${attemptNotes}\n   Score: ${totalRating}`
        );
        console.log("Submitted Attempt Info:", data);
      });
  };

  const handleStudentUpdate = (student) => {
    setCurrentStudent(student);
  };

  // Function to run upon staff member adding notes for the interview session
  const updateNotes = (event) => {
    setAttemptNotes(event.target.value);
  };

  // Functions to pass down to StarRating component to update state
  const updateRating1 = (rating) => {
    console.log("Rating1:", rating);
    setRating1(rating);
  };

  const updateRating2 = (rating) => {
    console.log("Rating2:", rating);
    setRating2(rating);
  };

  const updateRating3 = (rating) => {
    console.log("Rating3:", rating);
    setRating3(rating);
  };

  // Function to run upon any rating update
  // Updates the total rating state
  useEffect(() => {
    setTotalRating(Math.round(((rating1 + rating2 + rating3) / 15) * 100));
  }, [rating1, rating2, rating3]);

  // Function to run upon initial loading of the component
  useEffect(() => {
    getAllQuestionsData();
    getAllNotesData();
  }, []);
  //Array of problems for star rating for map
  const problems = ["Problem 1", "Problem 2", "Problem 3"];

  return (
    <div className={{ display: "flex" }}>
      {/* // Note: Right here is where we need to add the code editor component */}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div style={{ width: "400px" }}>
        <Container
          className="interview-container"
          style={{
            border: "1px solid #ccc",
          }}
        >
          {currentStudent.student_id ? (
            <h2>
              {currentStudent.first_name} {currentStudent.last_name},{" "}
              {currentStudent.name}
            </h2>
          ) : (
            <StudentSelector updateStudent={handleStudentUpdate} />
          )}

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
            <div className="Tab-Sections">
              <h3>{question1.title}</h3>
              <p>{question1.question}</p>
              <p>{question1.description}</p>
              {notes1.map((note, index) => {
                return <p key={index}> {note.note} </p>;
              })}
            </div>
          )}

          {activeTab === "problem2" && (
            <div className="Tab-Sections">
              <h3>{question2.title}</h3>
              <p>{question2.question}</p>
              <p>{question2.description}</p>
              {notes2.map((note, index) => {
                return <p key={index}> {note.note} </p>;
              })}
            </div>
          )}

          {activeTab === "problem3" && (
            <div className="Tab-Sections">
              <h3>{question3.title}</h3>
              <p>{question3.question}</p>
              <p>{question3.description}</p>
              {notes3.map((note, index) => {
                return <p key={index}> {note.note} </p>;
              })}
            </div>
          )}
          <h3>Notes</h3>
          <textarea
            type="text"
            style={{ width: "375px", height: "200px" }}
            placeholder="Notes and results for the student attempt"
            onChange={updateNotes}
          />
          <div style={{ display: "flex", flexBox: "wrap" }}>
            <div>
              <StarRating onchange={updateRating1} title="Problem 1" />
              <StarRating onchange={updateRating2} title="Problem 2" />
              <StarRating onchange={updateRating3} title="Problem 3" />
            </div>
            {totalRating < 75 ? (
              <div className="total-rating text-danger">{totalRating}</div>
            ) : (
              <div className="total-rating text-success">{totalRating}</div>
            )}
          </div>
          <div className="inputnotes-footer">
            <Button
              variant="primary"
              onClick={() => {
                saveAttemptToDB();
                navigate("/dashboard");
              }}
            >
              Save and Exit
            </Button>
            {/* <Button variant="primary">Save and Submit</Button> */}
            <div style={{ width: "8px" }}></div>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default InputNotes;
