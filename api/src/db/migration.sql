DROP TABLE IF EXISTS tasks;

CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(150) NOT NULL,
  isStaff boolean NOT NULL,
  password_hash varchar(100) NOT NULL,
  salt BYTEA NOT NULL
) 

CREATE TABLE IF NOT EXISTS students (
  id serial PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  cohort_id int,
  numAttempts int,
  paid boolean,
  paperwork1 boolean,
  paperwork2 boolean,
  paperwork3 boolean
)

/*CREATE TABLE IF NOT EXISTS cohorts (

) */

/*CREATE TABLE IF NOT EXISTS questions (

)*/

/*CREATE TABLE IF NOT EXISTS question-notes (

)*/

/*CREATE TABLE IF NOT EXISTS attempts (

)*/



