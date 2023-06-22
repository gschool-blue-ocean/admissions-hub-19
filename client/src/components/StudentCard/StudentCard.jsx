import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import StatusTag from "../StatusTag/StatusTag";
import StudentCardCSS from "./StudentCard.module.css";

const StudentCard = () => {
  const studentId = useUserStore((state) => state.studentId);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();
  const setAttempts = useUserStore((state) => state.setAttempts);

  const setAttemptNumber = () => {
    fetch(`http://localhost:3000//attempts/student/${studentId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // let studentData = {
  //     name: "Jon Snow",
  //     email: "jonsnow@example.com",
  //     phone: "555-123-4567",
  //     cohort: "MCSP-35",
  //     status: "Technical Interview",
  //     createdBy: "Rane Gray",
  //     technicalInterviewDate: "June 6th, 2023 @ 10:00AM MST",
  //     notes: [
  //         {
  //             attemptNum: 1,
  //             date: "May 23rd, 2023",
  //             content: "Jon performed decently on most topics. Struggled with accessing properties on an object"
  //         },
  //         {
  //             attemptNum: 2,
  //             date: "June 9th, 2023",
  //             content: "What kind of a name is Jon Snow anyway?"
  //         }
  //     ]
  // }

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:3000/student/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setStudentData(data);
        });
    }
  }, [studentId]);

  if (!studentData) {
    return (
      <div className="w-50 d-flex justify-content-center align-items-center">
        Select a student
      </div>
    );
  }

  return (
    <div className={StudentCardCSS.cardContainer}>
      <div className={StudentCardCSS.studentInfoCard}>
        <div className={StudentCardCSS.cardHeader}>
          <img
            className={StudentCardCSS.icon}
            src="https://img.icons8.com/?size=512&id=kDoeg22e5jUY&format=png"
          ></img>
          <h3>
            {studentData.first_name} {studentData.last_name}
          </h3>
        </div>
        <ul className={StudentCardCSS.studentInfoList}>
          <li className={StudentCardCSS.studentInfo}>
            Email: <p>{studentData.email}</p>
          </li>
          {/* <li className={StudentCardCSS.studentInfo}>Phone #: <b>{studentData.phone}</b></li> */}
          <li className={StudentCardCSS.studentInfo}>
            Cohort start: <p>{studentData.start_date}</p>
          </li>
          <li className={StudentCardCSS.studentInfo}>
            Status:
            <StatusTag studentStatus={studentData.status} />
          </li>
          {/* <li className={StudentCardCSS.studentInfo}>Created By: <b>{studentData.createdBy}</b></li> */}
          {/* <li className={StudentCardCSS.studentInfo}>Technical Interview Data: <b>{studentData.technicalInterviewDate}</b></li> */}
        </ul>
        <button
          className={StudentCardCSS.interviewButton}
          variant="primary"
          onClick={() => {
            navigate("/interview");
            setAttemptNumber();
          }}
        >
          Start new interview
        </button>
      </div>
      {/* <div className={StudentCardCSS.studentInfoCard}>
                    <h3 className={StudentCardCSS.notesHeading}>Notes:</h3>
                    {studentData.notes.map((note,index) => (
                        <div key={index}>
                            <p className={StudentCardCSS.notesInfo}>Attempt {note.attemptNum}: {note.date}</p>
                            <p className={StudentCardCSS.notesNarrative}>{note.content}</p>
                        </div>
                    ))}
                </div> */}
    </div>
  );
};

export default StudentCard;
