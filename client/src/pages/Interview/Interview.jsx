import React from "react";
import InterviewCard from "../../components/InterviewCard/InterviewCard";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import ClientEditor from "./ClientEditor";
import styles from "./Interview.module.css";

const Interview = () => {
  // index.js is the default js file when the page loads, the value is the code in the terminal
  const files = {
    "/index.js": `console.log("test")`,
    "/question-1": "// enter code here",
    "/question-2": "// enter code here",
    "/question-3": "// enter code here",
  };

  // its critical that the SandpackProvider be one "level" above the ClientEditor due to the interactions
  // with the provider bundler
  return (
    <div className={styles.interviewWrapper}>
      <div className={styles.editor}>
        <SandpackProvider
          files={files}
          theme={nightOwl}
          options={{
            layout: {
              height: 400,
            },
          }}
        >
          <ClientEditor />
        </SandpackProvider>
      </div>
      <InterviewCard />
    </div>
  );
};

export default Interview;
