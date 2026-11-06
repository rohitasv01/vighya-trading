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

  // Google Maps share link (opens when people click the map / address / Directions)
  mapLink: "https://maps.app.goo.gl/aCFKVXS1CKnffhJG6",

  // Google Maps embed URL (Share → Embed a map → copy only the src="..." value)
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d760.2919430101716!2d76.20188170901604!3d28.728121485091275!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQzJzQxLjkiTiA3NsKwMTInMDcuNiJF!5e0!3m2!1sen!2sin!4v1793942098456!5m2!1sen!2sin",
  mapQuery: "28.728121,76.201881", // fallback if mapEmbed is ""

  hours: [
    ["Mon – Sun", "9:00 AM – 5:00 PM"],
  ],

  // Shown as a strip under the hero
  productTypes: [
    "Pure Sine Wave Inverters", "Modified Sine Wave Inverters", "Square Wave Inverters",
    "Off-Grid Inverters", "Grid-Tie Inverters", "Hybrid Inverters",
    "Tubular Batteries", "Flat Plate Batteries", "Lithium-Ion Batteries", "Solar Panels",
  ],

  /* ---------- CATEGORIES & PRODUCTS ----------
     Each category gets its own page: category.html?c=<id>
     Product fields:
       name, type (must match one of the category's "types"), tagline, specs [list]
       image: "images/file.webp" or "" to use the built-in illustration
       art:   which illustration to use when there is no image
       price: "" shows "Ask for best price"
       tag:   small badge, e.g. "Bestseller" (optional)                                  */
  categories: [
    {
      id: "batteries",
      name: "Batteries",
      icon: "battery",
      cover: "images/vighya-tubular-battery.webp",
      blurb: "Vighya tubular, flat plate, solar and lithium batteries for homes, shops and solar systems.",
      types: ["Tubular", "Flat Plate", "Lithium-Ion", "Solar"],
      products: [
        {
          name: "Vighya Tall Tubular Inverter Battery", type: "Tubular", tag: "Bestseller",
          tagline: "Low maintenance selenium battery, easy charge & high backup",
          image: "images/vighya-tubular-battery.webp", art: "tubular", price: "",
          specs: ["Selenium inside", "Deep discharge recovery", "Very low maintenance"],
        },
        {
          name: "Vighya Solar Battery", type: "Solar", tag: "36-month warranty*",
          tagline: "Xtrapower · Longlife · Hitech, for inverter & solar use",
          image: "images/vighya-solar-battery.webp", art: "tubular", price: "",
          specs: ["Silver inside", "Built for daily solar charging", "36-month warranty*"],
        },
        {
          name: "Vighya Power Lithium Phosphate Battery 12V", type: "Lithium-Ion", tag: "Lithium",
          tagline: "Heavy duty, long backup, no acid fumes",
          image: "images/vighya-lithium-battery.webp", art: "lithium", price: "",
          specs: ["LiFePO4 chemistry", "No water top-up", "No acid fumes"],
        },
        {
          name: "Short Tubular Battery", type: "Tubular", tag: "",
          tagline: "Compact size with tubular reliability",
          image: "", art: "tubular", price: "",
          specs: ["Fits tight spaces", "Small homes & shops", "Long life"],
        },
        {
          name: "Flat Plate Battery", type: "Flat Plate", tag: "Budget",
          tagline: "Affordable and quick to recharge",
          image: "", art: "flat", price: "",
          specs: ["Lower upfront cost", "Fast charging", "For short, occasional cuts"],
        },
      ],
    },
    {
      id: "inverters",
      name: "Inverters",
      icon: "inverter",
      cover: "",
      blurb: "Home UPS and solar inverters: pure sine, modified sine, square wave, off-grid, grid-tie and hybrid.",
      types: ["Pure Sine Wave", "Modified Sine Wave", "Square Wave", "Off-Grid", "Grid-Tie", "Hybrid"],
      products: [
        {
          name: "Pure Sine Wave Inverter", type: "Pure Sine Wave", tag: "Recommended",
          tagline: "Silent, clean power, safe for every appliance",
          image: "", art: "inverter", price: "",
          specs: ["Safe for fridge, LED TV, computers", "Silent fans, no humming", "Many VA ratings available"],
        },
        {
          name: "Modified Sine Wave Inverter", type: "Modified Sine Wave", tag: "",
          tagline: "Value option for fans, lights and TV",
          image: "", art: "inverter", price: "",
          specs: ["Lower cost", "Everyday home loads", "Many VA ratings available"],
        },
        {
          name: "Square Wave Inverter", type: "Square Wave", tag: "Budget",
          tagline: "Basic backup at the lowest cost",
          image: "", art: "inverter", price: "",
          specs: ["Most affordable", "Lights & fans", "Simple and rugged"],
        },
        {
          name: "Off-Grid (Standalone) Solar Inverter", type: "Off-Grid", tag: "",
          tagline: "Solar + battery power where the grid is weak",
          image: "", art: "solarInverter", price: "",
          specs: ["Works without grid", "Charges batteries from solar", "Villages & farms"],
        },
        {
          name: "Grid-Tie (On-Grid) Solar Inverter", type: "Grid-Tie", tag: "",
          tagline: "Feed solar power to the grid, cut your bill",
          image: "", art: "solarInverter", price: "",
          specs: ["No battery needed", "Net-metering ready*", "Lowest running cost"],
        },
        {
          name: "Hybrid Solar Inverter", type: "Hybrid", tag: "Popular",
          tagline: "Solar, battery and grid in one smart unit",
          image: "", art: "solarInverter", price: "",
          specs: ["Uses solar first", "Battery backup in cuts", "Grid as fallback"],
        },
      ],
    },
    {
      id: "solar-panels",
      name: "Solar Panels",
      icon: "solar",
      cover: "",
      blurb: "Solar panels and complete solar kits for rooftops, shops and farms.",
      types: ["Monocrystalline", "Polycrystalline", "Bifacial", "Solar Kits"],
      products: [
        {
          name: "Mono PERC Solar Panel", type: "Monocrystalline", tag: "High efficiency",
          tagline: "More power from less roof space",
          image: "", art: "solar", price: "",
          specs: ["High efficiency cells", "Good in low light", "Many wattages available"],
        },
        {
          name: "Polycrystalline Solar Panel", type: "Polycrystalline", tag: "",
          tagline: "Reliable and budget-friendly",
          image: "", art: "solar", price: "",
          specs: ["Lower cost per watt", "Proven technology", "Many wattages available"],
        },
        {
          name: "Bifacial Solar Panel", type: "Bifacial", tag: "",
          tagline: "Generates from both front and back",
          image: "", art: "solar", price: "",
          specs: ["Extra yield from reflected light", "Glass-glass build", "Open rooftops & ground mounts"],
        },
        {
          name: "Complete Solar System Kit", type: "Solar Kits", tag: "Popular",
          tagline: "Panels + inverter + battery, sized for your home",
          image: "", art: "solar", price: "",
          specs: ["We size it for your load", "Off-grid, on-grid or hybrid", "Installation support"],
        },
      ],
    },
    {
      id: "stabilizers",
      name: "Stabilizers",
      icon: "stabilizer",
      cover: "",
      blurb: "Voltage stabilizers to protect your AC, fridge, TV and whole home from voltage fluctuations.",
      types: ["Mainline", "AC", "Fridge & TV", "Servo"],
      products: [
        {
          name: "Mainline Stabilizer (Whole Home)", type: "Mainline", tag: "",
          tagline: "One stabilizer protects every appliance",
          image: "", art: "stabilizer", price: "",
          specs: ["Wide input range", "High/low voltage cut-off", "Many kVA ratings"],
        },
        {
          name: "AC Stabilizer", type: "AC", tag: "Bestseller",
          tagline: "For 1, 1.5 and 2 ton air conditioners",
          image: "", art: "stabilizer", price: "",
          specs: ["Time delay for compressor", "Overload protection", "Wall mounting"],
        },
        {
          name: "Refrigerator & TV Stabilizer", type: "Fridge & TV", tag: "",
          tagline: "Compact protection for single appliances",
          image: "", art: "stabilizer", price: "",
          specs: ["Fridges of all sizes", "LED / LCD TVs", "Auto restart"],
        },
        {
          name: "Servo Stabilizer", type: "Servo", tag: "",
          tagline: "Precise output for shops, clinics and offices",
          image: "", art: "stabilizer", price: "",
          specs: ["Very accurate output", "Heavy loads", "Single & three phase"],
        },
      ],
    },
    {
      id: "electric-scooters",
      name: "Electric Scooters",
      icon: "scooter",
      cover: "images/electric-scooters.webp",
      blurb: "Electric scooters in many models and colours. Visit the shop to see them and take a test ride.",
      types: ["Scooters", "Batteries & Chargers"],
      products: [
        {
          name: "Electric Scooters: Many Models & Colours", type: "Scooters", tag: "In stock",
          tagline: "Come see the full range at our shop",
          image: "images/electric-scooters.webp", art: "scooter", price: "",
          specs: ["Multiple models & colours", "Test ride at the shop", "Ask for range & price"],
        },
        {
          name: "Low-Speed Electric Scooter", type: "Scooters", tag: "",
          tagline: "Easy city rides at very low running cost",
          image: "", art: "scooter", price: "",
          specs: ["Light and easy to ride", "Charges from a home socket", "Ask about licence rules"],
        },
        {
          name: "High-Speed Electric Scooter", type: "Scooters", tag: "",
          tagline: "More power and range for daily commutes",
          image: "", art: "scooter", price: "",
          specs: ["Higher top speed", "Longer range", "Ask for range & on-road price"],
        },
        {
          name: "Scooter Batteries & Chargers", type: "Batteries & Chargers", tag: "",
          tagline: "Replacement batteries and chargers for e-scooters",
          image: "", art: "lithium", price: "",
          specs: ["Lithium & lead-acid packs", "Matching chargers", "Old battery exchange"],
        },
      ],
    },
    {
      id: "ac",
      name: "Air Conditioners",
      icon: "ac",
      cover: "",
      blurb: "Split, window and inverter ACs, with a matching stabilizer if you need one.",
      types: ["Split AC", "Window AC", "Inverter AC"],
      products: [
        {
          name: "Inverter Split AC", type: "Inverter AC", tag: "Energy saver",
          tagline: "Lower electricity bills, quiet cooling",
          image: "", art: "ac", price: "",
          specs: ["1 / 1.5 / 2 ton", "Variable-speed compressor", "Works well with solar"],
        },
        {
          name: "Split AC", type: "Split AC", tag: "",
          tagline: "Powerful cooling for bedrooms & halls",
          image: "", art: "ac", price: "",
          specs: ["1 / 1.5 / 2 ton", "Fast cooling", "Installation support"],
        },
        {
          name: "Window AC", type: "Window AC", tag: "Budget",
          tagline: "Simple to install, great value",
          image: "", art: "windowAc", price: "",
          specs: ["1 / 1.5 ton", "Single unit", "Easy service"],
        },
      ],
    },
  ],
};
