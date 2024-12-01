-- Create the 'school' database
CREATE DATABASE IF NOT EXISTS school;

-- Switch to the 'school' database
USE school;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert fake data into the 'users' table
INSERT INTO users (email, password) VALUES 
('john.doe@example.com', 'password123'),
('jane.smith@example.com', 'password456'),
('mike.jones@example.com', 'password789'),
('emily.brown@example.com', 'password321'),
('chris.davis@example.com', 'password654');

-- Create the 'departments' table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- Insert fake data into the 'departments' table
INSERT INTO departments (name, description) VALUES 
('Computer Science', 'This department focuses on software development, algorithms, and system design.'),
('Mathematics', 'The Mathematics department offers courses on theoretical and applied mathematics.'),
('Physics', 'The Physics department covers both classical and modern physics, including quantum mechanics.'),
('Business Administration', 'Business Administration department offers courses on management, economics, and finance.'),
('Engineering', 'The Engineering department provides courses on civil, mechanical, and electrical engineering.');

-- Additional sample data for other tables or fields can be added similarly.

-- You can run the following command to check the inserted data
-- SELECT * FROM users;
-- SELECT * FROM departments;
