import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [compilerOutput, setCompilerOutput] = useState('');

  const editorOptions = {
    selectOnLineNumbers: true,
  };

  const handleRunClick = () => {
    // Add your code compilation logic here
    try {
    console.log('Code is running...');
    console.log('Code:', code);

      //output
      const output = 'Compiler: Code executed successfully.';
      setCompilerOutput(output);
      toast.success(output); 
      return output;// Display success notification using react-toastify
    } catch (error) {
      console.error('Error occurred during code execution:', error);
      const output = `Compiler Error: ${error.message}`;
      setCompilerOutput(output);
      toast.error(output); // Display error notification using react-toastify
    }
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
      <h3>Output</h3>
        <div  style={{
        display: 'flex',
        position: 'absolute',
        width: '60vw', // Adjusts the width to be 50% of the viewport width
        height: '60vh', // Adjusts the height to be 50% of the viewport height
        border: '1px solid black', // Adds a border for visualization
        //boxSizing: 'border-box', // Includes border and padding in the total width and height
        overflow: 'auto',
        backgroundColor: '#1e1e1e'
      }}>
        <SyntaxHighlighter language="text" style={vscDarkPlus} >
            {compilerOutput}
          </SyntaxHighlighter>
        </div>
      </div>
      <ToastContainer /> {/* ToastContainer from react-toastify */}
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