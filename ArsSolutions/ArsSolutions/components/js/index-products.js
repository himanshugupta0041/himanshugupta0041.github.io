
fetch("data/products.json")
    .then(res => res.json())
    .then(products => {

        const teleprompters = products.filter(p => p.category === "teleprompters");
        const laptops = products.filter(p => p.category === "laptops");
        const itProducts = products.filter(p => p.category === "it-products");

        buildSlider("teleprompter-track", teleprompters);
        buildSlider("laptop-track", laptops);
        buildSlider("it-products-track", itProducts);
        initSliders();
    });


function buildSlider(trackId, items) {
    const track = document.getElementById(trackId);
    if (!track) return;

    track.innerHTML = "";

    items.forEach(p => {
        track.innerHTML += `
        <div class="product-card relative w-72 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
             onclick="window.location.href='product.html?id=${p.id}'">

            <!-- Compare Button -->
            <button 
                class="compare-btn absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-medium text-primary shadow hidden group-hover:flex items-center gap-1 z-20"
                data-id="${p.id}" 
                onclick="event.stopPropagation()">
                + Compare
            </button>

            <div class="relative h-48 overflow-hidden">
                <img src="${p.images[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>

            <div class="p-5">
                <h4 class="font-semibold text-accent mb-1">${p.name}</h4>
                <p class="text-gray-500 text-sm mb-3">${p.short}</p>
                <div class="flex items-center justify-between">
                    <span class="text-primary font-bold">${p.price || "Wholesale"}</span>
                    <span class="text-sm text-gray-600 hover:text-primary font-medium flex items-center gap-1">
                        View <i data-feather="arrow-right" class="w-3 h-3"></i>
                    </span>
                </div>
            </div>
        </div>`;
    });
}



function initSliders() {
    document.querySelectorAll(".slider-prev").forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.dataset.slider;
            const slider = document.getElementById(type + "-slider");
            slider.scrollBy({ left: -300, behavior: "smooth" });
        });
    });

    document.querySelectorAll(".slider-next").forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.dataset.slider;
            const slider = document.getElementById(type + "-slider");
            slider.scrollBy({ left: 300, behavior: "smooth" });
        });
    });
}
