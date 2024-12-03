<?php
// Include the database configuration file
include 'config.php'; // Ensure this file sets up the $pdo variable

// Start a session
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve username and password from the form data using the $_POST superglobal array and store them in variables for easier access and security
    $email = $_POST['email'];
    $password = $_POST['password'];

/*  echo "Email: " . htmlspecialchars($_POST['email']) . "<br>";
    echo "Password: " . htmlspecialchars($_POST['password']) . "<br>"; */

    try {
        // Prepare SQL query to find the user
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');  // SQL query to select the user with the provided email
        $stmt->bindParam(':email', $email); // Bind the email parameter to the query with the provided email value 
        $stmt->execute(); // Execute the query
        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the user as an associative array

        // Check if the user exists and verify the password
        if ($user && $password === $user['password']) {
            // Store user data in the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role']; // Ensure role is also set in the session

            // Redirect to index.html after successful login
            header("Location: index.php");  // Redirect to index.html page
            exit();  // Stop further script execution after redirect

/*             // Redirect to a success page or show a success message here (e.g., using JavaScript)
            echo 'Login successful! Welcome, ' . htmlspecialchars($user['email']) . '.'; // Display a success message with the user's email */
        } else {
            // Display error message if login fails
            $error_message = "Invalid email or password.";
        }        
    } catch (PDOException $e) { // Catch any exceptions that occur during database interaction
        $error_message = 'Database error: ' . $e->getMessage(); // Display the error message
    } 
} else {
    $error_message = "Invalid request method.";
}
?>

<!-- HTML output for displaying error message -->
<?php if (isset($error_message)): ?>
    <div class="message error"><?php echo htmlspecialchars($error_message); ?></div>
<?php endif; ?>

<!-- Add this CSS to style the messages -->
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .message {
        padding: 20px;
        margin: 10px;
        border-radius: 5px;
        width: 80%;
        max-width: 500px;
        text-align: center;
        font-size: 18px;
        box-sizing: border-box;
    }

    .success {
        background-color: #28a745;
        color: white;
        border: 1px solid #218838;
    }

    .error {
        background-color: #dc3545;
        color: white;
        border: 1px solid #c82333;
    }

    /* Additional styles for the form and page layout */
    form {
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    input[type="email"], input[type="password"] {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #0056b3;
    }
</style>
