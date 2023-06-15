import React from "react";
import StarRating from "../InterviewStarRating";
import QuestionBlockCSS from "./QuestionBlock.module.css";

const QuestionBlock = (props) => {

    const {title, content} = props;

    return (
            <div className={QuestionBlockCSS.questionBlock}>
                <h3>{title}</h3>
                <p>{content}</p>
                <StarRating />
            </div>
    )
}

export default QuestionBlock;