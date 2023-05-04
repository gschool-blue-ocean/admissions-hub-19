CREATE TABLE IF NOT EXISTS users(
  user_id serial PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(150) NOT NULL,
  isStaff boolean NOT NULL,
  password_hash varchar(100) NOT NULL,
  salt BYTEA NOT NULL
); 


CREATE TABLE IF NOT EXISTS cohorts (
  cohort_id serial PRIMARY KEY,
  name varchar(10),
  start_date date
); 

CREATE TABLE IF NOT EXISTS students (
  student_id serial PRIMARY KEY NOT NULL,
  user_id int NOT NULL REFERENCES users(user_id),
  cohort_id int REFERENCES cohorts(cohort_id),
  numAttempts int,
  paid boolean,
  paperwork1 boolean,
  paperwork2 boolean,
  paperwork3 boolean
);


CREATE TABLE IF NOT EXISTS questions (
  question_id serial PRIMARY KEY,
  title varchar(200),
  question text,
  description text
);

CREATE TABLE IF NOT EXISTS question-notes (
  question_note_id serial NOT NULL, 
  question_id int REFERENCES questions(question_id), 
  note text
);

CREATE TABLE IF NOT EXISTS attempts (
  attempt_id serial NOT NULL,
  date date,
  student_id int REFERENCES students(student_id),
  staff_id int REFERENCES users(users_id),
  question1_id int REFERENCES questions(question_id),
  answer1 text,
  rating1 int,
  question2_id int REFERENCES questions(question_id),
  answer2 text,
  rating2 int,
  question3_id int REFERENCES questions(question_id),
  answer3 text,
  rating3 int,
  notes text,
  rating_score int,
  pass bool
);



