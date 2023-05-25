import React from "react";
import InputNotes from "../components/InterviewInputNotes";
import NavBar from "../components/DashboardNavBar";

const Interview = ({ userid }) => {
  return (
    <div>
      <NavBar userid={userid} />
      <InputNotes userid={userid} />
    </div>
  );
};

export default Interview;
