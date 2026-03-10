let allProducts = [];
let teleprompters = [];

const grid = document.getElementById("teleprompter-grid");

// Load products
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    teleprompters = data.filter(p => p.category === "teleprompters");

    renderBrands();
    renderSizes();

    renderMobileBrands();
    renderMobileSizes();

    renderProducts(teleprompters);
  });

// Render product cards
function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class='text-gray-500 text-lg col-span-full'>No products match your filters.</p>`;
    return;
  }

  list.forEach(p => {
    grid.innerHTML += `
      <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group">

        <!-- IMAGE -->
        <div class="relative bg-white">
            <img src="${p.images[0]}" class="h-56 w-full object-contain p-4 group-hover:scale-105 transition duration-300">

            ${p.discount ? `
                <span class="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                    ${p.discount}
                </span>
            ` : ""}
        </div>

        <!-- CONTENT -->
        <div class="p-5 space-y-2">

          <!-- NAME -->
          <a href="product.html?id=${p.id}">
            <h3 class="font-semibold text-lg text-accent leading-snug group-hover:text-primary transition">
              ${p.name}
            </h3>
          </a>

          <!-- SHORT DESCRIPTION -->
          <p class="text-gray-500 text-sm">${p.short}</p>

          <!-- PRICE -->
          <div class="flex items-center gap-2 mt-1">
            <span class="text-primary font-bold text-lg">${p.price}</span>
            ${p.oldPrice ? `
                <span class="text-gray-400 line-through text-sm">${p.oldPrice}</span>
            ` : ""}
          </div>

          <!-- HIGHLIGHTS / FEATURE TAGS -->
          <div class="flex flex-wrap gap-2 mt-2">
            ${p.highlights.map(h => `
              <span class="text-xs bg-gray-100 px-2 py-1 rounded border">${h}</span>
            `).join("")}
          </div>

          <!-- ADD TO COMPARE -->
          <button class="compare-btn bg-white border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition"
        data-id="${p.id}">
    + Add to Compare
</button>

        </div>
      </div>
    `;
  });
}

// Extract unique brands dynamically
function renderBrands() {
  const box = document.getElementById("filter-brand");
  const brands = [...new Set(teleprompters.map(p => p.brand))];

  brands.forEach(brand => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${brand}" class="filter-brand">
        <span>${brand}</span>
      </label>
    `;
  });
}

// Extract unique sizes dynamically
function renderSizes() {
  const box = document.getElementById("filter-size");
  const sizes = new Set();

  teleprompters.forEach(p => {
    p.specs.forEach(([label, value]) => {
      if (label.toLowerCase().includes("display")) sizes.add(value);
      if (label.toLowerCase().includes("monitor")) sizes.add(value);
    });
  });

  [...sizes].forEach(size => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${size}" class="filter-size">
        <span>${size}</span>
      </label>
    `;
  });
}

/* ========== MOBILE FILTER BUILDER ========== */

// MOBILE BRAND FILTER
function renderMobileBrands() {
  const box = document.getElementById("mobile-filter-brand");
  box.innerHTML = "";

  const brands = [...new Set(teleprompters.map(p => p.brand))];

  brands.forEach(b => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${b}" class="mobile-filter-brand">
        <span>${b}</span>
      </label>
    `;
  });
}

