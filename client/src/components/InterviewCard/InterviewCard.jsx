import React from "react";
import InterviewCardCSS from "./InterviewCard.module.css";
import { useNavigate } from "react-router-dom";

const InterviewCard = () => {

    let interviewData = {
        interviewee: "Jon Sno",
        attempt: 2,
        currentScore: 0,
        questions:[
            {
                questNum: 1,
                content: "Given an array of numbers, write a function that sorts the number from smallest to largest.",
                note: ""
            },
            {
                questNum: 2,
                content: "If a tree falls in the woods and nobody is around to hear it, what is the circumference of the sun?",
                note: ""
            },
            {
                questNum: 3,
                content: "Jimmy has one apple and Susie has two apples, how many oranges do they have together?",
                note: ""
            }
        ]
    }

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
                    <b>Question 1</b>
                    <b>Question 2</b>
                    <b>Question 3</b>
                </div>
                </div>
    
            </div>
        )
    }

export default InterviewCard;
