<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end (teacher ID)

if (!empty($data['id'])) { // Check if the ID is not empty
    $stmt = $pdo->prepare('DELETE FROM teachers WHERE id = :id'); // Prepare the query to delete the teacher from the database with the given ID
    if ($stmt->execute([':id' => $data['id']])) { // Execute the query with the given ID
        echo json_encode(['success' => true]); // Return a success message if the teacher is deleted successfully 
    } else { // If the query fails
        echo json_encode(['error' => 'Failed to delete teacher.']); // Return an error message
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>
