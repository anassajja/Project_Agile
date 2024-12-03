<?php
// departments.php
include '../config.php'; // Include the database connection

// Set the response type to JSON
header('Content-Type: application/json');

try {
    // Fetch departments from the database
    $stmt = $pdo->query('SELECT * FROM departments'); // SQL query to select all departments

    // Check if the query was successful
    if ($stmt) {
        // Fetch all rows from the query result as associative arrays
        $departments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return departments as JSON
        echo json_encode($departments);
    } else {
        // If the query failed, return an error message
        echo json_encode(['error' => 'Failed to fetch departments.']); 
    }
} catch (PDOException $e) {
    // Handle any exceptions that occur during database interaction
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
