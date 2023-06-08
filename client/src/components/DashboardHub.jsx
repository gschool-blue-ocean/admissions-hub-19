import React from "react";
import { Button } from "react-bootstrap";
import "../css/DashboardHub.css";
import { useNavigate } from "react-router-dom";
import CohortComponent from "./DashboardCohortStudentTableBtn";
import AddCohortButton from "./DashboardAddCohortBtn";
import AddStudentButton from "./DashboardAddStudentBtn";
import DeleteCohortButton from "./DashboardDeleteCohortBtn";
import StudentCard from "./StudentCard";

const DashboardHub = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      background: "rgb(2,3,129)",
      backgroundSize: "cover",
      minHeight: "100vh",
      }}
      >
      <br/>
      <div>
        <CohortComponent />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
        <Button
          className="LaunchInterviewBtn"
          variant="primary"
          onClick={() => navigate("/interview")}
        >
          Launch Interview
        </Button>
</div>
        <AddStudentButton />
        <AddCohortButton />
        <DeleteCohortButton />
      </div>
      <StudentCard />
    </div>
  );
};

export default DashboardHub;
