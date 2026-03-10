let products = [];

// Load products
fetch("../data/products.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProductList();
    });

function $(id) { return document.getElementById(id); }

// Render all products with Edit/Delete buttons
function renderProductList() {
    const box = $("productList");
    box.innerHTML = "";

    products.forEach(p => {
        box.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
                <h3 class="font-semibold text-accent">${p.name}</h3>
                <p class="text-sm text-gray-500">${p.category}</p>
            </div>

            <div class="flex gap-3">
                <button onclick="editProduct('${p.id}')" class="px-3 py-1 bg-yellow-400 rounded text-white">Edit</button>
                <button onclick="deleteProduct('${p.id}')" class="px-3 py-1 bg-red-500 rounded text-white">Delete</button>
            </div>
        </div>`;
    });
}

// Edit product
function editProduct(id) {
    const p = products.find(x => x.id === id);
    $("product-id").value = p.id;
    $("product-name").value = p.name;
    $("product-brand").value = p.brand;
    $("product-category").value = p.category;
    $("product-price").value = p.price;
    $("product-short").value = p.short;
}

// Delete product
function deleteProduct(id) {
    if (!confirm("Delete product?")) return;

    products = products.filter(p => p.id !== id);
    saveChanges();
}

// Handle form submit
$("productForm").onsubmit = (e) => {
    e.preventDefault();

    const id = $("product-id").value || Date.now().toString();

    const newProduct = {
        id,
        name: $("product-name").value,
        brand: $("product-brand").value,
        category: $("product-category").value,
        price: $("product-price").value,
        short: $("product-short").value,
        images: [] // image upload logic below
    };

    // Upload files → generate URLs
    const files = $("product-images").files;
    for (let f of files) {
        const url = "../images/uploaded/" + f.name;
        newProduct.images.push(url);

        // Save image to server (requires backend)
    }

    // Add or update
    const existing = products.findIndex(p => p.id === id);
    if (existing >= 0) products[existing] = newProduct;
    else products.push(newProduct);

    saveChanges();
};

// Save updated JSON via backend
function saveChanges() {
    fetch("update-json.php", {
        method: "POST",
        body: JSON.stringify(products)
    })
        .then(() => {
            alert("Saved!");
            location.reload();
        });
}