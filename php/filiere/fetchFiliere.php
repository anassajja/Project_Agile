<?php
include '../config.php'; // Include the database connection

header('Content-Type: application/json');

try {
    // Fetch filieres along with their department names and IDs
    $stmt = $pdo->query('
        SELECT filieres.id, filieres.name, filieres.department_id, departments.name AS department_name
        FROM filieres
        LEFT JOIN departments ON filieres.department_id = departments.id
    ');

    // Fetch all rows as associative arrays
    $filieres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the filieres as JSON
    echo json_encode($filieres);
} catch (PDOException $e) {
    // Handle database errors
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
