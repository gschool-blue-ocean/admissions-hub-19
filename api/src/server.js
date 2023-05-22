import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res, next) => {
  res.send("Test Response Good");
});

// ATTEMPTS TABLE ROUTES
import attemptsController from "./routesAttempts.js";
app.get("/attempts", attemptsController.findAll);
app.get("/attempt/:id", attemptsController.findOne); //pk
app.get("/attempts/student/:id", attemptsController.findAllForStudent);
app.get("/attempts/staff/:id", attemptsController.findAllForStaff);
app.post("/attempt", attemptsController.create);
app.delete("/attempt/:id", attemptsController.remove);
app.patch("/attempt/:id", attemptsController.update);

// COHORTS TABLE ROUTES
import cohortsController from "./routesCohorts.js";
app.get("/cohorts", cohortsController.findAll);
app.get("/cohort/:id", cohortsController.findOne);
app.post("/cohort", cohortsController.create);
app.delete("/cohort/:id", cohortsController.remove);
app.patch("/cohort/:id", cohortsController.update);

// QUESTIONS TABLE ROUTES
import questionsController from "./routesQuestions.js";
app.get("/questions", questionsController.findAll);
app.get("/question/:id", questionsController.findOne);
app.post("/question", questionsController.create);
app.delete("/question/:id", questionsController.remove);
app.patch("/question/:id", questionsController.update);

// QUESTION_NOTES TABLE ROUTES
import questionNotesController from "./routesQuestionNotes.js";
app.get("/question_notes", questionNotesController.findAll);
app.get("/question_note/:id", questionNotesController.findOne);
app.get(
  "/question_notes/question/:id",
  questionNotesController.findAllForQuestion
);
app.post("/question_note", questionNotesController.create);
app.delete("/question_note/:id", questionNotesController.remove);
app.patch("/question_note/:id", questionNotesController.update);

// STUDENTS TABLE ROUTES
import studentsController from "./routesStudents.js";
app.get("/students", studentsController.findAll);
app.get("/student/:id", studentsController.findOne);
app.get("/students/cohort/:id", studentsController.findAllInCohort);
app.post("/student", studentsController.create);
app.delete("/student/:id", studentsController.remove);
app.patch("/student/:id", studentsController.update);

// USERS TABLE ROUTES
import usersController from "./routesUsers.js";
app.get("/users", usersController.findAll);
app.get("/user/:id", usersController.findOne);
app.post("/user", usersController.create);
app.delete("/user/:id", usersController.remove);
app.patch("/user/:id", usersController.update);
app.post("/login", usersController.authenticate);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error", err);
});

//JWT AUTH SECTION...has to match unto student_id, staff_id, cohort_id,
//question_id,

export default app;
