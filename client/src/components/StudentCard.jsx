import React from "react";

const StudentCard = () => {

    let studentData = {
        name: "Jon Snow",
        email: "jonsnow@example.com",
        phone: "555-123-4567",
        cohort: "MCSP-35",
        status: "Technical Interview",
        createdBy: "Rane Gray",
        interviewDate: "June 6th, 2023 @ 10:00AM MST",
        notes: {
            attemptNum: 1,
            date: "May 23rd, 2023",
            narrative: "Jon performed decently on most topics. Struggled with accessing properties on an object"
        }
    }

    return StudentCard;
}