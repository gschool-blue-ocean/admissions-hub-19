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
INSERT INTO students (first_name, last_name, email, start_date, status, score)
VALUES
  ('John', 'Doe', 'johndoe@example.com', '2021-09-01', 1, NULL),
  ('Jane', 'Doe', 'janedoe@example.com', '2021-09-01', 2, 12),
  ('Bob', 'Smith', 'bobsmith@example.com', '2021-09-02', 3, NULL),
  ('Alice', 'Johnson', 'alicejohnson@example.com', '2021-09-02', 4, 11),
  ('Mike', 'Williams', 'mikewilliams@example.com', '2021-09-03', 2, 10),
  ('Sara', 'Lee', 'saralee@example.com', '2021-09-03', 2, NULL),
  ('David', 'Brown', 'davidbrown@example.com', '2021-09-04', 3, 14),
  ('Emily', 'Davis', 'emilydavis@example.com', '2021-09-04', 2, 9),
  ('Tom', 'Wilson', 'tomwilson@example.com', '2021-09-05', 4, NULL),
  ('Amy', 'Taylor', 'amytaylor@example.com', '2021-09-05', 1, 15),
  ('Chris', 'Anderson', 'chrisanderson@example.com', '2021-09-06', 2, 8),
  ('Jessica', 'Martin', 'jessicamartin@example.com', '2021-09-06', 4, NULL),
  ('Mark', 'Jackson', 'markjackson@example.com', '2021-09-07', 1, 10),
  ('Karen', 'Lee', 'karenlee@example.com', '2021-09-07', 3, 9),
  ('Steven', 'Harris', 'stevenharris@example.com', '2021-09-08', 3, NULL),
  ('Laura', 'Clark', 'lauraclark@example.com', '2021-09-08', 1, 8),
  ('Kevin', 'Young', 'kevinyoung@example.com', '2021-09-09', 2, 9),
  ('Melissa', 'Allen', 'melissaallen@example.com', '2021-09-09', 4, 14),
  ('Brian', 'King', 'brianking@example.com', '2021-09-10', 1, 14),
  ('Rachel', 'Wright', 'rachelwright@example.com', '2021-09-10', 2, 13),
  ('Eric', 'Scott', 'ericscott@example.com', '2021-09-11', 4, NULL),
  ('Stephanie', 'Green', 'stephaniegreen@example.com', '2021-09-11', 1, 11),
  ('Daniel', 'Baker', 'danielbaker@example.com', '2021-09-12', 3, 7),
  ('Megan', 'Nelson', 'megannelson@example.com', '2021-09-12', 4, 5);


-- Seed data for question_notes table
INSERT INTO question_notes (question_id, note) VALUES
(1, 'Input: nums = [5,2,3,1] | Output: [1,2,3,5]'),
(2, 'Given nums = [2, 7, 11, 15], target = 9, Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].'),
(3, 'Input: 1->2->4, 1->3->4 | Output: 1->1->2->3->4->4');

-- Seed data for attempts table
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES('2023-01-01', 1, 1, 1, 4, 2, 3, 3, 5, 'Good job!', 12);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES('2023-02-02', 1, 2, 1, 1, 2, 3, 3, 2, 'Terrible', 6);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES('2023-03-03', 1, 3, 1, 3, 2, 3, 3, 3, 'Meh', 9);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-04-04', 2, 1, 1, 5, 2, 4, 3, 3, 'Great work!', 12);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-05-05', 2, 2, 1, 2, 2, 3, 3, 4, 'Improvement needed', 9);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-06-06', 3, 1, 1, 4, 2, 5, 3, 4, 'Keep up the good work!', 13);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-07-07', 3, 3, 1, 3, 2, 3, 3, 5, 'Impressive!', 11);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-08-08', 4, 2, 1, 5, 2, 5, 3, 5, 'Excellent performance!', 15);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-09-09', 4, 3, 1, 3, 2, 4, 3, 4, 'Good effort!', 11);
INSERT INTO attempts (date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score) VALUES ('2023-10-10', 5, 1, 1, 2, 2, 3, 3, 3, 'Crappy performance', 8);