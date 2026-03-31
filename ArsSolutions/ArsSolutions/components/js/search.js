// // SEARCH SYSTEM
// // let allProducts = [];

// // Load product list once
// fetch("data/products.json")
//   .then(res => res.json())
//   .then(data => {
//     allProducts = data;
//   });

// const searchInput = document.getElementById("search-input");
// const resultsBox = document.getElementById("search-results");

// searchInput.addEventListener("input", () => {
//   const value = searchInput.value.toLowerCase().trim();

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
//   if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
//     resultsBox.classList.add("hidden");
//   }
// });


// // -------------------------------
// // MOBILE SEARCH SUPPORT
// // -------------------------------
// // MOBILE ELEMENTS
// const mobileInput = document.getElementById("mobileSearchInput");
// const mobileResults = document.getElementById("mobileSearchResults");

// // MOBILE SEARCH EVENT
// mobileInput?.addEventListener("input", () => {
//     const value = mobileInput.value.toLowerCase().trim();

//     if (value === "") {
//         mobileResults.classList.add("hidden");
//         mobileResults.innerHTML = "";
//         return;
//     }

//     const matches = allProducts.filter(p =>
//         p.name.toLowerCase().includes(value) ||
//         p.brand.toLowerCase().includes(value) ||
//         p.category.toLowerCase().includes(value) ||
//         p.short.toLowerCase().includes(value)
//     );

//     if (matches.length === 0) {
//         mobileResults.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
//         mobileResults.classList.remove("hidden");
//         return;
//     }

//     mobileResults.innerHTML = matches.map(p => `
//         <div onclick="window.location.href='product.html?id=${p.id}'"
//              class="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
//             <img src="${p.images[0]}" class="w-12 h-12 object-contain rounded">
//             <div>
//                 <p class="font-semibold text-gray-900">${p.name}</p>
//                 <p class="text-sm text-gray-600">${p.short}</p>
//             </div>
//         </div>
//     `).join("");

//     mobileResults.classList.remove("hidden");
// });

// -------------------------------
// MOBILE SEARCH SUPPORT
// -------------------------------

// const mobileInput = document.getElementById("mobileSearchInput");
// const mobileResults = document.getElementById("mobileSearchResults");
// const mobilePopup   = document.getElementById("mobileSearchPopup");

// // Mobile input listener
// mobileInput.addEventListener("input", () => {
//   const value = mobileInput.value.toLowerCase().trim();

//   if (value === "") {
//     mobileResults.innerHTML = "";
//     return;
//   }

//   // Reuse same filter logic
//   const matches = allProducts.filter(p =>
//     p.name.toLowerCase().includes(value) ||
//     p.brand.toLowerCase().includes(value) ||
//     p.category.toLowerCase().includes(value) ||
//     p.short.toLowerCase().includes(value)
//   );

//   // Build mobile results
//   if (matches.length === 0) {
//     mobileResults.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
//     return;
//   }

//   mobileResults.innerHTML = matches
//     .map(
//       p => `
//         <div 
//           class="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
//           onclick="window.location.href='product.html?id=${p.id}'"
//         >
//           <img src="${p.images[0]}" class="w-12 h-12 object-contain rounded">
//           <div>
//             <p class="font-semibold text-gray-900">${p.name}</p>
//             <p class="text-sm text-gray-600">${p.short}</p>
//           </div>
//         </div>
//       `
//     )
//     .join("");
// });

// // Close mobile search when clicking outside
// mobilePopup.addEventListener("click", (e) => {
//   if (e.target.id === "mobileSearchPopup") {
//     mobilePopup.classList.add("hidden");
//     mobileInput.value = "";
//     mobileResults.innerHTML = "";
//   }
// });





// ==============================================
// UNIVERSAL SEARCH SYSTEM
// Works on every page safely
// ==============================================


const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");


const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileSearchResults = document.getElementById("mobileSearchResults");

// Product dataset container
let GLOBAL_PRODUCTS = [];

// Load products once
fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
        GLOBAL_PRODUCTS = data;
    })
    .catch(err => console.error("Product load error:", err));


// ==============================================
// SEARCH HANDLER (reusable for desktop + mobile)
// ==============================================
function handleSearch(inputEl, resultsEl) {
    if (!inputEl || !resultsEl) return;

    inputEl.addEventListener("input", () => {
        const value = inputEl.value.toLowerCase().trim();

        if (value === "") {
            resultsEl.classList.add("hidden");
            resultsEl.innerHTML = "";
            return;
        }

        // Filter matches
        const matches = GLOBAL_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(value) ||
            p.brand.toLowerCase().includes(value) ||
            p.category.toLowerCase().includes(value) ||
            p.short.toLowerCase().includes(value)
        );

        if (matches.length === 0) {
            resultsEl.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
            resultsEl.classList.remove("hidden");
            return;
        }

        // Build dropdown HTML
        resultsEl.innerHTML = matches.map(p => `
            <div class="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                 onclick="window.location.href='product.html?id=${p.id}'">
                
                <img src="${p.images[0]}" class="w-12 h-12 object-contain rounded">
                
                <div>
                    <p class="font-semibold text-gray-900">${p.name}</p>
                    <p class="text-sm text-gray-600">${p.short}</p>
                </div>
            </div>
        `).join("");

        resultsEl.classList.remove("hidden");
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
        if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
            resultsEl.classList.add("hidden");
        }
    });
}


// ==============================================
// APPLY SEARCH TO DESKTOP + MOBILE
// ==============================================
handleSearch(searchInput, searchResults);
handleSearch(mobileSearchInput, mobileSearchResults);
