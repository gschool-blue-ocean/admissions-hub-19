import React from "react";
import StarRating from "../InterviewStarRating";
import styles from "./QuestionBlock.module.css";
import useRatingStore from "../../store/ratingStore";

// define a obj with question name and question prompt
const questions = [{
  name: "Sort Array",
  prompt: "Given an array of numbers, write a function that sorts the number from smallest to largest."
}, {
  name: "Tree in the woods",
  prompt: "If a tree falls in the woods and nobody is around to hear it, what is the circumference of the sun?"
}, 
{
  name: "Apples and oranges",
  prompt: "Jimmy has one apple and Susie has two apples, how many oranges do they have together?"
}]

const QuestionBlock = ({ step, rating1, rating2, rating3, setRating1, setRating2, setRating3 }) => {

  return (
    <div className={styles.questionBlock}>
      {/* questions is an array of objects and step is initialized to 1, but we want index 0, so we need to use "step-1" to access the first index */}
      <p className={styles.title}>{questions[step-1].name}</p>
      <p>{questions[step-1].prompt}</p>
      {step === 1 ? <StarRating rating={rating1} setRating={setRating1} /> : null}
      {step === 2 ? <StarRating rating={rating2} setRating={setRating2} /> : null}
      {step === 3 ? <StarRating rating={rating3} setRating={setRating3} /> : null}
    </div>
  );
};

export default QuestionBlock;
