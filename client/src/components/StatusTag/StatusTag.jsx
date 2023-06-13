import React from "react";
import StatusTagCSS from "./StatusTag.module.css";

const StatusTag = ( {studentStatus} ) => {

    var statusStyle = "";

    if(studentStatus == "Technical Interview"){
        statusStyle = StatusTagCSS.interview;
    }
    if(studentStatus == "Coding Challenge"){
        statusStyle = StatusTagCSS.challenge;
    }
    if(studentStatus == "Prep Work"){
        statusStyle = StatusTagCSS.prep;
    }
    if(studentStatus == "Done"){
        statusStyle = StatusTagCSS.done;
    }

    return (
        <b className={statusStyle}>{studentStatus}</b>
    )
}

export default StatusTag;