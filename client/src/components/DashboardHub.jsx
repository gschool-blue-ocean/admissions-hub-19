import React from "react";
import { Button } from "react-bootstrap";
import AddStudentButton from "./DashboardAddStudentBtn";
import StudentCard from "./StudentCard/StudentCard";
import Table from "./Table/Table";
import useUserStore from "../store/userStore";

const DashboardHub = () => {
  const studentId = useUserStore((state) => state.studentId);

  const handleRemoveStudent = () => {
    fetch(`http://localhost:3000/student/${studentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // TODO: Add a toast notification
        // TODO: Refactor to update state instead of reloading the page
        window.location.reload();
      });
  };

  return (
    <div className="d-flex">
      <div className="d-flex w-100 flex-column align-items-end">
        <div className="d-flex flex-row-reverse">
          <AddStudentButton />
          {/* Note: Remove student from database */}
          {studentId && <Button
            onClick={handleRemoveStudent}
            style={{
              backgroundColor: "#0D99FF",
              padding: "2px",
              paddingLeft: "12px",
              paddingRight: "12px",
              marginTop: "8px",
              marginBottom: "8px",
              marginRight: "8px",
              border: "none",
            }}
          >
            Remove selected student
          </Button>}
        </div>
        <Table />
      </div>
      <StudentCard />
    </div>
  );
};

export default DashboardHub;
