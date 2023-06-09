import React from "react";
import InputNotes from "../../components/InterviewInputNotes";
import NavBar from "../../components/DashboardNavBar";
import CodeEditor from "./CodeEditor";

const Interview = ({ userid }) => {
  return (
    <div>
      <NavBar userid={userid} />
      <InputNotes userid={userid} />
      <CodeEditor />
    </div>
  );
};

export default Interview;
