<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end

// Check if the required fields are present
if (!empty($data['name'])) { // Check if the name is not empty
    $stmt = $pdo->prepare('INSERT INTO departments (name, description) VALUES (:name, :description)'); // Prepare the query to insert the department into the database with the name and description fields
    // Execute the query with both name and description
    if ($stmt->execute([ // Execute the query with the name and description
        ':name' => $data['name'], // Add the name here 
        ':description' => $data['description'] // Add the description here
    ])) {
        echo json_encode(['success' => true]); // Return a success message if the department is added successfully
    } else {
        echo json_encode(['error' => 'Failed to add department.']); // Return an error message
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>
