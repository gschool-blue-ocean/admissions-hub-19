import React from "react";
import StarRating from "../InterviewStarRating";
import styles from "./QuestionBlock.module.css";
import useRatingStore from "../../store/ratingStore";

const QuestionBlock = ({ step, title, content, selectedQuestion, rating1, rating2, rating3, setRating1, setRating2, setRating3 }) => {

  return (
    <div className={styles.questionBlock}>
      <p className={styles.title}>{title}</p>
      <p>{content}</p>
      {step === 1 ? <StarRating rating={rating1} setRating={setRating1} /> : null}
      {step === 2 ? <StarRating rating={rating2} setRating={setRating2} /> : null}
      {step === 3 ? <StarRating rating={rating3} setRating={setRating3} /> : null}
    </div>
  );
};

export default QuestionBlock;
