-- Create the 'school' database
CREATE DATABASE IF NOT EXISTS school;

-- Switch to the 'school' database
USE school;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'chief_department', 'teacher') DEFAULT 'admin'
);

-- Insert fake data into the 'users' table
INSERT INTO users (email, password, role) VALUES 
('mike.lary@example.com', 'password123', 'admin'),
('john.doe@example.com', 'password130', 'chief_department'),
('jane.smith@example.com', 'password456', 'teacher'),
('mike.jones@example.com', 'password789', 'teacher'),
('emily.brown@example.com', 'password321', 'teacher'),
('chris.davis@example.com', 'password654', 'teacher');

-- Create the 'departments' table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

-- Insert fake data into the 'departments' table
INSERT INTO departments (name, description) VALUES 
('Computer Science', 'This department focuses on software development, algorithms, and system design.'),
('Mathematics', 'The Mathematics department offers courses on theoretical and applied mathematics.'),
('Physics', 'The Physics department covers both classical and modern physics, including quantum mechanics.'),
('Business Administration', 'Business Administration department offers courses on management, economics, and finance.'),
('Engineering', 'The Engineering department provides courses on civil, mechanical, and electrical engineering.');

-- Create the 'filieres' table
CREATE TABLE IF NOT EXISTS filieres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'filieres' table
INSERT INTO filieres (name, department_id) VALUES 
('Software Engineering', 1),
('Data Science', 1),
('Applied Mathematics', 2),
('Theoretical Physics', 3),
('Finance', 4),
('Civil Engineering', 5);

-- Create the 'students' table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Insert fake data into the 'students' table
INSERT INTO students (first_name, last_name, email, department_id) VALUES 
('Alice', 'Smith', 'alice.smith@example.com', 1),
('Bob', 'Johnson', 'bob.johnson@example.com', 2),
('Charlie', 'Brown', 'charlie.brown@example.com', 3),
('David', 'Davis', 'david.davis@example.com', 4),
('Eve', 'Wilson', 'eve.wilson@example.com', 5),
('Frank', 'Miller', 'frank.miller@example.com', 1),
('Grace', 'Young', 'grace.young@example.com', 2),
('Henry', 'Lee', 'henry.lee@example.com', 3),
('Ivy', 'Chen', 'ivy.chen@example.com', 4),
('Jack', 'Wang', 'jack.wang@example.com', 5);

-- Create the 'modules' table
CREATE TABLE IF NOT EXISTS modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    department_id INT,
    filiere_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (filiere_id) REFERENCES filieres(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'modules' table
INSERT INTO modules (name, department_id, filiere_id) VALUES 
('Software Development', 1, 1),
('Machine Learning', 1, 2),
('Algebra', 2, 3),
('Quantum Mechanics', 3, 4),
('Financial Management', 4, 5);

-- Create the 'elements' table
CREATE TABLE IF NOT EXISTS elements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    module_id INT,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'elements' table
INSERT INTO elements (name, module_id) VALUES 
('Introduction to Programming', 1),
('Deep Learning', 2),
('Linear Algebra', 3),
('Quantum Computing', 4),
('Investment Analysis', 5);

-- Create the 'teachers' table
CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department_id INT,
    element_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (element_id) REFERENCES elements(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Insert fake data into the 'teachers' table
INSERT INTO teachers (first_name, last_name, email, department_id, element_id) VALUES 
('Olivia', 'Taylor', 'olivia.taylor@example.com', 1, NULL),
('Peter', 'Anderson', 'peter.anderson@example.com', 2, NULL),
('Quinn', 'Clark', 'quinn.clark@example.com', 3, NULL),
('Rachel', 'Evans', 'rachel.evans@example.com', 4, NULL),
('Sam', 'Fisher', 'sam.fisher@example.com', 5, NULL),
('Tina', 'Garcia', 'tina.garcia@example.com', 1, NULL),
('Ulysses', 'Hernandez', 'uly.hernandez@example.com', 2, NULL);

-- Create the 'absences' table
CREATE TABLE IF NOT EXISTS absences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    date DATE NOT NULL,
    justified BOOLEAN DEFAULT 0, -- Indicates if the absence is justified (0 for No, 1 for Yes)
    justification TEXT,          -- Detailed explanation for justification
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'absences' table
INSERT INTO absences (student_id, date, justified, justification) VALUES 
(1, '2021-10-01', 0, 'Student was sick'),
(2, '2021-10-02', 1, 'Student had a family emergency'),
(3, '2021-10-03', 0, 'Student overslept'),
(4, '2021-10-04', 1, 'Student had a doctor''s appointment'),
(5, '2021-10-05', 0, 'Student missed the bus'),
(6, '2021-10-06', 1, 'Student had a job interview'),
(7, '2021-10-07', 0, 'Student forgot about the class'),
(8, '2021-10-08', 1, 'Student had a court appearance'),
(9, '2021-10-09', 0, 'Student was out of town'),
(10, '2021-10-10', 1, 'Student had a family gathering');

-- Create the 'TP_Groups' table
CREATE TABLE IF NOT EXISTS TP_Groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    module_id INT,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'TP_Groups' table
INSERT INTO TP_Groups (name, module_id) VALUES 
('Group 1', 1),
('Group 2', 1),
('Group 3', 2),
('Group 4', 2),
('Group 5', 3),
('Group 6', 3),
('Group 7', 4),
('Group 8', 4),
('Group 9', 5),
('Group 10', 5);

-- Create the 'TD_Groups' table
CREATE TABLE IF NOT EXISTS TD_Groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    module_id INT,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert fake data into the 'TD_Groups' table
INSERT INTO TD_Groups (name, module_id) VALUES 
('Group 1', 1),
('Group 2', 1),
('Group 3', 2),
('Group 4', 2),
('Group 5', 3),
('Group 6', 3),
('Group 7', 4),
('Group 8', 4),
('Group 9', 5),
('Group 10', 5);