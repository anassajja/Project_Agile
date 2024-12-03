<?php
include '../config.php';

$data = json_decode(file_get_contents('php://input'), true); // Decode the JSON data sent from the client

// Check if the required fields are present
if (!empty($data['id'] && !empty ($data['first_name']) && !empty($data['last_name']) && !empty($data['email']) && !empty($data['department_id']))) {
    $stmt = $pdo->prepare('UPDATE teachers SET first_name = :first_name, last_name = :last_name, email = :email, department_id = :department_id WHERE id = :id');
    // Execute the query with both first_name, last_name, email, and department_id
    if ($stmt->execute([ // Execute the query with the first_name, last_name, email, department_id, and id
        ':first_name' => $data['first_name'],
        ':last_name' => $data['last_name'],
        ':email' => $data['email'],
        ':department_id' => $data['department_id'],
        ':id' => $data['id'] // Add the id here
    ])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update student.']);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}