import React, { useState, useEffect } from "react";
import InterviewCardCSS from "./InterviewCard.module.css";
import QuestionBlock from "./QuestionBlock";
import baseurl from "../../url.js";
import { toast } from "react-toastify";
import useRatingStore from "../../store/ratingStore";
import useUserStore from "../../store/userStore";

const InterviewCard = () => {
  const routeHTTP = `${baseurl}`;
  
  //importing state from ratingStore(zustand)
  const [note, setNote] = useState("");
  const [step, setStep] = useState(1);
  const rating1 = useRatingStore((state) => state.rating1);
  const rating2 = useRatingStore((state) => state.rating2);
  const rating3 = useRatingStore((state) => state.rating3);
  const setRating1 = useRatingStore((state) => state.setRating1);
  const setRating2 = useRatingStore((state) => state.setRating2);
  const setRating3 = useRatingStore((state) => state.setRating3);
  const studentId = useUserStore((state) => state.studentId);

  const handleClick = (question) => {
    setStep(question);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/studentinterview`);
    toast("Copied link to clipboard!", {
      position: "bottom-right",
    });
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const endInterview = () => {
    let date = new Date()
    let months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const data = {
      date: `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}`,
      student_id: studentId,
      staff_id: 1,
      question1_id: 1,
      rating1: rating1 || 3,
      question2_id: 2,
      rating2: rating2 || 3,
      question3_id: 3,
      rating3: rating3 || 3,
      notes: note,
      rating_score: (rating1 + rating2+ rating3),
    }
    console.log(data)

    fetch(`${baseurl}/attempt`, {
      method:"POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => 
      toast("sent attempt"))

  }

  return (
    <div className={InterviewCardCSS.cardContainer}>
      <div className={InterviewCardCSS.cardWrapper}>
        <div>
          <p className={InterviewCardCSS.interviewInfo}>
            Interviewee: <b>{studentId}</b>
          </p>

          <p className={InterviewCardCSS.interviewInfo}>
            Attempt #: <b>1 (attempts.length+1)</b>
          </p>
          <p className={InterviewCardCSS.interviewInfo}>
            Current Score: <b>{rating1+rating2+rating3}</b>
          </p>
          <div className={InterviewCardCSS.flexRow}>
            <p className={step === 1 ? InterviewCardCSS.activeQuestion : null} onClick={() => handleClick(1)}>Question 1</p>
            <p className={step === 2 ? InterviewCardCSS.activeQuestion : null} onClick={() => handleClick(2)}>Question 2</p>
            <p className={step === 3 ? InterviewCardCSS.activeQuestion : null} onClick={() => handleClick(3)}>Question 3</p>
          </div>
        </div>

        <QuestionBlock
          step={step}
          // selectedQuestion={selectedQuestion}
          rating1={rating1}
          rating2={rating2}
          rating3={rating3}
          setRating1={setRating1}
          setRating2={setRating2}
          setRating3={setRating3}
        />

        <div className={InterviewCardCSS.cardHeader}>
          <h4>Notes:</h4>
          <div className={InterviewCardCSS.notesBlock}>
            <textarea
              className={InterviewCardCSS.notesInput}
              value={note}
              onChange={handleNoteChange}
              // onBlur={handleBlur}
              placeholder={
                "Notes, thoughts, strengths, weaknesses of student..."
              }
            ></textarea>
          </div>
          <div className={InterviewCardCSS.buttonWrapper}>
            <button className={InterviewCardCSS.linkButton} onClick={copyLink}>
              Invite link
            </button>
            <button className={InterviewCardCSS.endButton} onClick={endInterview}>
              End interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
