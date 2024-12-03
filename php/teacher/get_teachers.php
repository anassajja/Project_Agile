<?php
// get_teachers.php
include '../config.php'; // Include the database connection

// Set the response type to JSON
header('Content-Type: application/json');

try {
    // Fetch teachers from the database
    $stmt = $pdo->query('SELECT * FROM teachers'); // SQL query to select all teachers

    // Check if the query was successful
    if ($stmt) {
        // Fetch all rows from the query result as associative arrays
        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return teachers as JSON data to the front end
        echo json_encode($teachers);
    } else {
        // If the query failed, return an error message
        echo json_encode(['error' => 'Failed to fetch teachers.']); 
    }
} catch (PDOException $e) {
    // Handle any exceptions that occur during database interaction
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
