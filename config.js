/* ============================================================
   VIGHYA TRADING — SITE SETTINGS
   Edit the values below. Everything on the site updates from here.
   ============================================================ */
window.SITE_CONFIG = {
  businessName: "Vighya Trading",

  // Phone shown on the site, and the number dialled (country code, no spaces)
  phoneDisplay: "+91 98131 70949",
  phoneDial: "+919813170949",

  // WhatsApp number: country code + number, digits only (e.g. 919876543210)
  whatsapp: "919813170949",

  email: "", // optional, leave "" to hide

  address: "House No. 56, Village Nangal, Bhiwani, Haryana (Piyush Battery)",

  // Paste the Google Maps share link here (Share → Copy link, e.g. https://maps.app.goo.gl/xxxx)
  mapLink: "https://maps.app.goo.gl/aCFKVXS1CKnffhJG6",

  // Optional: Google Maps embed URL (Share → Embed a map → copy only the src="..." value).
  // If left "", the map is drawn from mapQuery below.
  mapEmbed: "",
  mapQuery: "Nangal, Bhiwani, Haryana", // shop name / address Google can find

  hours: [
    ["Mon – Sat", "9:30 AM – 8:30 PM"],
    ["Sunday", "10:00 AM – 2:00 PM"],
  ],

  // Brands you stock (shown as a text strip). Edit to match your shop.
  brands: ["Exide", "Luminous", "Amaron", "Livguard", "Microtek", "Okaya"],

  /* ---------- PRODUCTS ----------
     category: "tubular" | "flat" | "inverter" | "combo"
     image: leave "" to use the built-in illustration, or put a path like "images/exide-150ah.jpg"
     price: leave "" to show "Ask for best price"                                          */
  products: [
    {
      category: "tubular", name: "Tall Tubular Battery 150Ah", tag: "Bestseller",
      tagline: "Long backup for everyday homes", price: "", image: "",
      specs: ["12V · 150Ah", "Low water top-up", "Long life for frequent cuts"],
    },
    {
      category: "tubular", name: "Tall Tubular Battery 200Ah", tag: "",
      tagline: "For bigger homes & longer outages", price: "", image: "",
      specs: ["12V · 200Ah", "Deep-cycle design", "Ideal with 1100–1500VA"],
    },
    {
      category: "tubular", name: "Tall Tubular Battery 220Ah", tag: "Max backup",
      tagline: "Maximum hours on a single charge", price: "", image: "",
      specs: ["12V · 220Ah", "Heavy-duty plates", "For long daily power cuts"],
    },
    {
      category: "tubular", name: "Short Tubular Battery 100Ah", tag: "",
      tagline: "Compact size, tubular reliability", price: "", image: "",
      specs: ["12V · 100Ah", "Fits tight spaces", "Good for small homes / shops"],
    },
    {
      category: "flat", name: "Flat Plate Battery 100Ah", tag: "Budget",
      tagline: "Affordable, fast charging", price: "", image: "",
      specs: ["12V · 100Ah", "Quick recharge", "Best for short, rare cuts"],
    },
    {
      category: "flat", name: "Flat Plate Battery 150Ah", tag: "",
      tagline: "Value pick for medium loads", price: "", image: "",
      specs: ["12V · 150Ah", "Lower upfront cost", "Fans, lights, TV"],
    },
    {
      category: "inverter", name: "Sine Wave Inverter 900–1100VA", tag: "",
      tagline: "Silent, safe for appliances", price: "", image: "",
      specs: ["Pure sine wave", "Runs on 1 battery", "Fans, lights, TV, router"],
    },
    {
      category: "inverter", name: "Sine Wave Inverter 1500–2500VA", tag: "",
      tagline: "Handles fridge, cooler & more", price: "", image: "",
      specs: ["Pure sine wave", "Runs on 2 batteries", "Bigger homes & offices"],
    },
    {
      category: "combo", name: "Home Combo: 1100VA + 150Ah", tag: "Popular",
      tagline: "Everything for a 2BHK, ready to install", price: "", image: "",
      specs: ["Inverter + tubular battery", "Trolley included*", "Installation support"],
    },
    {
      category: "combo", name: "Power Combo: 1500VA + 2 × 150Ah", tag: "",
      tagline: "For larger homes with heavier loads", price: "", image: "",
      specs: ["Inverter + 2 batteries", "Longer backup", "Installation support"],
    },
  ],
};
