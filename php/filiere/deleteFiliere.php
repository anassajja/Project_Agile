<?php
// deleteFiliere.php
include '../config.php'; // Include the database connection

// Set the response type to JSON
header('Content-Type: application/json');

// Get the filiere ID from the request
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    try {
        // Prepare the delete statement
        $stmt = $pdo->prepare('DELETE FROM filieres WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'No filiere found with the given ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid filiere ID.']);
}
?>
