<?php
include '../config.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    try {
        $stmt = $pdo->prepare('DELETE FROM modules WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'No module found with the given ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid module ID.']);
}
?>
