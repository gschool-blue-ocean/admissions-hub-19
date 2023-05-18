import React from "react";
import InputNotes from "../components/InputNotes";
import CodingWindow from "../components/CodingWindow";

const Interview = () => {
  return (
    <div style={{
        width: "100vw",
        height: "100vh",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: "600px", width: "70%", height:"80vh", marginRight: "20px" }}>
        <CodingWindow />
      </div>
      <div style={{width: "400px", height: "80vh"}}>
        <InputNotes />
      </div>
    </div>
  );
};

export default Interview;
