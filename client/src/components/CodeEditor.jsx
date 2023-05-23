import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');

  const editorOptions = {
    selectOnLineNumbers: true,
  };

  const handleRunClick = () => {
    // Add your code compilation logic here
    console.log('Code is running...');
  };

  const handleSaveClick = () => {
    // Add your code saving logic here
    console.log('Code is saved.');
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ display: 'flex', height: '85vh' }}>
      <div style={{ flex: '1' }}>
        <MonacoEditor
          width="100%"
          height="100%"
          language={language}
          theme={theme}
          value={code}
          options={editorOptions}
          onChange={setCode}
        />
        <div>
          <button onClick={handleRunClick}>Run</button>
          <button onClick={handleSaveClick}>Save</button>
          <label>
            Theme:
            <select value={theme} onChange={handleThemeChange}>
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
            </select>
          </label>
          <label>
            Language:
            <select value={language} onChange={handleLanguageChange}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="php">PHP</option>
            </select>
          </label>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}>
        {/* Render your toast containers here */}
        {/* Example: */}
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};



export default CodeEditor;










// import React, { useState } from "react";

// import Editor from "@monaco-editor/react";
// import CodeParent from "./CodeParent";

// const CodeEditor = ({ onChange, language, code, theme }) => {
//   const [value, setValue] = useState(code || "");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange("code", value);
//   };

//   return (
//     <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//       <CodeParent />
//       <Editor
//         height="100vh"
//         width={`100%`}
//         language={language || "javascript"}
//         value={value}
//         theme={theme}
//         defaultValue="// Editor view should match problem set"
//         onChange={handleEditorChange}
//       />

//     </div>

//   );
// };
// export default CodeEditor;