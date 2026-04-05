<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header("Location: login.html");
    exit();
}
?>


<a href="logout.php">Logout</a>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel – Manage Products</title>
    <link rel="stylesheet" href="../components/css/style.css">
</head>

<body class="bg-gray-100 p-6">

<h1 class="text-3xl font-bold mb-6 text-accent">Product Manager</h1>

<!-- Product List -->
<div id="productList" class="space-y-4 mb-10"></div>

<hr class="my-8">

<!-- Add/Edit Form -->
<h2 class="text-xl font-semibold mb-4">Add / Edit Product</h2>

<form id="productForm" class="grid gap-4 bg-white p-6 rounded-xl shadow-md">

    <input type="hidden" id="product-id">

    <input id="product-name" placeholder="Product Name" class="border p-2 rounded">
    <input id="product-brand" placeholder="Brand" class="border p-2 rounded">
    <input id="product-category" placeholder="Category (teleprompters/laptops/it-products)" class="border p-2 rounded">
    <input id="product-price" placeholder="Price ($999)" class="border p-2 rounded">
    <textarea id="product-short" placeholder="Short Description" class="border p-2 rounded"></textarea>

    <label class="block">
        Images:
        <input type="file" id="product-images" multiple class="mt-2">
    </label>

    <button type="submit" class="bg-primary text-white px-5 py-2 rounded">
        Save Product
    </button>
</form>

<script src="admin.js"></script>
</body>
</html>