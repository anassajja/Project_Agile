<?php
include '../config.php';

header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $query = "
        SELECT modules.id, modules.name, filieres.name AS filiere_name 
        FROM modules
        LEFT JOIN filieres ON modules.filiere_id = filieres.id
    ";
    $stmt = $pdo->query($query);
    $modules = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($modules);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
