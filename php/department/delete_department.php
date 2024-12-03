<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

if (!empty($data['id'])) { // Check if the ID is not empty
    $stmt = $pdo->prepare('DELETE FROM departments WHERE id = :id'); // Prepare the query to delete the department from the database with the given ID
    if ($stmt->execute([':id' => $data['id']])) { // Execute the query with the given ID
        echo json_encode(['success' => true]); // Return a success message
    } else {
        echo json_encode(['error' => 'Failed to delete department.']); // Return an error message
    }
} else { // If the ID is empty
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>
