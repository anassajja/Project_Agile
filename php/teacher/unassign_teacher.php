<?php
require '../config.php'; // Include the database configuration file to connect to the database

$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

if (!empty($data['teacher_id'])) { // Check if the required field is present
    $stmt = $pdo->prepare('UPDATE teachers SET element_id = NULL WHERE id = :teacher_id'); // Prepare the query to update the teacher's element assignment to NULL
    if ($stmt->execute([ // Execute the query with the teacher_id
        ':teacher_id' => $data['teacher_id'] // Bind the teacher_id
    ])) { // Check if the query was successful
        echo json_encode(['success' => true]); // Return a success message if the unassignment is successful
    } else {
        echo json_encode(['error' => 'Failed to unassign teacher.']); // Return an error message if the unassignment fails
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message if the input is invalid
}
?>