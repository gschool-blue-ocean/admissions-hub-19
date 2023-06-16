import React from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import ClientEditor from "./Interview/ClientEditor";

export default function StudentInterview() {
  const files = {
    "/index.js": `console.log("test")`,
    "/question-1": "// enter code here",
    "/question-2": "// enter code here",
    "/question-3": "// enter code here",
  };
  return (
    <>
      <SandpackProvider
        files={files}
        className="w-75"
        theme={nightOwl}
        options={{
          layout: {
            height: 400,
          },
        }}
      >
        <ClientEditor />
      </SandpackProvider>
    </>
  );
}
