
let laptopProducts = [];
let allProducts = [];

const laptopGrid = document.getElementById("laptop-grid");


fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    laptopProducts = data.filter(p => p.category === "laptops");

    renderLaptopBrands();
    renderLaptopRAM();
    renderLaptopStorage();
    renderLaptopSizes();

    renderMobileLaptopBrands();
    renderMobileLaptopRAM();
    renderMobileLaptopStorage();
    renderMobileLaptopSizes();

    renderLaptopProducts(laptopProducts);
  });


function renderLaptopProducts(list) {
  laptopGrid.innerHTML = "";

    if (list.length === 0) {
      laptopGrid.innerHTML = `
        <p class='text-gray-500 text-lg col-span-full text-center'>
          No laptops match your filters.
        </p>`;
      return;
    }

  list.forEach(p => {
    laptopGrid.innerHTML += `
      <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">

        <!-- IMAGE -->
        <div class="relative h-64 overflow-hidden">
            <img src="${p.images[0]}" 
                alt="${p.name}"
                class="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500">

            <!-- BADGE: Discount -->
            ${p.discount ? `
              <span class="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ${p.discount}
              </span>` : ""}

            <!-- BADGE: Brand -->
            <span class="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded">
              ${p.brand}
            </span>
        </div>

        <!-- CONTENT -->
        <div class="p-6">
       <a href="product.html?id=${p.id}">
            <h3 class="font-semibold text-lg text-accent leading-snug group-hover:text-primary transition">
              ${p.name}
            </h3>
          </a>
            <p class="text-gray-500 text-sm mb-4">${p.short}</p>

            <!-- Specs Chips -->
            <div class="flex flex-wrap gap-2 text-xs mb-4">
                ${p.specs.slice(0, 2).map(s => `
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded">${s[1]}</span>
                `).join("")}
            </div>

            <!-- PRICE + BTN -->
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-2xl font-bold text-primary">${p.price}</span>
                    ${p.oldPrice ? `<span class="text-gray-400 text-sm line-through ml-2">${p.oldPrice}</span>` : ""}
                </div>

            </div>

            <!-- ADD TO COMPARE -->
          <button class="compare-btn bg-white border border-primary text-primary px-8 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition"
        data-id="${p.id}">
    + Add to Compare
</button>
        </div>

      </div>
    `;
  });

  // Refresh feather icons
  feather.replace();
}

/* ========== EXTRACT FILTER VALUES ========== */
function getLaptopSpecs(products, match) {
  const set = new Set();
  products.forEach(p => {
    p.specs.forEach(([key, value]) => {
      if (key.toLowerCase().includes(match)) set.add(value);
    });
  });
  return [...set];
}

/* ========== RENDER DESKTOP FILTERS ========== */
function renderLaptopBrands() {
  const box = document.getElementById("filter-laptop-brand");
  const brands = [...new Set(laptopProducts.map(p => p.brand))];

  brands.forEach(b => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${b}" class="filter-laptop-brand">
        <span>${b}</span>
      </label>
    `;
  });
}

function renderLaptopRAM() {
  const box = document.getElementById("filter-laptop-ram");
  const ramValues = getLaptopSpecs(laptopProducts, "ram");

  ramValues.forEach(r => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${r}" class="filter-laptop-ram">
        <span>${r}</span>
      </label>
    `;
  });
}

function renderLaptopStorage() {
  const box = document.getElementById("filter-laptop-storage");
  const storage = getLaptopSpecs(laptopProducts, "storage");

  storage.forEach(s => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${s}" class="filter-laptop-storage">
        <span>${s}</span>
      </label>
    `;
  });
}

function renderLaptopSizes() {
  const box = document.getElementById("filter-laptop-size");
  const sizes = getLaptopSpecs(laptopProducts, "display");

  sizes.forEach(size => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${size}" class="filter-laptop-size">
        <span>${size}</span>
      </label>
    `;
  });
}

/* ========== RENDER MOBILE FILTERS ========== */
function renderMobileLaptopBrands() {
  const box = document.getElementById("mobile-laptop-filter-brand");
  box.innerHTML = "";
  const brands = [...new Set(laptopProducts.map(p => p.brand))];
  brands.forEach(b => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${b}" class="mobile-laptop-filter-brand">
        <span>${b}</span>
      </label>
    `;
  });
}

function renderMobileLaptopRAM() {
  const box = document.getElementById("mobile-laptop-filter-ram");
  const values = getLaptopSpecs(laptopProducts, "ram");
  values.forEach(v => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${v}" class="mobile-laptop-filter-ram">
        <span>${v}</span>
      </label>
    `;
  });
}

