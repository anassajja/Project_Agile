<?php
include 'config.php';
$data = json_decode(file_get_contents('php://input'), true);

// Check if the required fields are present
if (!empty($data['name'])) {
    $stmt = $pdo->prepare('INSERT INTO departments (name, description) VALUES (:name, :description)');
    // Execute the query with both name and description
    if ($stmt->execute([
        ':name' => $data['name'],
        ':description' => $data['description'] // Add the description here
    ])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to add department.']);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}
?>
