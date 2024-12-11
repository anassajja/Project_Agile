<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

ini_set('display_errors', 1); // Set the display_errors to 1 to display any errors that occur
ini_set('display_startup_errors', 1); // Set the display_startup_errors to 1 to display any startup errors that occur
error_reporting(E_ALL); // Set the error_reporting to display all types of errors

// Check if the required fields are present
if (!empty($data['student_id']) && !empty($data['date']) && isset($data['justified']) && !empty($data['justification'])) { // Check if the absence ID, date, justified, and justification are not empty
    $stmt = $pdo->prepare('INSERT INTO absences (student_id, date, justified, justification) VALUES (:student_id, :date, :justified, :justification)'); // Prepare the query to insert the absence into the database
    // Execute the query with both name and description
    if ($stmt->execute([ // Execute the query with the name and description
        'student_id' => $data['student_id'], // Get the student ID from the data
        'date' => $data['date'], // Get the date from the data
        'justified' => $data['justified'], // Get the justified from the data
        'justification' => $data['justification'] // Get the justification from the data
    ])) {
        echo json_encode(['success' => true]); // Return a success message if the absence is added successfully
    } else {
        echo json_encode(['error' => 'Failed to add department.']); // Return an error message if the absence is not added successfully
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>
