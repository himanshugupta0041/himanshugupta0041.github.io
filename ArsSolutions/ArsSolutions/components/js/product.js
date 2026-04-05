


const productId = new URLSearchParams(window.location.search).get("id");

let CURRENT_PRODUCT = null;
let ALL_PRODUCTS = [];


const $ = (id) => document.getElementById(id);


fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    ALL_PRODUCTS = products;
    CURRENT_PRODUCT = products.find((p) => p.id === productId);

    if (!CURRENT_PRODUCT) {
      alert("Product not found");
      return;
    }

    renderProduct(CURRENT_PRODUCT);
setupCompareButton(CURRENT_PRODUCT);
renderThumbnails(CURRENT_PRODUCT.images);
enableZoom($("product-image"));
loadSimilarProducts();

    feather.replace();
  });


function renderProduct(p) {
 
  $("product-image").src = p.images[0];

 
  $("product-name").innerText = p.name;
  $("product-brand").innerText = p.brand;
  $("product-sku").innerText = p.sku;
  $("product-category").innerText = p.category;

 
  const avail = $("product-availability");
  avail.innerText = p.availability;
  avail.className =
    "px-3 py-1 rounded-full text-xs font-medium " +
    (p.availability.toLowerCase().includes("stock")
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700");

  // Price + discount
  $("product-price").innerText = p.price;
  $("product-oldPrice").innerText = p.oldPrice || "";
  $("product-discount").innerText = p.discount || "";


  const discountBadge = $("discountBadge");
  if (p.discount) {
    discountBadge.innerText = p.discount;
    discountBadge.classList.remove("hidden");
  }

  // Brand badge top-right
  const brandBadge = $("brandBadge");
  brandBadge.innerText = p.brand;
  brandBadge.classList.remove("hidden");

  // Description & short
  $("product-short").innerText = p.short;
  $("product-description").innerText = p.description;

  // Highlights
  const highlightBox = $("product-highlights");
  highlightBox.innerHTML = "";
  p.highlights.forEach((h) => {
    highlightBox.innerHTML += `<li>✔ ${h}</li>`;
  });

  
  const shipBox = $("shipping-info");
  shipBox.innerHTML = "";
  p.shipping.forEach((s) => {
    shipBox.innerHTML += `<li>${s}</li>`;
  });

  // Features
  const featureBox = $("product-features");
  featureBox.innerHTML = "";
  p.features.forEach((f) => {
    featureBox.innerHTML += `<li>${f}</li>`;
  });

  // Specs Table
  const specTable = $("product-specs");
  specTable.innerHTML = "";
  p.specs.forEach(([k, v]) => {
    specTable.innerHTML += `
        <tr class="border-b">
            <td class="p-3 font-medium">${k}</td>
            <td class="p-3">${v}</td>
        </tr>`;
  });

  

  // QUOTE MODAL AUTO-FILL
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".openQuote");
    if (!btn) return;

    $("quoteProductName").value = p.name;
    $("quoteCategory").value = p.category;
    $("quoteBrand").value = p.brand;
    $("quoteSKU").value = p.sku;
    $("quotePrice").value = p.price;

    $("quoteModal").classList.remove("hidden");
  });
}

// ---------------------------------------------------------------
// 3) THUMBNAILS + ACTIVE STATE
// ---------------------------------------------------------------
function renderThumbnails(images) {
  const row = $("thumbnail-row");
  row.innerHTML = "";

  images.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;

    thumb.className =
      "w-20 h-20 object-contain border rounded-lg p-1 cursor-pointer transition hover:border-primary";

    if (i === 0) thumb.classList.add("border-primary");

    thumb.onclick = () => {
      $("product-image").src = src;

     
      document
        .querySelectorAll("#thumbnail-row img")
        .forEach((img) => img.classList.remove("border-primary"));

      thumb.classList.add("border-primary");
    };

    row.appendChild(thumb);
  });
}

