-- Seed data for users table
INSERT INTO users (first_name, last_name, email, is_staff, password_hash, salt) VALUES 
('John', 'Doe', 'john.doe@example.com', false, 'password1', 'salt1'),
('Jane', 'Doe', 'jane.doe@example.com', true, 'password2', 'salt2');

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
INSERT INTO students (user_id, cohort_id, numAttempts, paid, paperwork1, paperwork2, paperwork3) VALUES
(1, 1, 0, true, true, false, true);


-- Seed data for question_notes table
INSERT INTO question_notes (question_id, note) VALUES
(1, 'Input: nums = [5,2,3,1] | Output: [1,2,3,5]'),
(2, 'Given nums = [2, 7, 11, 15], target = 9, Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].'),
(3, 'Input: 1->2->4, 1->3->4 | Output: 1->1->2->3->4->4');

-- Seed data for attempts table
INSERT INTO attempts (date, student_id, staff_id, question1_id, answer1, rating1, question2_id, answer2, rating2, question3_id, answer3, rating3, notes, rating_score, pass) VALUES
('2023-01-02', 1, 2, 1, 'John Doe', 4, 2, 'Blue', 3, 3, 'Pizza', 5, 'Good job!', 12, true);

