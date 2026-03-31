// let allProducts = [];
// let itProducts = [];

// const grid = document.getElementById("it-grid");

// fetch("data/products.json")
//   .then(res => res.json())
//   .then(data => {
//     allProducts = data;

//     // Only IT products
//     itProducts = data.filter(p => p.category === "it-products");

//     renderBrands();
//     renderTypes();
//     renderProducts(itProducts);
//   });

// function renderProducts(list) {
//   grid.innerHTML = "";

//   if (list.length === 0) {
//     grid.innerHTML = `<p class="text-gray-500 text-lg">No matching products.</p>`;
//     return;
//   }

//   list.forEach(p => {
//     grid.innerHTML += `
//       <div class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition">
//         <img src="${p.images[0]}" class="h-48 w-full object-contain bg-white p-4">

//         <div class="p-4">
//         <a href="product.html?id=${p.id}">
//           <h3 class="font-semibold text-lg text-accent">${p.name}</h3>
//           <p class="text-primary font-bold">${p.price}</p>
//         </a>
  
//         </div>
//       </div>
//     `;
//   });
// }

// // BRAND FILTERS
// function renderBrands() {
//   const box = document.getElementById("filter-brand");
//   const brands = [...new Set(itProducts.map(p => p.brand))];

//   brands.forEach(brand => {
//     box.innerHTML += `
//       <label class="flex items-center gap-2">
//         <input type="checkbox" value="${brand}" class="filter-brand">
//         <span>${brand}</span>
//       </label>
//     `;
//   });
// }

// // TYPE FILTERS (mouse, keyboards, laptops, etc.)
// function renderTypes() {
//   const box = document.getElementById("filter-type");
//   const types = [...new Set(itProducts.map(p => p.short.split(" ")[0]))];

//   types.forEach(t => {
//     box.innerHTML += `
//       <label class="flex items-center gap-2">
//         <input type="checkbox" value="${t}" class="filter-type">
//         <span>${t}</span>
//       </label>
//     `;
//   });
// }

// // APPLY ALL FILTERS
// function applyFilters() {
//   let filtered = [...itProducts];

//   // BRAND
//   const brands = [...document.querySelectorAll(".filter-brand:checked")].map(b => b.value);
//   if (brands.length) {
//     filtered = filtered.filter(p => brands.includes(p.brand));
//   }

//   // AVAILABILITY
//   if (document.querySelector(".filter-availability:checked")) {
//     filtered = filtered.filter(p => p.availability === "In Stock");
//   }

//   // PRICE
//   const min = Number(document.getElementById("minPrice").value);
//   const max = Number(document.getElementById("maxPrice").value);
//   filtered = filtered.filter(p => {
//     const price = Number(p.price.replace(/[^0-9]/g, ""));
//     return (!min || price >= min) && (!max || price <= max);
//   });

//   // TYPE
//   const types = [...document.querySelectorAll(".filter-type:checked")].map(t => t.value);
//   if (types.length) {
//     filtered = filtered.filter(p =>
//       types.some(t => p.short.toLowerCase().includes(t.toLowerCase()))
//     );
//   }

//   renderProducts(filtered);
// }

// // EVENT LISTENERS
// document.addEventListener("change", applyFilters);

// document.getElementById("resetFilters").addEventListener("click", () => {
//   document.querySelectorAll("input[type='checkbox']").forEach(c => c.checked = false);
//   document.getElementById("minPrice").value = "";
//   document.getElementById("maxPrice").value = "";
//   renderProducts(itProducts);
// });


// const input = document.getElementById("search-input");
// const resultsBox = document.getElementById("search-results");

// input.addEventListener("input", () => {
//   const value = input.value.toLowerCase().trim();

//   if (value === "") {
//     resultsBox.classList.add("hidden");
//     resultsBox.innerHTML = "";
//     return;
//   }

//   // Filter products
//   const matches = allProducts.filter(p =>
//     p.name.toLowerCase().includes(value) ||
//     p.brand.toLowerCase().includes(value) ||
//     p.category.toLowerCase().includes(value) ||
//     p.short.toLowerCase().includes(value)
//   );