// ---------------------------------------------------------------
// 4) IMAGE ZOOM (Improved Smooth Version)
// ---------------------------------------------------------------
function enableZoom(img) {
  const lens = $("zoom-lens");
  const result = $("zoom-result");

  result.style.backgroundImage = `url(${img.src})`;
  result.style.backgroundRepeat = "no-repeat";

  img.onmouseenter = () => {
    lens.style.display = "block";
    result.style.display = "block";
  };
  img.onmouseleave = () => {
    lens.style.display = "none";
    result.style.display = "none";
  };
  img.onmousemove = moveLens;

  function moveLens(e) {
    const rect = img.getBoundingClientRect();
    let x = e.clientX - rect.left - lens.offsetWidth / 2;
    let y = e.clientY - rect.top - lens.offsetHeight / 2;

    x = Math.max(0, Math.min(x, img.clientWidth - lens.offsetWidth));
    y = Math.max(0, Math.min(y, img.clientHeight - lens.offsetHeight));

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundSize = img.width * 2 + "px " + img.height * 2 + "px";
    result.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
  }
}

// ---------------------------------------------------------------
// 5) SIMILAR PRODUCTS (Category Based)
// ---------------------------------------------------------------
function loadSimilarProducts() {
  const wrapper = document.getElementById("similar-products");
  wrapper.innerHTML = "";

  const normalize = (str) => str.toLowerCase().trim();

  const similar = ALL_PRODUCTS.filter(
    (p) =>
      normalize(p.category) === normalize(CURRENT_PRODUCT.category) &&
      p.id !== CURRENT_PRODUCT.id
  );

  similar.forEach((p) => {
    wrapper.innerHTML += `
      <div class="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition p-3 snap-start cursor-pointer"
           onclick="window.location.href='product.html?id=${p.id}'">

        <img src="${p.images[0]}"
             class="h-40 w-full object-contain bg-white p-3 rounded-lg">

        <h3 class="font-semibold text-lg text-accent mt-2">${p.name}</h3>
        <p class="text-primary font-bold">${p.price}</p>
      </div>
    `;
  });

  // Slider arrows
  document.getElementById("similar-prev").onclick = () =>
    wrapper.scrollBy({ left: -300, behavior: "smooth" });

  document.getElementById("similar-next").onclick = () =>
    wrapper.scrollBy({ left: 300, behavior: "smooth" });


  let isDown = false;
  let startX, scrollLeft;

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wrapper.classList.add("cursor-grabbing");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.classList.remove("cursor-grabbing");
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });
}

// ---------------------------------------------------------------
// 6) DESKTOP + MOBILE TABS
// ---------------------------------------------------------------
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.onclick = () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.add("hidden"));

    $("tab-" + btn.dataset.tab).classList.remove("hidden");
  };
});

// MOBILE POPUP
const mobileTabsPopup = $("mobileTabPopup");
const openMobileTabs = $("openMobileTabs");
const closeMobileTabs = $("closeMobileTabs");

if (openMobileTabs)
  openMobileTabs.onclick = () => mobileTabsPopup.classList.remove("hidden");

if (closeMobileTabs)
  closeMobileTabs.onclick = () => mobileTabsPopup.classList.add("hidden");

mobileTabsPopup.onclick = (e) => {
  if (e.target.id === "mobileTabPopup") {
    mobileTabsPopup.classList.add("hidden");
  }
};

document.querySelectorAll(".mobile-tab-option").forEach((btn) => {
  btn.onclick = () => {
    const target = btn.dataset.tab;

    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));

    document
      .querySelector(`[data-tab="${target}"]`)
      .classList.add("active");

    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.add("hidden"));

    $("tab-" + target).classList.remove("hidden");

    mobileTabsPopup.classList.add("hidden");
  };
});



// ---------------------------------------------------------------
// 7) ADD TO COMPARE SYSTEM
// ---------------------------------------------------------------
function setupCompareButton(product) {
    const btn = document.getElementById("product-compare-btn");

    if (!btn) {
        console.warn("Compare button not found on this page.");
        return; 
    }

    btn.onclick = () => {
        let compareItems = JSON.parse(localStorage.getItem("compareList") || "[]");

        if (compareItems.includes(product.id)) {
            alert("Already added to compare!");
            return;
        }
        if (compareItems.length >= 3) {
            alert("You can only compare up to 3 products!");
            return;
        }

        compareItems.push(product.id);
        localStorage.setItem("compareList", JSON.stringify(compareItems));
        alert("Added to compare!");
    };
}



