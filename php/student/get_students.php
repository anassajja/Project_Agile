<?php
// get_students.php
include '../config.php'; // Include the database connection

// Set the response type to JSON
header('Content-Type: application/json');

try {
    // Fetch students from the database
    $stmt = $pdo->query('SELECT * FROM students'); // SQL query to select all students

    // Check if the query was successful
    if ($stmt) {
        // Fetch all rows from the query result as associative arrays
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return students as JSON data to the front end
        echo json_encode($students);
    } else {
        // If the query failed, return an error message
        echo json_encode(['error' => 'Failed to fetch students.']); 
    }
} catch (PDOException $e) {
    // Handle any exceptions that occur during database interaction
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
