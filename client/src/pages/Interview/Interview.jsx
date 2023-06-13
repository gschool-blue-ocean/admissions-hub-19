import React from "react";
import InputNotes from "../../components/InterviewInputNotes";
// import NavBar from "../../components/DashboardNavBar";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import ClientEditor from "./ClientEditor";

const Interview = () => {
  // index.js is the default js file when the page loads, the value is the code in the terminal
  const files = {
    "/index.js": `console.log("test")`,
  };

  // its critical that the SandpackProvider be one "level" above teh ClientEditor due to the interactions
  // with the provider bundler
  return (
    <div className="d-flex flex-row-reverse w-full">
      <InputNotes />
      <SandpackProvider files={files} className="w-75" >
        <ClientEditor />
      </SandpackProvider>
    </div>
  );
};

export default Interview;
