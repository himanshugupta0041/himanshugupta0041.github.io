<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$name = $data["name"];
$brand = $data["brand"];
$category = $data["category"];
$price = $data["price"];
$description = $data["description"];
$image = $data["image"];

$sql = "INSERT INTO products 
(id, name, brand, category, price, description, image, availability)
VALUES 
('$id','$name','$brand','$category','$price','$description','$image','In Stock')";

if ($conn->query($sql)) {
    echo "Product Added";
} else {
    echo "Error: " . $conn->error;
}
?>


