<?php
// absences.php
include '../config.php'; // Include the database connection

// Set the response type to JSON
header('Content-Type: application/json');

try {
    // Fetch absences from the database
    $stmt = $pdo->query('SELECT * FROM absences'); // SQL query to select all absences

    // Check if the query was successful
    if ($stmt) {
        // Fetch all rows from the query result as associative arrays
        $absences = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return absences as JSON
        echo json_encode($absences);
    } else {
        // If the query failed, return an error message
        echo json_encode(['error' => 'Failed to fetch absences.']); 
    }
} catch (PDOException $e) {
    // Handle any exceptions that occur during database interaction
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
