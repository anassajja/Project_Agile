<?php
include '../config.php';
$data = json_decode(file_get_contents('php://input'), true);

// Check if the required fields are present
if (!empty($data['id']) && !empty($data['name'])) {
    $stmt = $pdo->prepare('UPDATE departments SET name = :name, description = :description WHERE id = :id');
    // Execute the query with both name and description
    if ($stmt->execute([
        ':name' => $data['name'],
        ':description' => $data['description'],  // Add the description here
        ':id' => $data['id'] // Add the id here     
    ])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update department.']);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}
?>
