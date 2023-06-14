import React, { useState } from "react";
import InterviewCardCSS from "./InterviewCard.module.css";
import QuestionBlock from "./QuestionBlock";

const InterviewCard = () => {

    let interviewData = {
        interviewee: "Jon Sno",
        attempt: 1,
        currentScore: 0,
        questions:[
            {
                questNum: 1,
                title: "Sort Array",
                content: "Given an array of numbers, write a function that sorts the number from smallest to largest.",
                note: ""
            },
            {
                questNum: 2,
                title: "Tree in the woods",
                content: "If a tree falls in the woods and nobody is around to hear it, what is the circumference of the sun?",
                note: ""
            },
            {
                questNum: 3,
                title: "Apples and oranges",
                content: "Jimmy has one apple and Susie has two apples, how many oranges do they have together?",
                note: ""
            }
        ]
    }

    const [selectedQuestion, setSelectedQuestion] = useState('');

    const handleClick = (question) => {
        setSelectedQuestion(question);
    };

        return (
    
            <div className={InterviewCardCSS.cardContainer}>
                <div className={InterviewCardCSS.cardHeader}>
                    <div className={InterviewCardCSS.flexRow}>
                        <p className={InterviewCardCSS.interviewInfo}>Interviewee: <b>{interviewData.interviewee}</b></p>
                        <button className={InterviewCardCSS.linkButton}>Invite Link</button>
                    </div>
                    <p className={InterviewCardCSS.interviewInfo}>Attempt #: <b>{interviewData.attempt}</b></p>
                    <p className={InterviewCardCSS.interviewInfo}>Current Score: <b>{interviewData.currentScore}</b></p>
                    <div className={InterviewCardCSS.flexRow}>
                        {interviewData.questions.map((question) => (
                            <b
                            key={question.questNum}
                            onClick={() => handleClick(question.questNum)}
                            className={question.questNum === selectedQuestion ? InterviewCardCSS.activeQuestion : ''}
                            >
                                {console.log("Question " + selectedQuestion + " Selected!")}
                                Question {question.questNum}
                            </b>
                        ))}
                    </div>
                </div>
                <div className={InterviewCardCSS.cardContainer}>
                    {/* {selectedQuestion &&
                        interviewData
                            .filter((question) => question.questNum === selectedQuestion)
                            .map((question) => (
                                <h1>{question.title}</h1>
                    ))} */}
                    <QuestionBlock title={interviewData.questions[0].title} content={interviewData.questions[0].content} />
                </div>
    
            </div>
        )
    }

export default InterviewCard;
