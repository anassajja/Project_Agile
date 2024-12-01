<?php
// config.php

$host = 'localhost';
$dbname = 'school'; // The database you're using
$username = 'root'; // Default username for XAMPP
$password = ''; // Default password for XAMPP (empty)

try {
    // Create a new PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Catch any connection errors and output
    echo 'Connection failed: ' . $e->getMessage();
}
?>
