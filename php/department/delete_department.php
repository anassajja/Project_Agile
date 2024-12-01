<?php
include 'config.php';
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['id'])) {
    $stmt = $pdo->prepare('DELETE FROM departments WHERE id = :id');
    if ($stmt->execute([':id' => $data['id']])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to delete department.']);
    }
} else {
    echo json_encode(['error' => 'Invalid input.']);
}
?>
