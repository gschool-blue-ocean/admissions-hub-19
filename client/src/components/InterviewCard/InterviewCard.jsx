import React, { useState, useEffect } from "react";
import InterviewCardCSS from "./InterviewCard.module.css";
import QuestionBlock from "./QuestionBlock";
import baseurl from "../../url.js";
import { toast } from "react-toastify";

const InterviewCard = () => {
  const routeHTTP = `${baseurl}`;

  let interviewData = {
    interviewee: "Jon Snow",
    attempt: 1,
    currentScore: 0,
    questions: [
      {
        questNum: 1,
        title: "Sort Array",
        content:
          "Given an array of numbers, write a function that sorts the number from smallest to largest.",
        note: "",
      },
      {
        questNum: 2,
        title: "Tree in the woods",
        content:
          "If a tree falls in the woods and nobody is around to hear it, what is the circumference of the sun?",
        note: "",
      },
      {
        questNum: 3,
        title: "Apples and oranges",
        content:
          "Jimmy has one apple and Susie has two apples, how many oranges do they have together?",
        note: "",
      },
    ],
  };

  // const [interviewQuestions, setInterviewQuestions] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [selectedContent, setSelectedContent] = useState(
    interviewData.questions[0].content
  );
  const [selectedTitle, setSelectedTitle] = useState(
    interviewData.questions[0].title
  );
  const [note, setNote] = useState(interviewData.questions[0].note);

  const handleClick = (question) => {
    setSelectedQuestion(question.questNum);
    setSelectedContent(question.content);
    setSelectedTitle(question.title);
    setNote(question.note);
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

  const handleBlur = () => {
    // TODO Save the note when the input field loses focus
    saveNote();
  };

  const saveNote = () => {
    // TODO Implement your save logic here, e.g., make an API call, update state, etc.
    console.log("Saving note:", note);
    interviewData.questions[sel];
  };

  useEffect(() => {
    getAllQuestionsData();
  }, []);
  const getAllQuestionsData = async () => {
    await fetch(`${routeHTTP}/questions`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        // setInterviewQuestions(data);
        // console.log(interviewQuestions)
      });
  };

  return (
    <div className={InterviewCardCSS.cardContainer}>
      <div className={InterviewCardCSS.cardWrapper}>
        <div>
          <p className={InterviewCardCSS.interviewInfo}>
            Interviewee: <b>{interviewData.interviewee}</b>
          </p>

          <p className={InterviewCardCSS.interviewInfo}>
            Attempt #: <b>{interviewData.attempt}</b>
          </p>
          <p className={InterviewCardCSS.interviewInfo}>
            Current Score: <b>{interviewData.currentScore}</b>
          </p>
          <div className={InterviewCardCSS.flexRow}>
            {interviewData.questions.map((question) => (
              <b
                key={question.questNum}
                onClick={() => handleClick(question)}
                className={
                  question.questNum === selectedQuestion
                    ? InterviewCardCSS.activeQuestion
                    : ""
                }
              >
                {/* {console.log("Question " + selectedQuestion + " Selected!")} */}
                Question {question.questNum}
              </b>
            ))}
          </div>
        </div>

        <QuestionBlock title={selectedTitle} content={selectedContent} />

        <div className={InterviewCardCSS.cardHeader}>
          <h4>Notes:</h4>
          <div className={InterviewCardCSS.notesBlock}>
            <textarea
              className={InterviewCardCSS.notesInput}
              value={note}
              onChange={handleNoteChange}
              onBlur={handleBlur}
              placeholder={
                "Notes, thoughts, strengths, weaknesses of student..."
              }
            ></textarea>
          </div>
          <div className={InterviewCardCSS.buttonWrapper}>
            <button className={InterviewCardCSS.linkButton} onClick={copyLink}>
              Invite link
            </button>
            <button className={InterviewCardCSS.endButton}>
              End interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
