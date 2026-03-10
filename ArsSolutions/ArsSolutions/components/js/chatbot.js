

// LOAD PRODUCTS.JSON
// let PRODUCT_DATA = [];
fetch("data/products.json")
    .then(res => res.json())
    .then(data => PRODUCT_DATA = data);

// DOM REFS
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");
const voiceBtn = document.getElementById("voiceBtn");

// ADD USER & BOT MESSAGE
function addMessage(html, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = `flex gap-3 ${sender === "user" ? "justify-end" : ""}`;

    if (sender === "user") {
        msg.innerHTML = `
            <div class="bg-primary text-white p-3 rounded-lg rounded-tr-none shadow-sm text-sm max-w-[70%]">
                ${html}
            </div>
        `;
    } else {
        msg.innerHTML = `
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <i data-feather="cpu" class="text-white w-4 h-4"></i>
            </div>
            <div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[80%]">
                ${html}
            </div>
        `;
    }

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    feather.replace();
}

// TYPING INDICATOR
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing";
    typingDiv.className = "flex gap-3";

    typingDiv.innerHTML = `
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <i data-feather="cpu" class="text-white w-4 h-4"></i>
        </div>
        <div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-500 typing">
            Typing...
        </div>
    `;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

// ANALYZE USER MESSAGE
// function analyzeMessage(msg) {
//     msg = msg.toLowerCase();
//     let results = PRODUCT_DATA;

//     // CATEGORY DETECTION
//     if (msg.includes("teleprompter")) results = results.filter(p => p.category === "teleprompters");
//     if (msg.includes("laptop")) results = results.filter(p => p.category === "laptops");

//     // PRICE DETECTION
//     const num = msg.match(/\d+/);
//     if (num) {
//         const limit = Number(num[0]);
//         results = results.filter(p =>
//             Number(p.price.replace(/[^0-9]/g, "")) <= limit
//         );
//     }

//     // NO RESULTS
//     if (results.length === 0) {
//         return "I couldn't find matching products. Try: 'laptop under 800'.";
//     }

//     // BUILD PRODUCT CARDS
//     let html = `Here are some recommendations:<br><br>`;

//     results.slice(0, 3).forEach(p => {
//         html += `
//             <div class="border rounded-xl p-3 bg-white shadow mb-3">
//                 <img src="${p.images[0]}" class="w-full h-32 object-contain rounded mb-2">
//                 <b>${p.name}</b><br>
//                 <span class="text-sm text-gray-600">${p.short}</span><br>
//                 <a href="product.html?id=${p.id}" class="text-primary underline">View Details</a>
//             </div>
//         `;
//     });

//     return html;
// }

// SEND MESSAGE HANDLER

function analyzeMessage(msg) {
    msg = msg.toLowerCase();
    let results = PRODUCT_DATA;

    // -------- CATEGORY DETECTION ----------
    if (msg.includes("teleprompter")) results = results.filter(p => p.category === "teleprompters");
    if (msg.includes("laptop") || msg.includes("notebook") || msg.includes("pc"))
        results = results.filter(p => p.category === "laptops");
    if (msg.includes("mouse") || msg.includes("keyboard") || msg.includes("accessories")) 
        results = results.filter(p => p.category === "it-products");

    // -------- PRICE FILTER ----------
    const limit = msg.match(/\d+/);
    if (limit) {
        const priceLimit = Number(limit[0]);
        results = results.filter(p =>
            Number(p.price.replace(/[^0-9]/g, "")) <= priceLimit
        );
    }

    // -------- LAPTOP FEATURES ----------
    if (msg.includes("ram")) {
        if (msg.includes("16")) results = results.filter(p => p.ram?.includes("16"));
        if (msg.includes("8")) results = results.filter(p => p.ram?.includes("8"));
        if (msg.includes("32")) results = results.filter(p => p.ram?.includes("32"));
    }

    if (msg.includes("ssd")) {
        results = results.filter(p => p.storage?.toLowerCase().includes("ssd"));
    }

    if (msg.includes("gaming")) {
        results = results.filter(p =>
            p.short.toLowerCase().includes("gaming") ||
            p.features.some(f => f.toLowerCase().includes("graphics") || f.includes("fps"))
        );
    }

    if (msg.includes("editing") || msg.includes("video editing")) {
        results = results.filter(p => 
            p.features.some(f => f.toLowerCase().includes("editing") || f.toLowerCase().includes("performance"))
        );
    }

    if (msg.includes("light") || msg.includes("thin") || msg.includes("portable")) {
        results = results.filter(p =>
            p.short.toLowerCase().includes("light") ||
            p.features.some(f => f.toLowerCase().includes("portable") || f.includes("light"))
        );
    }

    // Screen size
    const screenSize = msg.match(/(\d{2}\.?\d?)\s*inch/);
    if (screenSize) {
        results = results.filter(p => 
            p.description?.toLowerCase().includes(screenSize[1])
        );
    }

    // -------- TELEPROMPTER FEATURES ----------
    if (msg.includes("dslr") || msg.includes("camera")) {
        results = results.filter(p => 
            p.features.some(f => f.toLowerCase().includes("dslr") || f.toLowerCase().includes("camera"))
        );
    }

    if (msg.includes("smartphone")) {
        results = results.filter(p => 
            p.features.some(f => f.toLowerCase().includes("phone"))
        );
    }

    if (msg.includes("wide angle") || msg.includes("wide lens")) {
        results = results.filter(p => 
            p.features.some(f => f.toLowerCase().includes("wide"))
        );
    }

    // -------- ACCESSORIES ----------
    if (msg.includes("silent") || msg.includes("quiet")) {
        results = results.filter(p => p.short.toLowerCase().includes("silent"));
    }

    if (msg.includes("mechanical")) {
        results = results.filter(p => p.short.toLowerCase().includes("mechanical"));
    }

    if (msg.includes("wireless")) {
        results = results.filter(p => p.short.toLowerCase().includes("wireless"));
    }

    // -------- NO MATCH ----------
    if (results.length === 0) {
        return `
        I couldn’t find an exact match 😕<br><br>
        You can search by:<br>
        • Price → "laptop under 50000"<br>
        • Specs → "laptop 16GB RAM SSD"<br>
        • Purpose → "teleprompter for DSLR"<br>
        • Type → "silent mouse" or "RGB keyboard"
        `;
    }

    // -------- OUTPUT RESULTS ----------
    let html = `Here are your best matches 🔍:<br><br>`;
    results.slice(0, 4).forEach(p => {
        html += `
            <div class="border rounded-xl p-3 bg-white shadow mb-3">
                <img src="${p.images[0]}" class="w-full h-28 object-contain rounded mb-2">
                <b>${p.name}</b><br>
                <span class="text-sm text-gray-600">${p.short}</span><br>
                <a href="product.html?id=${p.id}" class="text-primary underline">View Details</a>
            </div>
        `;
    });

    return html;
}

function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    chatInput.value = "";

    showTyping();

    setTimeout(() => {
        hideTyping();
        const reply = analyzeMessage(msg);
        addMessage(reply, "bot");
    }, 600);
}

// CLICK & ENTER
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

// VOICE INPUT
let recognition;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    voiceBtn.onclick = () => recognition.start();

    recognition.onresult = e => {
        chatInput.value = e.results[0][0].transcript;
        sendMessage();
    };
}