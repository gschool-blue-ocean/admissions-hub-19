import React from "react";
import InputNotes from "../../components/InterviewInputNotes";
import NavBar from "../../components/DashboardNavBar";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import ClientEditor from "./ClientEditor";

const Interview = ({ userid }) => {
  // index.js is the default js file when the page loads, the value is the code in the terminal
  const files = {
    "/index.js": `console.log("test")`,
  };

  // its critical that the SandpackProvider be one "level" above teh ClientEditor due to the interactions
  // with the provider bundler
  return (
    <div>
      <NavBar userid={userid} />
      <InputNotes userid={userid} />
      <SandpackProvider files={files}>
        <ClientEditor />
      </SandpackProvider>
    </div>
  );
};

export default Interview;
