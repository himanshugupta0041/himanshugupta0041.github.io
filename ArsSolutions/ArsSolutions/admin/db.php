<?php
$conn = new mysqli("localhost", "root", "9211", "ars_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
