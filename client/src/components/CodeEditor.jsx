// import React, { useState } from "react";
// import MonacoEditor from "react-monaco-editor";
// import { ToastContainer, toast} from "react-toastify";
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';



// const CodeEditor = () => {
//   const [code, setCode] = useState("");
//   const [theme, setTheme] = useState("vs-dark");
//   const [language, setLanguage] = useState("javascript");
//   //const [output, SetOutput] = useState("");
//   const [compilerOutput, setCompilerOutput] = useState('');


//   const editorOptions = {
//     selectOnLineNumbers: true,
//   };

//   const handleRunClick = () => {
//     try {
//     console.log("Code is running...");
//     console.log('Code:', code);
//     }catch (error) {
//       console.log("code failed:", code)
//     }
//   };

//   const handleSaveClick = () => {
//     try {
//     console.log("Code is saved.")
//   }catch (error) {
//       console.log("code not saved:", code)
//     }
//   };

//   const handleThemeChange = (event) => {
//     setTheme(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
    
//   };
//   const output = 'Compiler: Code executed successfully.';

//   try {
//   setOutput(output);
//   toast.success(output); // Display success notification using react-toastify
// } catch (error) {
//   console.error('Error occurred during code execution:', error);
//   const output = `Compiler Error: ${error.message}`;
//   setOutput(output);
//   toast.error(output); // Display error notification using react-toastify
// }
// };


//   return (
//     <div style={{ display: "flex", height: "85vh", color: "white" }}>
//       <div style={{ flex: "1" }}>
//         <MonacoEditor
//           width="100%"
//           height="100%"
//           language={language}
//           theme={theme}
//           value={code}
//           options={editorOptions}
//           onChange={setCode}
//         />
//         <div>
//           <button onClick={handleRunClick}>Run</button>
//           <button onClick={handleSaveClick}>Save</button>
//           <label>
//             Theme:
//             <select value={theme} onChange={handleThemeChange}>
//               <option value="vs-dark">Dark</option>
//               <option value="vs-light">Light</option>
//             </select>
//           </label>
//           <label>
//             Language:
//             <select value={language} onChange={handleLanguageChange}>
//               <option value="javascript">JavaScript</option>
//               <option value="python">Python</option>
//               <option value="php">PHP</option>
//             </select>
//           </label>
//         </div>
//       </div>
//       <div style={{ display: 'flex', position: "absolute", bottom: "0", left: "0", right: "0" }}>
//         <h3>Output</h3>
//         <div>
//         <SyntaxHighlighter language="text" style={vscDarkPlus}>
//             {compilerOutput}
//           </SyntaxHighlighter>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );

// };

// export default CodeEditor;

import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [compilerOutput, setCompilerOutput] = useState("");

  const editorOptions = {
    selectOnLineNumbers: true,
  };

  const handleRunClick = () => {
    try {
      console.log("Code is running...");
      console.log("Code:", code);

      // Perform code execution here and obtain the output
      const output = "Compiler: Code executed successfully.";
      setCompilerOutput(output);
      toast.success(output); // Display success notification using react-toastify
    } catch (error) {
      console.error("Error occurred during code execution:", error);
      const output = `Compiler Error: ${error.message}`;
      setCompilerOutput(output);
      toast.error(output); // Display error notification using react-toastify
    }
  };

  const handleSaveClick = () => {
    console.log("Code is saved.");
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ display: "flex", height: "85vh", color: "white" }}>
      <div style={{ flex: "1" }}>
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

      {/* //The second box */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        {/* <div style={{display: "flex", 
      positon: "absolute",
      height: "70vh",
      flexDirection: "column"}}>
      </div> */}
        <div style={{ display: "flex", backgroundColor: "black", padding: "1rem", position: 'absolute', height: "60vh", width: "59vw"}}>
        <h3>
          Output
        </h3>
        <div style = {{display: "flex", overflow: "auto" }}>
          <SyntaxHighlighter language="text" style={{vscDarkPlus, display: "block"}}>
            {compilerOutput}
          </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CodeEditor;
