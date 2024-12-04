<?php
// saveFiliere.php
include '../config.php'; // Include the database connection

// Get the data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Check if required fields are provided
if (!empty($data['name']) && !empty($data['department_id'])) {
    try {
        // Insert or update the filiere
        if (empty($data['id'])) {
            // Insert a new filiere
            $stmt = $pdo->prepare('INSERT INTO filieres (name, department_id) VALUES (:name, :department_id)');
        } else {
            // Update an existing filiere
            $stmt = $pdo->prepare('UPDATE filieres SET name = :name, department_id = :department_id WHERE id = :id');
            $stmt->bindParam(':id', $data['id']);
        }

        // Bind parameters and execute the query
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':department_id', $data['department_id']);
        $stmt->execute();

        // Return success response
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Handle database errors
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }   
} else {
    // Return an error if required fields are missing
    echo json_encode(['error' => 'Invalid input.']);
}
?>
