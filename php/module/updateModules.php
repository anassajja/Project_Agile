<?php
include '../config.php';

header('Content-Type: application/json');

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!empty($data['id']) && !empty($data['name']) && !empty($data['filiere_id']) && !empty($data['department_id'])) {
    try {
        $query = "UPDATE modules SET name = :name, filiere_id = :filiere_id, department_id = :department_id WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':filiere_id', $data['filiere_id'], PDO::PARAM_INT);
        $stmt->bindParam(':department_id', $data['department_id'], PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}
?>
