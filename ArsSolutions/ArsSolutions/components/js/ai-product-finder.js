// ------------------------------
// AI Product Finder (Rule-Based NLP)
// ------------------------------

async function aiProductFinder(query) {
   
    const res = await fetch("data/products.json");
    const products = await res.json();

    query = query.toLowerCase();

    let results = [...products]; 

 
    if (query.includes("teleprompter")) {
        results = results.filter(p => p.category === "teleprompters");
    }
    if (query.includes("laptop") || query.includes("notebook")) {
        results = results.filter(p => p.category === "laptops");
    }
    if (query.includes("accessories") || query.includes("mouse") || query.includes("keyboard")) {
        results = results.filter(p => p.category === "it-products");
    }

    // PRICE detection → "under 1000"
    const priceMatch = query.match(/under\s*\$?(\d+)/);
    if (priceMatch) {
        const limit = Number(priceMatch[1]);
        results = results.filter(p => {
            const price = Number(p.price.replace(/[^0-9]/g, ""));
            return price <= limit;
        });
    }

    // SIZE detection → “lightest”, “portable”, “travel”
    if (query.includes("portable") || query.includes("lightest") || query.includes("travel")) {
        results = results.filter(p => 
            p.short.toLowerCase().includes("portable") ||
            p.short.toLowerCase().includes("light") ||
            p.features.some(f => f.toLowerCase().includes("light") || f.toLowerCase().includes("travel"))
        );
    }

  
    const keywords = query.split(" ");
    results = results.filter(p =>
        keywords.some(k =>
            p.name.toLowerCase().includes(k) ||
            p.short.toLowerCase().includes(k)
        )
    );

    // Return top 5
    return results.slice(0, 5);
}
