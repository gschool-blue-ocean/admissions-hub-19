-- Seed data for users table
INSERT INTO users (first_name, last_name, email, password_hash, salt) VALUES 
  ('Tony', 'Stark', 'ironman@example.com', 'password', 'salt'),
  ('Steve', 'Rogers', 'captainamerica@example.com', 'password', 'salt'),
  ('Natasha', 'Romanoff', 'blackwidow@example.com', 'password', 'salt'),
  ('Bruce', 'Banner', 'hulk@example.com', 'password', 'salt'),
  ('Thor', 'Odinson', 'thor@example.com', 'password', 'salt'),
  ('Peter', 'Parker', 'spiderman@example.com', 'password', 'salt'),
  ('Wanda', 'Maximoff', 'scarletwitch@example.com', 'password', 'salt'),
  ('Stephen', 'Strange', 'doctorstrange@example.com', 'password', 'salt'),
  ('Carol', 'Danvers', 'captainmarvel@example.com', 'password', 'salt');

-- Seed data for cohorts table
INSERT INTO cohorts (name, start_date) VALUES
('MCSP-35', '2023-07-01'),
('MCSP-36', '2022-08-01');

-- Seed data for questions table
INSERT INTO questions (title, question, description) VALUES
('Question 1', 'Sort Array.', 'Given an array of numbers, write a function that sorts the numbers from smallest to largest.'),
('Question 2', 'Two Sum', 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.'),
('Question 3', 'Merge Two Sorted Lists', 'Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.');

-- Seed data for students table
INSERT INTO students (first_name, last_name, email, cohort_id, numAttempts, paid, paperwork)
VALUES
  ('Jon', 'Snow', 'jonsnow@example.com', 1, 2, true, false),
  ('Daenerys', 'Targaryen', 'daenerystargaryen@example.com', 2, 1, true, true),
  ('Tyrion', 'Lannister', 'tyrionlannister@example.com', 2, 3, false, true),
  ('Arya', 'Stark', 'aryastark@example.com', 1, 1, true, true),
  ('Sansa', 'Stark', 'sansastark@example.com', 2, 2, true, false),
  ('Cersei', 'Lannister', 'cerseilannister@example.com', 1, 1, false, true),
  ('Jaime', 'Lannister', 'jaimelannister@example.com', 1, 3, true, false),
  ('Bran', 'Stark', 'branstark@example.com', 2, 1, true, true),
  ('Theon', 'Greyjoy', 'theongreyjoy@example.com', 2, 2, false, true),
  ('Margaery', 'Tyrell', 'margaerytyrell@example.com', 1, 2, true, false);


-- Seed data for question_notes table
INSERT INTO question_notes (question_id, note) VALUES
(1, 'Input: nums = [5,2,3,1] | Output: [1,2,3,5]'),
(2, 'Given nums = [2, 7, 11, 15], target = 9, Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].'),
(3, 'Input: 1->2->4, 1->3->4 | Output: 1->1->2->3->4->4');

-- Seed data for attempts table
INSERT INTO attempts (date, student_id, staff_id, question1_id, answer1, rating1, question2_id, answer2, rating2, question3_id, answer3, rating3, notes, rating_score, pass) VALUES
('2023-01-02', 1, 2, 1, 'John Doe', 4, 2, 'Blue', 3, 3, 'Pizza', 5, 'Good job!', 12, true);

