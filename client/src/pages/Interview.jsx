import React from "react";
import InputNotes from "../components/InterviewInputNotes";
import CodingWindow from "../components/InterviewCodingWindow";

const Interview = ({ userid }) => {
  return (
    <>
      <InputNotes userid={userid} />
    </>
  );
};

export default Interview;
