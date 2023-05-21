import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import CodeParent from "./CodeParent";

const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <CodeParent />
      <Editor
        height="100vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// Editor view should match problem set"
        onChange={handleEditorChange}
      />

    </div>

  );
};
export default CodeEditor;