function renderMobileLaptopStorage() {
  const box = document.getElementById("mobile-laptop-filter-storage");
  const values = getLaptopSpecs(laptopProducts, "storage");
  values.forEach(v => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${v}" class="mobile-laptop-filter-storage">
        <span>${v}</span>
      </label>
    `;
  });
}

function renderMobileLaptopSizes() {
  const box = document.getElementById("mobile-laptop-filter-size");
  const values = getLaptopSpecs(laptopProducts, "display");
  values.forEach(v => {
    box.innerHTML += `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${v}" class="mobile-laptop-filter-size">
        <span>${v}</span>
      </label>
    `;
  });
}

/* ========== FILTER ENGINE (Desktop + Mobile) ========== */
function applyLaptopFilters() {
  let filtered = [...laptopProducts];

  // BRAND
  const brandsDesk = [...document.querySelectorAll(".filter-laptop-brand:checked")].map(x => x.value);
  const brandsMobile = [...document.querySelectorAll(".mobile-laptop-filter-brand:checked")].map(x => x.value);
  const selectedBrands = [...new Set([...brandsDesk, ...brandsMobile])];

  if (selectedBrands.length) {
    filtered = filtered.filter(p => selectedBrands.includes(p.brand));
  }

  // AVAILABILITY
  const aDesk = document.querySelector(".filter-laptop-availability:checked");
  const aMobile = document.querySelector(".mobile-laptop-filter-availability:checked");

  if (aDesk || aMobile) {
    filtered = filtered.filter(p => p.availability === "In Stock");
  }

  // PRICE
  const min = Number(document.getElementById("laptop-minPrice").value || document.getElementById("mobile-laptop-minPrice").value);
  const max = Number(document.getElementById("laptop-maxPrice").value || document.getElementById("mobile-laptop-maxPrice").value);

  filtered = filtered.filter(p => {
    const price = Number(p.price.replace(/[^0-9]/g, ""));
    return (!min || price >= min) && (!max || price <= max);
  });

  // RAM
  const ramDesk = [...document.querySelectorAll(".filter-laptop-ram:checked")].map(x => x.value);
  const ramMobile = [...document.querySelectorAll(".mobile-laptop-filter-ram:checked")].map(x => x.value);
  const selectedRAM = [...new Set([...ramDesk, ...ramMobile])];

  if (selectedRAM.length) {
    filtered = filtered.filter(p =>
      p.specs.some(([key, value]) => key.toLowerCase().includes("ram") && selectedRAM.includes(value))
    );
  }

  // STORAGE
  const storeDesk = [...document.querySelectorAll(".filter-laptop-storage:checked")].map(x => x.value);
  const storeMobile = [...document.querySelectorAll(".mobile-laptop-filter-storage:checked")].map(x => x.value);
  const selectedStorage = [...new Set([...storeDesk, ...storeMobile])];

  if (selectedStorage.length) {
    filtered = filtered.filter(p =>
      p.specs.some(([key, value]) => key.toLowerCase().includes("storage") && selectedStorage.includes(value))
    );
  }

  // SIZE
  const sizeDesk = [...document.querySelectorAll(".filter-laptop-size:checked")].map(x => x.value);
  const sizeMobile = [...document.querySelectorAll(".mobile-laptop-filter-size:checked")].map(x => x.value);
  const selectedSizes = [...new Set([...sizeDesk, ...sizeMobile])];

  if (selectedSizes.length) {
    filtered = filtered.filter(p =>
      p.specs.some(([key, value]) => key.toLowerCase().includes("display") && selectedSizes.includes(value))
    );
  }

  renderLaptopProducts(filtered);
}

/* ========== EVENTS ========== */
document.addEventListener("change", applyLaptopFilters);

document.getElementById("laptop-resetFilters").addEventListener("click", () => {
  document.querySelectorAll("input[type='checkbox']").forEach(x => (x.checked = false));
  document.getElementById("laptop-minPrice").value = "";
  document.getElementById("laptop-maxPrice").value = "";
  renderLaptopProducts(laptopProducts);
});

/* ========== MOBILE FILTER POPUP LOGIC ========== */
const mobilePopup = document.getElementById("laptopMobileFilterPopup");
const openMobile = document.getElementById("openLaptopMobileFilters");
const closeMobile = document.getElementById("closeLaptopMobileFilters");
const applyMobile = document.getElementById("applyLaptopMobileFilters");
const resetMobile = document.getElementById("resetLaptopMobileFilters");

openMobile.addEventListener("click", () => mobilePopup.classList.remove("hidden"));
closeMobile.addEventListener("click", () => mobilePopup.classList.add("hidden"));

applyMobile.addEventListener("click", () => {
  applyLaptopFilters();
  mobilePopup.classList.add("hidden");
});

resetMobile.addEventListener("click", () => {
  document.querySelectorAll(".mobile-laptop-filter-brand, .mobile-laptop-filter-ram, .mobile-laptop-filter-storage, .mobile-laptop-filter-size, .mobile-laptop-filter-availability")
    .forEach(i => (i.checked = false));

  document.getElementById("mobile-laptop-minPrice").value = "";
  document.getElementById("mobile-laptop-maxPrice").value = "";

  applyLaptopFilters();
});