//   // Build dropdown
//   if (matches.length === 0) {
//     resultsBox.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
//     resultsBox.classList.remove("hidden");
//     return;
//   }

//   resultsBox.innerHTML = matches
//     .map(
//       p => `
//         <div 
//           class="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
//           onclick="window.location.href='product.html?id=${p.id}'"
//         >
//             <img src="${p.images[0]}" class="w-12 h-12 object-contain rounded">
//             <div>
//                 <p class="font-semibold text-gray-900">${p.name}</p>
//                 <p class="text-sm text-gray-600">${p.short}</p>
//             </div>
//         </div>
//       `
//     )
//     .join("");

//   resultsBox.classList.remove("hidden");
// });

// // Close dropdown on click outside
// document.addEventListener("click", (e) => {
//   if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
//     resultsBox.classList.add("hidden");
//   }
// });

// ======================================================
// IT PRODUCTS SYSTEM (Clean, Fast, Error-Free)
// ======================================================


const itGrid = document.getElementById("it-grid");
const brandBox = document.getElementById("filter-brand");
const typeBox = document.getElementById("filter-type");
const resetBtn = document.getElementById("resetFilters");


let IT_PRODUCTS = [];
let ALL_PRODUCTS = [];

fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
        ALL_PRODUCTS = data;

       
        IT_PRODUCTS = data.filter(p => p.category.toLowerCase() === "it-products");

        renderBrands();
        renderTypes();
        renderProducts(IT_PRODUCTS);
    })
    .catch(err => console.error("IT product load error:", err));


// ======================================================
// RENDER PRODUCTS GRID
// ======================================================
function renderProducts(list) {
    if (!itGrid) return;

    itGrid.innerHTML = "";

    if (list.length === 0) {
        itGrid.innerHTML = `
            <p class="text-gray-500 text-lg col-span-full text-center">
                No products match your filters.
            </p>
        `;
        return;
    }

    list.forEach(p => {
        itGrid.innerHTML += `
        <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            <!-- IMAGE -->
            <div class="relative bg-white">
                <img src="${p.images[0]}" class="h-48 w-full object-contain p-4">

                ${p.discount ? `
                    <span class="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        ${p.discount}
                    </span>
                ` : ""}
            </div>

            <!-- TEXT CONTENT -->
            <div class="p-4 space-y-2">

                <!-- NAME -->
                <a href="product.html?id=${p.id}">
                    <h3 class="font-semibold text-lg text-accent leading-snug">
                        ${p.name}
                    </h3>
                </a>

             
                <p class="text-gray-500 text-sm">
                    ${p.short}
                </p>

                <!-- PRICE -->
                <div class="flex items-center gap-2">
                    <span class="text-primary font-bold text-lg">${p.price}</span>
                    ${p.oldPrice ? `
                        <span class="text-gray-400 line-through text-sm">${p.oldPrice}</span>
                    ` : ""}
                </div>

                <!-- HIGHLIGHTS -->
                <div class="flex flex-wrap gap-2 mt-2">
                    ${p.highlights.map(h => `
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded border">${h}</span>
                    `).join("")}
                </div>

                <!-- ADD TO COMPARE -->
                <button 
                    class="compare-btn mt-3 w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                    data-id="${p.id}">
                    + Add to Compare
                </button>

            </div>
        </div>
        `;
    });
}



function renderBrands() {
    if (!brandBox) return;

    const brands = [...new Set(IT_PRODUCTS.map(p => p.brand))];

    brands.forEach(brand => {
        brandBox.innerHTML += `
            <label class="flex items-center gap-2">
                <input type="checkbox" value="${brand}" class="filter-brand">
                <span>${brand}</span>
            </label>
        `;
    });
}


