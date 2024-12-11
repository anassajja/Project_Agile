<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

ini_set('display_errors', 1); // Set the display_errors to 1 to display any errors that occur
ini_set('display_startup_errors', 1); // Set the display_startup_errors to 1 to display any startup errors that occur
error_reporting(E_ALL); // Set the error_reporting to display all types of errors

// Check if the required fields are present
if (!empty($data['id']) && !empty($data['student_id']) && !empty($data['date']) && isset($data['justified']) && !empty($data['justification'])) { // Check if the ID, student ID, date, justified, and justification are not empty
    $stmt = $pdo->prepare('UPDATE absences SET student_id = :student_id, date = :date, justified = :justified, justification = :justification WHERE id = :id'); // Prepare the query to update the absence in the database
    // Execute the query with the provided data
    if ($stmt->execute([ // Execute the query with the provided data
        'id' => $data['id'], // Get the ID from the data
        'student_id' => $data['student_id'], // Get the student ID from the data
        'date' => $data['date'], // Get the date from the data
        'justified' => $data['justified'], // Get the justified from the data
        'justification' => $data['justification'] // Get the justification from the data
    ])) {
        echo json_encode(['success' => true]); // Return a success message if the absence is updated successfully
    } else {
        echo json_encode(['error' => 'Failed to update absence.']); // Return an error message if the absence is not updated successfully
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message if the input is invalid
}
?>