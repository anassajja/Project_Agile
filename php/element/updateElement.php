<?php
include '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id']) && !empty($data['name']) && !empty($data['module_id'])) {
    try {
        $query = "UPDATE elements SET name = :name, module_id = :module_id WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':module_id', $data['module_id'], PDO::PARAM_INT);
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
