import React from "react";
import StatusTagCSS from "./StatusTag.module.css";

const StatusTag = ({ studentStatus }) => {
  let statusStyle = "";
  let statusName = "";

  if (studentStatus == 3) {
    statusStyle = StatusTagCSS.interview;
    statusName = "Technical interview";
  }
  if (studentStatus == 2) {
    statusStyle = StatusTagCSS.challenge;
    statusName = "Code challenge";
  }
  if (studentStatus == 1) {
    statusStyle = StatusTagCSS.prep;
    statusName = "Prep work";
  }
  if (studentStatus == 4) {
    statusStyle = StatusTagCSS.done;
    statusName = "Finished";
  }

  return (
    <div className={statusStyle}>
      <div>{statusName}</div>
    </div>
  );
};

export default StatusTag;
