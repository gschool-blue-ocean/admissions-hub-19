DROP TABLE IF EXISTS attempts;
DROP TABLE IF EXISTS question_notes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS cohorts;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
  user_id serial PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(150) UNIQUE NOT NULL,
  password_hash varchar(10000) NOT NULL,
  salt BYTEA
); 

CREATE TABLE IF NOT EXISTS cohorts (
  cohort_id serial PRIMARY KEY,
  name varchar(10),
  start_date date
); 

CREATE TABLE IF NOT EXISTS questions (
  question_id serial PRIMARY KEY,
  title varchar(200),
  question text,
  description text
);

CREATE TABLE IF NOT EXISTS students (
  student_id serial PRIMARY KEY NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(150) UNIQUE NOT NULL,
  start_date varchar(50),
  status int NOT NULL,
  score int
);

CREATE TABLE IF NOT EXISTS question_notes (
  question_note_id serial NOT NULL, 
  question_id int REFERENCES questions(question_id), 
  note text
);

CREATE TABLE IF NOT EXISTS attempts (
  attempt_id serial NOT NULL,
  date date,
  student_id int REFERENCES students(student_id),
  staff_id int REFERENCES users(user_id),
  question1_id int REFERENCES questions(question_id),
  rating1 int,
  question2_id int REFERENCES questions(question_id),
  rating2 int,
  question3_id int REFERENCES questions(question_id),
  rating3 int,
  notes text,
  rating_score int
);
