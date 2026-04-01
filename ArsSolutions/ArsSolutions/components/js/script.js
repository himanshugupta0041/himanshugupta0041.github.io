
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
});


const nav = document.querySelector("nav");
if (nav) {
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    });
}


const productsData = {
    teleprompters: [
        "Studio Pro X1",
        "Presenter Elite 15",
        "Broadcast Master 22",
        "Event Pro Portable",
        "Confidence Monitor 17",
        "Presidential Series 24",
    ],
    "it-products": [
        "ProBook Enterprise",
        'UltraSlim 15.6"',
        "Precision Mouse Pro",
        "Mechanical Keyboard RGB",
        "Compact USB-C Hub",
        "Wireless Keyboard Mini",
        "Gaming Mouse RGB",
        "Workstation Desktop",
    ],
    "solar-products": ["Solar Panel Pro 400W", "Smart Inverter 5kW", "PowerBank 10kWh", "Home Solar Kit 10kW"],
};

const categorySelect = document.getElementById("categorySelect");
const productSelect = document.getElementById("productSelect");

categorySelect?.addEventListener("change", (e) => {
    const category = e.target.value;
    if (!productSelect) return;

    productSelect.innerHTML = `<option value="">Select Product</option>`;

    if (productsData[category]) {
        productsData[category].forEach((p) => {
            const option = document.createElement("option");
            option.value = p.toLowerCase().replace(/\s+/g, "-");
            option.textContent = p;
            productSelect.appendChild(option);
        });
    }
});


class Slider {
    constructor(containerId, prevBtn, nextBtn) {
        this.container = document.querySelector(`#${containerId}`);

        // if (!this.container) return; // SAFETY CHECK

        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;

        this.init();
    }

    init() {
        this.prevBtn?.addEventListener("click", () => this.scroll(-1));
        this.nextBtn?.addEventListener("click", () => this.scroll(1));

        this.container.addEventListener("mousedown", (e) => {
            this.isDown = true;
            this.startX = e.pageX - this.container.offsetLeft;
            this.scrollLeft = this.container.scrollLeft;
        });

        this.container.addEventListener("mouseup", () => (this.isDown = false));
        this.container.addEventListener("mouseleave", () => (this.isDown = false));

        this.container.addEventListener("mousemove", (e) => {
            if (!this.isDown) return;
            const x = e.pageX - this.container.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.container.scrollLeft = this.scrollLeft - walk;
        });

        this.container.addEventListener("touchstart", (e) => {
            this.startX = e.touches[0].pageX - this.container.offsetLeft;
            this.scrollLeft = this.container.scrollLeft;
        });

        this.container.addEventListener("touchmove", (e) => {
            const x = e.touches[0].pageX - this.container.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.container.scrollLeft = this.scrollLeft - walk;
        });
    }

    scroll(dir) {
        this.container.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
}

/*----------------------------------------------------------
    INITIALIZE SLIDERS (ONLY IF PRESENT)
----------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    new Slider(
        "teleprompter-slider",
        document.querySelector('[data-slider="teleprompter"].slider-prev'),
        document.querySelector('[data-slider="teleprompter"].slider-next')
    );

    new Slider(
        "it-slider",
        document.querySelector('[data-slider="it"].slider-prev'),
        document.querySelector('[data-slider="it"].slider-next')
    );

    new Slider(
        "solar-slider",
        document.querySelector('[data-slider="solar"].slider-prev'),
        document.querySelector('[data-slider="solar"].slider-next')
    );

  
    try {
        feather.replace();
    } catch (e) {
        console.warn("Feather load failed.");
    }
});

/*----------------------------------------------------------
    MOBILE SEARCH POPUP — SAFE VERSION
----------------------------------------------------------*/
const mobileSearchBtn = document.getElementById("mobileSearchBtn");
const mobileSearchPopup = document.getElementById("mobileSearchPopup");
const mobileSearchClose = document.getElementById("mobileSearchClose");

mobileSearchBtn?.addEventListener("click", () => mobileSearchPopup?.classList.remove("hidden"));
mobileSearchClose?.addEventListener("click", () => mobileSearchPopup?.classList.add("hidden"));

mobileSearchPopup?.addEventListener("click", (e) => {
    if (e.target.id === "mobileSearchPopup") mobileSearchPopup.classList.add("hidden");
});

/*----------------------------------------------------------
    MOBILE FILTER POPUP — SAFE VERSION
----------------------------------------------------------*/
// const mobileFilterPopup = document.getElementById("mobileFilterPopup");
// const openMobileFilters = document.getElementById("openMobileFilters");
// const closeMobileFilters = document.getElementById("closeMobileFilters");

// openMobileFilters?.addEventListener("click", () => mobileFilterPopup?.classList.remove("hidden"));
// closeMobileFilters?.addEventListener("click", () => mobileFilterPopup?.classList.add("hidden"));

// mobileFilterPopup?.addEventListener("click", (e) => {
//     if (e.target.id === "mobileFilterPopup") mobileFilterPopup.classList.add("hidden");
// });


