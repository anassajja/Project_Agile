<?php
include '../config.php';

header('Content-Type: application/json');

try {
    $query = '
        SELECT elements.id, elements.name, modules.name AS module_name, modules.id AS module_id
        FROM elements
        LEFT JOIN modules ON elements.module_id = modules.id
    ';
    $stmt = $pdo->query($query);
    $elements = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($elements);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
