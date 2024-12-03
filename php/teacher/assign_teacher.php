<?php
require '../config.php'; // Include the database configuration file

$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

// Check if the required fields are present
if (!empty($data['teacher_id']) && !empty($data['department_id'])) { // Check if the required fields are present
    $stmt = $pdo->prepare('INSERT INTO teacher_department (teacher_id, department_id) VALUES (:teacher_id, :department_id)'); // Prepare the query to insert the teacher and department IDs into the teacher_department table
    // Execute the query with both teacher_id and department_id
    if ($stmt->execute([ // Execute the query with the teacher_id and department_id
        ':teacher_id' => $data['teacher_id'], // Bind the teacher_id to the :teacher_id parameter
        ':department_id' => $data['department_id'] // Bind the department_id to the :department_id parameter
    ])) {
        echo json_encode(['success' => true, 'message' => 'Enseignant assigne avec succes']); // Return a success message if the teacher is assigned to the department successfully
    } else {
        echo json_encode(['error' => 'Failed to assign teacher to department.']); // Return an error message
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}