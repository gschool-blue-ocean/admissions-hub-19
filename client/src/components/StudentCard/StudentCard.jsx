import React from "react";
import StudentCardCSS from "./StudentCard.module.css";
import { useNavigate } from "react-router-dom";

const StudentCard = () => {

    const navigate = useNavigate();

    let studentData = {
        name: "Jon Snow",
        email: "jonsnow@example.com",
        phone: "555-123-4567",
        cohort: "MCSP-35",
        status: "Technical Interview",
        createdBy: "Rane Gray",
        technicalInterviewDate: "June 6th, 2023 @ 10:00AM MST",
        notes: [
            {
                attemptNum: 1,
                date: "May 23rd, 2023",
                content: "Jon performed decently on most topics. Struggled with accessing properties on an object"
            },
            {
                attemptNum: 2,
                date: "June 9th, 2023",
                content: "What kind of a name is Jon Snow anyway?"
            }
        ]
    }

    var statusStyle = "";

    if(studentData.status == "Technical Interview"){
        statusStyle = StudentCardCSS.interview;
    }
    if(studentData.status == "Coding Challenge"){
        statusStyle = StudentCardCSS.challenge;
    }
    if(studentData.status == "Prep Work"){
        statusStyle = StudentCardCSS.prep;
    }
    if(studentData.status == "Done"){
        statusStyle = StudentCardCSS.done;
    }

    return (
        <div className={StudentCardCSS.cardContainer}>
            <div className={StudentCardCSS.studentInfoCard}>
                <div className={StudentCardCSS.cardHeader}>
                    <img className={StudentCardCSS.icon} src="https://img.icons8.com/?size=512&id=kDoeg22e5jUY&format=png"></img>
                    <h3>{studentData.name}</h3>
                </div>
                <ul className={StudentCardCSS.studentInfoList}>
                    <li className={StudentCardCSS.studentInfo}>Email: <b>{studentData.email}</b></li>
                    <li className={StudentCardCSS.studentInfo}>Phone #: <b>{studentData.phone}</b></li>
                    <li className={StudentCardCSS.studentInfo}>Cohort: <b>{studentData.cohort}</b></li>
                    <li className={StudentCardCSS.studentInfo}>Status: <b className={statusStyle}>{studentData.status}</b></li>
                    <li className={StudentCardCSS.studentInfo}>Created By: <b>{studentData.createdBy}</b></li>
                    <li className={StudentCardCSS.studentInfo}>Technical Interview Data: <b>{studentData.technicalInterviewDate}</b></li>
                </ul>
                <button 
                className={StudentCardCSS.interviewButton}
                variant="primary"
                onClick={() => navigate("/interview")}
                >
                    Begin Interview
                </button>
            </div>
                <div className={StudentCardCSS.studentInfoCard}>
                    <h3 className={StudentCardCSS.notesHeading}>Notes:</h3>
                    {studentData.notes.map((note,index) => (
                        <div key={index}>
                            <p className={StudentCardCSS.notesInfo}>Attempt {note.attemptNum}: {note.date}</p>
                            <p className={StudentCardCSS.notesNarrative}>{note.content}</p>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default StudentCard;