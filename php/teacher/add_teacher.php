<?php
include '../config.php'; // Include the database configuration file
$data = json_decode(file_get_contents('php://input'), true); // Get the data from the front end (first name, last name, email, department ID)

// Check if the required fields are present
if (!empty($data['first_name']) || !empty($data['last_name'])) { // Check if the first name and last name are not empty
    $stmt = $pdo->prepare('INSERT INTO teachers (first_name, last_name, email, department_id) VALUES (:first_name, :last_name, :email, :department_id)'); // Prepare the query to insert the department
    // Execute the query with both name and description
    if ($stmt->execute([ // Execute the query with the name and description
        ':first_name' => $data['first_name'], // Add the first name here
        ':last_name' => $data['last_name'], // Add the last name here
        ':email' => $data['email'], // Add the email here
        ':department_id' => $data['department_id'] // Add the department ID here
    ])) {
        echo json_encode(['success' => true]); // Return a success message if the student is added successfully
    } else {
        echo json_encode(['error' => 'Failed to add teacher.']); // Return an error message if the student is not added successfully
    }
} else {
    echo json_encode(['error' => 'Invalid input.']); // Return an error message
}
?>
