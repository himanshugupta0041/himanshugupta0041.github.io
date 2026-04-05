<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = file_get_contents("php://input");
    file_put_contents("../data/products.json", $data);

    echo json_encode(["status" => "success"]);
}
?>