<?php
include '../config.php';

header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
if (!empty($data['id']) && !empty($data['name']) && !empty($data['department_id'])) {
    try {
        $query = "UPDATE filieres SET name = :name, department_id = :department_id WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':department_id', $data['department_id'], PDO::PARAM_INT);
        $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}
?>
