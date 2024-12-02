<?php
require '../../vendor/autoload.php'; // Include the Composer autoload file to load the PhpSpreadsheet library
require '../config.php'; // Include the database configuration file to connect to the database

use PhpOffice\PhpSpreadsheet\IOFactory; // Include the IOFactory class from the PhpSpreadsheet library

$inputFileName = 'students1.xlsx'; // The file name of the Excel file to be loaded
$spreadsheet = IOFactory::load($inputFileName); // Load the Excel file
$sheet = $spreadsheet->getActiveSheet(); // Get the active sheet from the Excel file
$data = $sheet->toArray(); // Convert the sheet data to an array

$stmt = $pdo->prepare('INSERT INTO students (first_name, last_name, email, department_id) VALUES (:first_name, :last_name, :email, :department_id)'); // Prepare the SQL query to insert the data into the students table in the database

// Skip the header row if it exists
$header = true;

foreach ($data as $row) { // Loop through each row of data in the Excel file
    if ($header) { // Skip the header row if it exists
        $header = false; // Set the header flag to false and continue to the next row
        continue; // Skip the current iteration of the loop
    }

    // Trim and validate data
    $firstName = trim($row[0]); // Get the first name from the current row and trim any leading or trailing whitespace
    $lastName = trim($row[1]); // Get the last name from the current row and trim any leading or trailing whitespace
    $email = trim($row[2]); // Get the email from the current row and trim any leading or trailing whitespace
    $departmentId = trim($row[3]); // Get the department ID from the current row and trim any leading or trailing whitespace

    // Skip empty rows
    if (empty($firstName) && empty($lastName) && empty($email) && empty($departmentId)) {
        continue; // Skip the current iteration of the loop
    }

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($email) || empty($departmentId)) { // Check if any of the required fields are empty
        echo 'Skipping row due to missing data: ' . json_encode($row) . "\n";   // Output the row data that is missing required fields
        continue; // Skip the current iteration of the loop
    }

    try {
        $stmt->execute([ // Execute the query with the provided data
            'first_name' => $firstName, // Bind the first name to the :first_name parameter
            'last_name' => $lastName, // Bind the last name to the :last_name parameter
            'email' => $email, // Bind the email to the :email parameter
            'department_id' => $departmentId // Bind the department ID to the :department_id parameter
        ]);
    } catch (PDOException $e) { // Catch any exceptions that occur during the query execution
        echo 'Error inserting row: ' . $e->getMessage() . "\n"; // Output an error message
    }
}

echo 'Students added successfully!';
?>