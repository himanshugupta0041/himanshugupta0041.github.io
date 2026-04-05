<?php
include "db.php";

$name = $_POST['name'];
$brand = $_POST['brand'];
$category = $_POST['category'];
$price = $_POST['price'];
$description = $_POST['description'];

// For now static image
$image = "images/default.png";

$sql = "INSERT INTO products (name, brand, category, price, description, image)
        VALUES ('$name', '$brand', '$category', '$price', '$description', '$image')";

if ($conn->query($sql)) {
    echo "Product Added";
} else {
    echo "Error: " . $conn->error;
}
?>