// ======================================================
// TYPE FILTERS (Mouse, Keyboard, Monitor, etc.)
// ======================================================
function renderTypes() {
    if (!typeBox) return;

    const types = [
        ...new Set(
            IT_PRODUCTS.map(p => p.short.split(" ")[0].trim())
        )
    ];

    types.forEach(type => {
        typeBox.innerHTML += `
            <label class="flex items-center gap-2">
                <input type="checkbox" value="${type}" class="filter-type">
                <span>${type}</span>
            </label>
        `;
    });
}


// ======================================================
// APPLY FILTERS
// ======================================================
function applyFilters() {
    let filtered = [...IT_PRODUCTS];

    // BRAND
    const selectedBrands = [...document.querySelectorAll(".filter-brand:checked")]
        .map(b => b.value);

    if (selectedBrands.length) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // AVAILABILITY
    if (document.querySelector(".filter-availability:checked")) {
        filtered = filtered.filter(p => p.availability.toLowerCase() === "in stock");
    }

    // PRICE FILTER
    const min = Number(document.getElementById("minPrice")?.value) || 0;
    const max = Number(document.getElementById("maxPrice")?.value) || Infinity;

    filtered = filtered.filter(p => {
        const price = Number(p.price.replace(/[^0-9]/g, ""));
        return price >= min && price <= max;
    });

    // TYPE FILTER
    const selectedTypes = [...document.querySelectorAll(".filter-type:checked")]
        .map(t => t.value.toLowerCase());

    if (selectedTypes.length) {
        filtered = filtered.filter(p =>
            selectedTypes.some(t =>
                p.short.toLowerCase().includes(t)
            )
        );
    }

    renderProducts(filtered);
}


// ======================================================
// EVENT LISTENERS (SAFE)
// ======================================================
document.addEventListener("change", applyFilters);

resetBtn?.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(c => c.checked = false);
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    renderProducts(IT_PRODUCTS);
});


// ======================================================
// DESKTOP SEARCH (uses global system safely)
// ======================================================
const dsInput = document.getElementById("search-input");
const dsResults = document.getElementById("search-results");

if (typeof handleSearch === "function") {
    handleSearch(dsInput, dsResults);
}


// ======================================================
// MOBILE SEARCH (also uses global search.js safely)
// ======================================================
const msInput = document.getElementById("mobileSearchInput");
const msResults = document.getElementById("mobileSearchResults");

if (typeof handleSearch === "function") {
    handleSearch(msInput, msResults);
}


// ======================================================
// MOBILE MENU TOGGLE
// ======================================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}



// ======================================================
// MOBILE SEARCH POPUP TOGGLE
// ======================================================
const mobileSearchBtn = document.getElementById("mobileSearchBtn");
const mobileSearchPopup = document.getElementById("mobileSearchPopup");
const mobileSearchClose = document.getElementById("mobileSearchClose");

if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", () => {
        mobileSearchPopup.classList.remove("hidden");
    });
}

if (mobileSearchClose) {
    mobileSearchClose.addEventListener("click", () => {
        mobileSearchPopup.classList.add("hidden");
    });
}

// Close popup when clicking outside input
if (mobileSearchPopup) {
    mobileSearchPopup.addEventListener("click", (e) => {
        if (e.target === mobileSearchPopup) {
            mobileSearchPopup.classList.add("hidden");
        }
    });
}



// ======================================================
// MOBILE FILTER POPUP TOGGLE  (THE NEW FIXED PART)
// ======================================================
const openMobileFilters = document.getElementById("openMobileFilters");
const mobileFilterPopup = document.getElementById("mobileFilterPopup");
const closeMobileFilters = document.getElementById("closeMobileFilters");

if (openMobileFilters) {
    openMobileFilters.addEventListener("click", () => {
        mobileFilterPopup.classList.remove("hidden");
    });
}

if (closeMobileFilters) {
    closeMobileFilters.addEventListener("click", () => {
        mobileFilterPopup.classList.add("hidden");
    });
}

// close popup if user clicks outside the filter box
if (mobileFilterPopup) {
    mobileFilterPopup.addEventListener("click", (e) => {
        if (e.target === mobileFilterPopup) {
            mobileFilterPopup.classList.add("hidden");
        }
    });
}
