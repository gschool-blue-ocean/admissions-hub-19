import React, { useEffect, useState } from "react";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackConsole,
  useSandpack,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { connect, io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io(`127.0.0.1:${import.meta.env.VITE_SOCKET_SERVER_PORT}/`);

// set the height for the editor here
const editorHeight = "400px";

function ClientEditor() {
  const [userList, setUserList] = useState([]);
  // this is what goes into the editor
  const [content, setContent] = useState(null);
  //this decides when an emitter is sent to server
  const [update, setUpdate] = useState(null);
  // sandpack is general instances for the code editor, listen is a function that captures from the bundler
  const { sandpack, listen } = useSandpack();
  // this grabs the current code in the editor window
  let activeCode = useActiveCode();

  // maybe a little hacky -just flips bool values on update of codemirror instance
  listen(() => {
    setUpdate(!update);
  });

  socket.on("connect", () => {
    toast("Connected to web socket, you're live!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });

  // listener for when server decides to feed data
  socket.on("content", (data) => {
    setContent(data);
  });

  socket.on("User connected", (userID) => {
    if (userList.indexOf(userID) != undefined) {
      setUserList([...userList, userID]);
      console.log(`User ${userID} connected`);
    }
  });

  socket.on("User disconnected", (userID) => {
    let newUserList = userList;
    newUserList.splice(newUserList.indexOf(userID), 1);
  });

  const getCode = () => {
    setContent(activeCode.code);
  };

  // when data is recieved from server, updateCurrentFile updates the terminal
  useEffect(() => {
    sandpack.updateCurrentFile(content);
  }, [content]);

  // when message is sent from bundler that something is happening in the editor,
  // we capture the code and send it to the server to decide if it's important
  useEffect(() => {
    getCode();
    socket.emit("update", content);
  }, [update]);

  // this is all very modular, its vanilla now but we can make it look good later
  return (
    <>
      {/* Same as */}
      <ToastContainer />
      <SandpackLayout style={{ height: editorHeight }}>
        <SandpackCodeEditor
          showTabs={true}
          showLineNumbers={true}
          template="vanilla"
          // styling goes here:
          style={{ height: editorHeight }}
        />
        <SandpackConsole
          standalone={true}
          resetOnPreviewRestart={true}
          // styling goes here:
          style={{ height: editorHeight }}
        />
      </SandpackLayout>
    </>
  );
}

export default ClientEditor;
