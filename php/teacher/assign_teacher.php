<?php
require '../config.php'; // Include the database configuration file

$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

// Check if the required fields are present
if (!empty($data['teacher_id']) && !empty($data['element_id'])) {
    // Prepare the query to update the element_id for the existing teacher_id
    $stmt = $pdo->prepare('UPDATE teachers SET element_id = :element_id WHERE id = :id');
    
    // Execute the query with both teacher_id and element_id
    if ($stmt->execute([
        ':id' => $data['teacher_id'], // Bind the teacher_id to the id parameter
        ':element_id' => $data['element_id'] // Bind the element_id to the :element_id parameter
    ])) {
        echo json_encode(['success' => true]); // Return a success message if the teacher is assigned to the element successfully
    } else {
        echo json_encode(['error' => 'Failed to assign teacher to element.']); // Return an error message
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>