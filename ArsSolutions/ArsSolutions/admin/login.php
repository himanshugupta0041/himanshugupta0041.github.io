<?php
session_start();

// 🔒 Hardcoded credentials (you can later move to DB)
$valid_username = "admin";
$valid_password = "1234";

$username = $_POST["username"];
$password = $_POST["password"];

if ($username === $valid_username && $password === $valid_password) {

    // Create session
    $_SESSION["admin_logged_in"] = true;
    $_SESSION["admin_user"] = $username;

    // Redirect to admin panel
    header("Location: admin.php");
    exit();

} else {
    echo "<script>
        alert('Invalid Username or Password!');
        window.location.href = 'login.html';
    </script>";
}
?>