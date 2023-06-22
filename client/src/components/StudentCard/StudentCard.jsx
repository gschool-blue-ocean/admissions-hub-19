import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import StatusTag from "../StatusTag/StatusTag";
import StudentCardCSS from "./StudentCard.module.css";
import baseurl from "../../url";

const StudentCard = () => {
  const studentId = useUserStore((state) => state.studentId);
  const [studentData, setStudentData] = useState(null);
  const setStudentName = useUserStore((state) => state.setStudentName);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      fetch(`${baseurl}/student/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setStudentData(data);
          setStudentName(`${data.first_name} ${data.last_name}`);
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
          <li className={StudentCardCSS.studentInfo}>
            Cohort start: <p>{studentData.start_date}</p>
          </li>
          <li className={StudentCardCSS.studentInfo}>
            Status:
            <StatusTag studentStatus={studentData.status} />
          </li>
        </ul>
        <button
          className={StudentCardCSS.interviewButton}
          variant="primary"
          onClick={() => {
            navigate("/interview");
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