// MOBILE SIZE FILTER
function renderMobileSizes() {
  const box = document.getElementById("mobile-filter-size");
  box.innerHTML = "";

  const sizes = new Set();
  teleprompters.forEach(p => {
    p.specs.forEach(([label, value]) => {
      if (label.toLowerCase().includes("display") || label.toLowerCase().includes("monitor")) {
        sizes.add(value);
      }
    });
  });

  [...sizes].forEach(size => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${size}" class="mobile-filter-size">
        <span>${size}</span>
      </label>
    `;
  });
}

// FILTERING SYSTEM
// function applyFilters() {
//   let filtered = [...teleprompters];

//   // BRAND FILTER
//   const selectedBrands = [...document.querySelectorAll(".filter-brand:checked")].map(c => c.value);
//   if (selectedBrands.length) {
//     filtered = filtered.filter(p => selectedBrands.includes(p.brand));
//   }

//   // AVAILABILITY
//   const avail = document.querySelector(".filter-availability:checked");
//   if (avail) {
//     filtered = filtered.filter(p => p.availability === "In Stock");
//   }

//   // PRICE FILTER
//   const min = Number(document.getElementById("minPrice").value);
//   const max = Number(document.getElementById("maxPrice").value);

//   filtered = filtered.filter(p => {
//     const price = Number(p.price.replace(/[^0-9]/g, ""));
//     return (!min || price >= min) && (!max || price <= max);
//   });

//   // SIZE FILTER
//   const selectedSizes = [...document.querySelectorAll(".filter-size:checked")].map(c => c.value);
//   if (selectedSizes.length) {
//     filtered = filtered.filter(p =>
//       p.specs.some(([_, val]) => selectedSizes.includes(val))
//     );
//   }

//   // TYPE FILTER (Presidential / Portable)
//   const types = [...document.querySelectorAll(".filter-type:checked")].map(c => c.value);
//   if (types.length) {
//     filtered = filtered.filter(p =>
//       types.some(t => p.short.toLowerCase().includes(t.toLowerCase()))
//     );
//   }

//   renderProducts(filtered);
// }


/* ========== FILTER ENGINE for Teleprompters ========== */

function applyFilters() {
  let filtered = [...teleprompters];

  // BRAND (Desktop + Mobile)
  const brandsDesk = [...document.querySelectorAll(".filter-brand:checked")].map(x => x.value);
  const brandsMobile = [...document.querySelectorAll(".mobile-filter-brand:checked")].map(x => x.value);
  const selectedBrands = [...new Set([...brandsDesk, ...brandsMobile])];

  if (selectedBrands.length) {
    filtered = filtered.filter(p => selectedBrands.includes(p.brand));
  }

  // AVAILABILITY
  const availDesk = document.querySelector(".filter-availability:checked");
  const availMobile = document.querySelector(".mobile-filter-availability:checked");

  if (availDesk || availMobile) {
    filtered = filtered.filter(p => p.availability === "In Stock");
  }

  // PRICE (Desktop + Mobile)
  const minDesk = Number(document.getElementById("minPrice").value);
  const maxDesk = Number(document.getElementById("maxPrice").value);

  const minMobile = Number(document.getElementById("mobile-minPrice").value);
  const maxMobile = Number(document.getElementById("mobile-maxPrice").value);

  const min = minDesk || minMobile;
  const max = maxDesk || maxMobile;

  filtered = filtered.filter(p => {
    const price = Number(p.price.replace(/[^0-9]/g, ""));
    return (!min || price >= min) && (!max || price <= max);
  });

  // DISPLAY SIZE
  const sizeDesk = [...document.querySelectorAll(".filter-size:checked")].map(x => x.value);
  const sizeMobile = [...document.querySelectorAll(".mobile-filter-size:checked")].map(x => x.value);
  const selectedSizes = [...new Set([...sizeDesk, ...sizeMobile])];

  if (selectedSizes.length) {
    filtered = filtered.filter(p =>
      p.specs.some(([label, val]) => selectedSizes.includes(val))
    );
  }

  // TYPE FILTER (Presidential / Portable)
  const typeDesk = [...document.querySelectorAll(".filter-type:checked")].map(x => x.value);
  const typeMobile = [...document.querySelectorAll(".mobile-filter-type:checked")].map(x => x.value);
  const selectedTypes = [...new Set([...typeDesk, ...typeMobile])];

  if (selectedTypes.length) {
    filtered = filtered.filter(p =>
      selectedTypes.some(t => p.short.toLowerCase().includes(t.toLowerCase()))
    );
  }

  renderProducts(filtered);
}
// EVENT LISTENERS
document.addEventListener("change", applyFilters);
document.getElementById("resetFilters").addEventListener("click", () => {
  document.querySelectorAll("input[type='checkbox']").forEach(c => (c.checked = false));
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  renderProducts(teleprompters);
});

// SEARCH SYSTEM
// let allProducts = [];

// Load product list once
// fetch("data/products.json")
//   .then(res => res.json())
//   .then(data => {
//     allProducts = data;
//   });

const input = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase().trim();

  if (value === "") {
    resultsBox.classList.add("hidden");
    resultsBox.innerHTML = "";
    return;
  }

  // Filter products
  const matches = allProducts.filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.brand.toLowerCase().includes(value) ||
    p.category.toLowerCase().includes(value) ||
    p.short.toLowerCase().includes(value)
  );

  // Build dropdown
  if (matches.length === 0) {
    resultsBox.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
    resultsBox.classList.remove("hidden");
    return;
  }

  resultsBox.innerHTML = matches
    .map(
      p => `
        <div 
          class="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
          onclick="window.location.href='product.html?id=${p.id}'"
        >
            <img src="${p.images[0]}" class="w-12 h-12 object-contain rounded">
            <div>
                <p class="font-semibold text-gray-900">${p.name}</p>
                <p class="text-sm text-gray-600">${p.short}</p>
            </div>
        </div>
      `
    )
    .join("");

  resultsBox.classList.remove("hidden");
});

// Close dropdown on click outside
document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
    resultsBox.classList.add("hidden");
  }
});


/* ========== MOBILE FILTER POPUP LOGIC ========== */

const mobilePopup = document.getElementById("mobileFilterPopup");
const openMobileFilters = document.getElementById("openMobileFilters");
const closeMobileFilters = document.getElementById("closeMobileFilters");
const applyMobileFilters = document.getElementById("applyMobileFilters");
const resetMobileFilters = document.getElementById("resetMobileFilters");

openMobileFilters.addEventListener("click", () => {
  mobilePopup.classList.remove("hidden");
});

closeMobileFilters.addEventListener("click", () => {
  mobilePopup.classList.add("hidden");
});

applyMobileFilters.addEventListener("click", () => {
  applyFilters();
  mobilePopup.classList.add("hidden");
});

resetMobileFilters.addEventListener("click", () => {
  document.querySelectorAll(".mobile-filter-brand, .mobile-filter-size, .mobile-filter-type, .mobile-filter-availability")
    .forEach(c => (c.checked = false));

  document.getElementById("mobile-minPrice").value = "";
  document.getElementById("mobile-maxPrice").value = "";

  applyFilters();
});