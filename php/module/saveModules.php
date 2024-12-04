<?php
include '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

// Log the data for debugging
file_put_contents('log.txt', print_r($data, true), FILE_APPEND);

if (!empty($data['name']) && !empty($data['filiere_id']) && !empty($data['department_id'])) {
    try {
        $query = "INSERT INTO modules (name, filiere_id, department_id) VALUES (:name, :filiere_id, :department_id)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':filiere_id', $data['filiere_id'], PDO::PARAM_INT);
        $stmt->bindParam(':department_id', $data['department_id'], PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid input.', 'data' => $data]);
}
?>
