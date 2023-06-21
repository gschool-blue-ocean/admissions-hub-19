import React, { useState } from "react";
import StarRating from "../InterviewStarRating";
import styles from "./QuestionBlock.module.css";

const QuestionBlock = ({ title, content }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.questionBlock}>
      <p className={styles.title}>{title}</p>
      <p>{content}</p>
      <StarRating rating={rating} setRating={setRating} />
    </div>
  );
};

export default QuestionBlock;
