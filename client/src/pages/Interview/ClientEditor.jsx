import React, { useEffect, useState } from "react";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackConsole,
  useSandpack,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { io } from "socket.io-client";
const socket = io("127.0.0.1:3175/");

function ClientEditor() {
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
    console.log(socket.id);
  });

  // listener for when server decides to feed data
  socket.on("content", (data) => {
    setContent(data);
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
    <SandpackLayout>
      <SandpackCodeEditor
        showTabs={true}
        showLineNumbers={true}
        template="vanilla"
      />
      <SandpackConsole standalone={true} resetOnPreviewRestart={true} />
    </SandpackLayout>
  );
}

export default ClientEditor;
