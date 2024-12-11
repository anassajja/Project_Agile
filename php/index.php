<?php
session_start();  // Ensure the session is started 

// Check if session variables are set before accessing them
$email = isset($_SESSION['email']) ? htmlspecialchars($_SESSION['email']) : 'Guest'; // Set the email to 'Guest' if not set
$role = isset($_SESSION['role']) ? htmlspecialchars($_SESSION['role']) : 'Not defined'; // Set the role to 'Not defined' if not set
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Absence Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            padding-top: 50px;
        }
        .welcome-section {
            background-color: #28a745;
            color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .welcome-section h1 {
            margin-bottom: 15px;
        }
        .welcome-section p {
            font-size: 18px;
        }
        .menu-section {
            margin-top: 40px;
        }
        .menu-card {
            margin: 15px;
            background-color: #ffffff;
            padding: 25px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
        }
        .menu-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        .menu-card .icon {
            font-size: 40px;
            color: #007bff;
            margin-bottom: 15px;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Welcome Section -->
    <div class="welcome-section text-center">
        <h1>Welcome, <?php echo $email; ?></h1>
        <p>Role: <?php echo $role; ?></p> <!-- Display the user role -->
    </div>

    <!-- Menu Section -->
    <div class="menu-section row justify-content-center">
        <!-- Filiere -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/filiere.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <h5>Filière</h5>
                <p>Select a Filière</p>
            </div>
        </div>

        <!-- Absence -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/absence.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-user-times"></i>
                </div>
                <h5>Absence</h5>
                <p>Manage Student Absences</p>
            </div>
        </div>

        <!-- Module -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/module.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h5>Module</h5>
                <p>View or Create Modules</p>
            </div>
        </div>

        <!-- Element -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/element.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-book"></i>
                </div>
                <h5>Element</h5>
                <p>Manage Elements</p>
            </div>
        </div>

        <!-- Department -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/department.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-building"></i>
                </div>
                <h5>Department</h5>
                <p>Manage Departments</p>
            </div>
        </div>

        <!-- Teacher -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/teacher.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h5>Teacher</h5>
                <p>Manage Teachers</p>
            </div>
        </div>

        <!-- Student -->
        <div class="col-md-3">
            <div class="menu-card" onclick="window.location.href='../html/student.html';" style="cursor: pointer;">
                <div class="icon">
                    <i class="fas fa-user-graduate"></i>
                </div>
                    <h5>Student</h5>
                    <p>Manage Students</p>
            </div>
        </div>

    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; 2024 Absence Management System. All rights reserved.</p>
    </div>
</div>

<!-- Bootstrap JS (Optional for some features like dropdown, modals, etc.) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
