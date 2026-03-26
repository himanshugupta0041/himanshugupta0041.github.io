
let compareItems = JSON.parse(localStorage.getItem("compareList") || "[]");
let PRODUCT_DATA = [];


const drawer = document.getElementById("compareDrawer");
const listBox = document.getElementById("compareList");
const openComparePage = document.getElementById("openComparePage");

// ===============================
// LOAD PRODUCT DATA
// ===============================
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
      PRODUCT_DATA = data;
      updateDrawer();
  });


// ===============================
// UPDATE COMPARE DRAWER UI
// ===============================
function updateDrawer() {

    if (!drawer || !listBox) return;

    if (compareItems.length === 0) {
        drawer.classList.add("hidden");
        return;
    }

    drawer.classList.remove("hidden");
    listBox.innerHTML = "";

    compareItems.forEach(id => {
        const item = PRODUCT_DATA.find(p => p.id === id);
        if (!item) return;

        listBox.innerHTML += `
            <div class="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div>
                    <p class="text-sm font-semibold">${item.name}</p>
                    <p class="text-xs text-gray-500">${item.price}</p>
                </div>
                <button class="remove-compare text-red-500 text-sm" data-id="${item.id}">
                    Remove
                </button>
            </div>
        `;
    });

    document.querySelectorAll(".remove-compare").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;

            compareItems = compareItems.filter(x => x !== id);
            localStorage.setItem("compareList", JSON.stringify(compareItems));
            updateDrawer();
        };
    });
}


// ===============================
// ADD TO COMPARE BUTTON LOGIC
// ===============================
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".compare-btn");
    if (!btn) return;

    const id = btn.dataset.id;

    if (compareItems.includes(id)) {
        btn.innerText = "✓ Added";
        btn.classList.add("compare-btn-added");
        return;
    }

    if (compareItems.length >= 3) {
        alert("You can only compare up to 3 products!");
        return;
    }

    compareItems.push(id);
    localStorage.setItem("compareList", JSON.stringify(compareItems));
    updateDrawer();

    btn.innerText = "✓ Added";
    btn.classList.add("compare-btn-added");
});


// ===============================
// OPEN COMPARE PAGE
// ===============================
if (openComparePage) {
    openComparePage.onclick = () => window.location.href = "compare.html";
}


// ===============================
// BUILD THE COMPARE PAGE TABLE
// ===============================
if (window.location.pathname.includes("compare.html")) {

    let COMPARE_IDS = JSON.parse(localStorage.getItem("compareList") || "[]");

    fetch("data/products.json")
        .then(res => res.json())
        .then(products => {

            const items = products.filter(
                p => COMPARE_IDS.includes(p.id)
            );

            buildTable(items);
        });
}

function buildTable(items) {

    const tableBox = document.getElementById("compareTable");

    if (!tableBox) return;

    if (items.length === 0) {
        tableBox.innerHTML =
            `<p class='text-gray-600'>No products selected for comparison.</p>`;
        return;
    }

    let html = `
        <table class="w-full text-left">
            <tr>
                <th class="p-3">Feature</th>
                ${items.map(p => `<th class='p-3 text-accent'>${p.name}</th>`).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Price</td>
                ${items.map(p => `<td class="p-3">${p.price}</td>`).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Category</td>
                ${items.map(p => `<td class="p-3">${p.category}</td>`).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Brand</td>
                ${items.map(p => `<td class="p-3">${p.brand}</td>`).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Short Description</td>
                ${items.map(p => `<td class="p-3">${p.short}</td>`).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Specs</td>
                ${items.map(p => `
                    <td class="p-3">
                        ${p.specs.map(s => `<div>${s[0]}: <b>${s[1]}</b></div>`).join("")}
                    </td>
                `).join("")}
            </tr>

            <tr>
                <td class="p-3 font-medium">Features</td>
                ${items.map(p => `
                    <td class="p-3">
                        ${p.features.map(f => `<div>• ${f}</div>`).join("")}
                    </td>
                `).join("")}
            </tr>
        </table>
    `;

    tableBox.innerHTML = html;
}
