(function () {
  const C = window.SITE_CONFIG;
  const IDX = window.CATALOG_INDEX || {}; // data/index.js: counts, subcategories and a few featured products per category
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const page = document.body.dataset.page; // "home" | "category" | "product"
  const home = page === "home" ? "" : "./";
  const waUrl = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const mapUrl = C.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapQuery || C.address)}`;
  const catUrl = (id, sub, brand) => `category.html?c=${encodeURIComponent(id)}${sub ? `&s=${encodeURIComponent(sub)}` : ""}${brand ? `&b=${encodeURIComponent(brand)}` : ""}`;
  const prodUrl = (p) => `product.html?c=${encodeURIComponent(p.cat)}&id=${encodeURIComponent(p.id)}`;

  /* ---------- Icons ---------- */
  const ICON = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
    wa: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7a11.4 11.4 0 0 1-4.5-4c-.3-.5-1-1.5-1-2.8s.7-2 1-2.3a1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6a8.2 8.2 0 0 0 1.5 1.9 7.4 7.4 0 0 0 2.2 1.3c.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3a2.4 2.4 0 0 1-.2 1.3z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    arrow: '<path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/>',
    menu: '<path d="M5 4h2v16H5zM11 4h2v16h-2zM17 4h2v16h-2z"/>',
    chevDown: '<path d="m7.4 8.6 4.6 4.6 4.6-4.6L18 10l-6 6-6-6z"/>',
    chevRight: '<path d="m8.6 16.6 4.6-4.6-4.6-4.6L10 6l6 6-6 6z"/>',
    chevLeft: '<path d="M15.4 16.6 10.8 12l4.6-4.6L14 6l-6 6 6 6z"/>',
    close: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6 10.6 12 5 6.4z"/>',
    search: '<path d="M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/>',
  };
  const ico = (n, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

  // Line icons for categories
  const CAT_ICON = {
    battery: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M7 7V4h3v3M14 7V4h3v3M12.5 10 10 14.5h3L11.5 18"/>',
    inverter: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M6 12c1.2-3 2.3-3 3.5 0s2.3 3 3.5 0 2.3-3 3.5 0"/><path d="M7 19v2M17 19v2"/>',
    solar: '<path d="M4 9h16l-2 10H6z"/><path d="M5 14h14M10 9l-.8 10M14 9l.8 10"/><path d="M12 2v3M5.6 4.6l1.5 1.5M18.4 4.6l-1.5 1.5"/>',
    stabilizer: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15a5 5 0 0 1 10 0"/><path d="m12 15 2.5-3"/><path d="M7 18h10"/>',
    scooter: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h7l3-8h3M16 9l-2-4h-2M9 17l1-5h4"/>',
    ac: '<rect x="2" y="4" width="20" height="9" rx="2"/><path d="M5 10h14M7 16c0 1.5-1 2-1 3.5M12 16v4M17 16c0 1.5 1 2 1 3.5"/>',
    charger: '<path d="M9 2v4M15 2v4M7 6h10v4a5 5 0 0 1-10 0z"/><path d="M12 15v2.5a3.5 3.5 0 0 0 3.5 3.5H19"/>',
    washer: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 7h16M7 4.5h2"/><circle cx="12" cy="14" r="4.5"/><path d="M9.5 15c1.5 1 3.5 1 5 0"/>',
    fridge: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 9h14M8 5v2M8 12v3"/>',
  };
  const catIco = (n) => `<svg class="cat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICON[n] || CAT_ICON.battery}</svg>`;

  /* ---------- Product illustrations (used where there is no photo) ---------- */
  const vighyaMark = '<path d="M2 4h7l4.5 10L11 20z" fill="#7b70f0"/><path d="M15 4h7l-8.5 16-2-5z" fill="#ff4d63"/>'; // the logo, 24×24
  const bolt = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M14 0 0 26h11l-4 24 17-32H13z" fill="#fff"/>`;
  const ART = {
    tubular: () => `<svg viewBox="0 0 120 140"><rect x="30" y="8" width="16" height="12" rx="3" fill="#9fb3cf"/><rect x="74" y="8" width="16" height="12" rx="3" fill="#9fb3cf"/>
      <rect x="18" y="16" width="84" height="116" rx="12" fill="#1f8f5a"/><rect x="28" y="30" width="64" height="10" rx="5" fill="#fff" opacity=".25"/>${bolt(48, 56)}</svg>`,
    flat: () => `<svg viewBox="0 0 120 140"><rect x="26" y="38" width="16" height="12" rx="3" fill="#9fb3cf"/><rect x="78" y="38" width="16" height="12" rx="3" fill="#9fb3cf"/>
      <rect x="8" y="46" width="104" height="76" rx="12" fill="#2465c7"/><rect x="18" y="58" width="84" height="8" rx="4" fill="#fff" opacity=".25"/>${bolt(50, 72, .8)}</svg>`,
    lithium: () => `<svg viewBox="0 0 120 140"><rect x="16" y="22" width="88" height="12" rx="4" fill="#7bd13f"/>
      <rect x="22" y="14" width="14" height="10" rx="2" fill="#222"/><rect x="84" y="14" width="14" height="10" rx="2" fill="#e5334b"/>
      <rect x="16" y="32" width="88" height="96" rx="8" fill="#1d2433"/><rect x="16" y="78" width="88" height="22" fill="#f28c1b"/>
      <text x="60" y="94" text-anchor="middle" font-size="11" font-weight="800" fill="#1d2433" font-family="sans-serif">LiFePO4</text>
      <text x="30" y="66" font-size="14" font-weight="800" fill="#fff" font-family="sans-serif">12V</text></svg>`,
    inverter: () => `<svg viewBox="0 0 120 140"><rect x="12" y="30" width="96" height="84" rx="12" fill="#16325c"/>
      <rect x="24" y="42" width="46" height="26" rx="4" fill="#0a1a31"/><path d="M28 55c3-9 6-9 9 0s6 9 9 0 6-9 9 0 6 9 9 0" stroke="#5cf0a6" stroke-width="2.5" fill="none"/>
      <circle cx="88" cy="55" r="11" fill="#fff" opacity=".9"/><circle cx="88" cy="55" r="4" fill="#16325c"/>
      <rect x="24" y="80" width="72" height="4" rx="2" fill="#fff" opacity=".3"/><rect x="24" y="90" width="72" height="4" rx="2" fill="#fff" opacity=".3"/>
      <rect x="20" y="114" width="12" height="6" rx="2" fill="#5b6b82"/><rect x="88" y="114" width="12" height="6" rx="2" fill="#5b6b82"/></svg>`,
    solarInverter: () => `<svg viewBox="0 0 120 140"><rect x="22" y="14" width="76" height="112" rx="10" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="34" y="28" width="52" height="30" rx="4" fill="#0a1a31"/><circle cx="60" cy="43" r="7" fill="#ffb020"/>
      <path d="M60 31v-3M60 58v-3M48 43h-3M75 43h-3" stroke="#ffb020" stroke-width="2"/>
      <circle cx="44" cy="72" r="3" fill="#16c06b"/><circle cx="56" cy="72" r="3" fill="#ffb020"/><circle cx="68" cy="72" r="3" fill="#c9d4e3"/>
      <rect x="34" y="86" width="52" height="4" rx="2" fill="#c9d4e3"/><rect x="34" y="96" width="52" height="4" rx="2" fill="#c9d4e3"/>
      <rect x="40" y="126" width="8" height="8" fill="#5b6b82"/><rect x="72" y="126" width="8" height="8" fill="#5b6b82"/></svg>`,
    solar: () => `<svg viewBox="0 0 120 140"><circle cx="96" cy="24" r="12" fill="#ffb020"/>
      <path d="M22 40h76l10 64H12z" fill="#16325c" stroke="#9fb3cf" stroke-width="2"/>
      <path d="M20 61h80M16 82h88M41 40l-5 64M60 40v64M79 40l5 64" stroke="#3d6bb3" stroke-width="2"/>
      <path d="M55 104h10v18H55z" fill="#9fb3cf"/><rect x="38" y="122" width="44" height="6" rx="3" fill="#9fb3cf"/></svg>`,
    stabilizer: () => `<svg viewBox="0 0 120 140"><rect x="16" y="22" width="88" height="100" rx="12" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <path d="M34 76a26 26 0 0 1 52 0" stroke="#16325c" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M34 76a26 26 0 0 1 14-23" stroke="#e5334b" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M60 76 74 58" stroke="#0a1a31" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="76" r="4" fill="#0a1a31"/>
      <rect x="32" y="92" width="56" height="14" rx="3" fill="#0a1a31"/><text x="60" y="103" text-anchor="middle" font-size="10" font-weight="700" fill="#5cf0a6" font-family="sans-serif">230V</text></svg>`,
    scooter: () => `<svg viewBox="0 0 140 140"><circle cx="32" cy="104" r="16" fill="#16325c"/><circle cx="32" cy="104" r="6" fill="#9fb3cf"/>
      <circle cx="108" cy="104" r="16" fill="#16325c"/><circle cx="108" cy="104" r="6" fill="#9fb3cf"/>
      <path d="M22 92c4-14 14-20 30-20h28l8 20z" fill="#16c06b"/><path d="M50 70h30v-6H50z" fill="#0a1a31"/>
      <path d="M88 92 98 34h12" stroke="#16325c" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M92 92h16" stroke="#16325c" stroke-width="6" stroke-linecap="round"/><rect x="104" y="30" width="16" height="6" rx="3" fill="#0a1a31"/>
      ${bolt(60, 76, .45)}</svg>`,
    ac: () => `<svg viewBox="0 0 140 140"><rect x="10" y="34" width="120" height="44" rx="12" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="18" y="64" width="104" height="6" rx="3" fill="#dde4ee"/><circle cx="114" cy="46" r="3" fill="#16c06b"/>
      <path d="M36 88c-4 8 4 12 0 20M70 88c-4 8 4 12 0 20M104 88c-4 8 4 12 0 20" stroke="#5aa9f0" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    windowAc: () => `<svg viewBox="0 0 140 140"><rect x="20" y="28" width="100" height="84" rx="10" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="30" y="38" width="56" height="64" rx="4" fill="#dde4ee"/><path d="M30 48h56M30 58h56M30 68h56M30 78h56M30 88h56" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="94" y="40" width="18" height="10" rx="2" fill="#0a1a31"/><circle cx="103" cy="66" r="5" fill="#9fb3cf"/><circle cx="103" cy="84" r="5" fill="#9fb3cf"/></svg>`,
      pack: () => `<svg viewBox="0 0 120 140"><rect x="16" y="22" width="88" height="12" rx="4" fill="#7bd13f"/>
      <rect x="22" y="14" width="14" height="10" rx="2" fill="#222"/><rect x="84" y="14" width="14" height="10" rx="2" fill="#e5334b"/>
      <rect x="16" y="32" width="88" height="96" rx="8" fill="#1d2433"/><rect x="16" y="86" width="88" height="20" fill="#f28c1b"/>
      <text x="60" y="100" text-anchor="middle" font-size="11" font-weight="800" fill="#1d2433" font-family="sans-serif">LITHIUM</text>
      ${bolt(49, 44, .7)}</svg>`,
    vighyaPack: () => `<svg viewBox="0 0 120 140"><rect x="16" y="22" width="88" height="12" rx="4" fill="#7bd13f"/>
      <rect x="22" y="14" width="14" height="10" rx="2" fill="#222"/><rect x="84" y="14" width="14" height="10" rx="2" fill="#e5334b"/>
      <rect x="16" y="32" width="88" height="96" rx="8" fill="#1d2433"/>
      <g transform="translate(46.2 42) scale(1.15)">${vighyaMark}</g>
      <rect x="16" y="84" width="88" height="22" fill="#f28c1b"/>
      <text x="60" y="99.5" text-anchor="middle" font-size="13" font-weight="800" letter-spacing="1" fill="#1d2433" font-family="sans-serif">VIGHYA</text>
      <text x="60" y="120" text-anchor="middle" font-size="8" font-weight="700" letter-spacing="1" fill="#9fb3cf" font-family="sans-serif">LITHIUM</text></svg>`,
    vighyaEss: () => `<svg viewBox="0 0 120 140"><rect x="22" y="8" width="76" height="124" rx="10" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="32" y="20" width="56" height="26" rx="4" fill="#0a1a31"/>
      <rect x="40" y="28" width="32" height="10" rx="2" fill="none" stroke="#5cf0a6" stroke-width="2"/><rect x="43" y="31" width="20" height="4" fill="#5cf0a6"/><rect x="72" y="31" width="3" height="4" fill="#5cf0a6"/>
      <circle cx="42" cy="56" r="3" fill="#16c06b"/><circle cx="54" cy="56" r="3" fill="#16c06b"/><circle cx="66" cy="56" r="3" fill="#16c06b"/><circle cx="78" cy="56" r="3" fill="#c9d4e3"/>
      <rect x="38" y="64" width="44" height="30" rx="6" fill="#0b1b33"/><g transform="translate(48 63)">${vighyaMark}</g>
      <text x="60" y="108" text-anchor="middle" font-size="11" font-weight="800" letter-spacing="1" fill="#16325c" font-family="sans-serif">VIGHYA</text>
      <path d="M34 120h52" stroke="#dde4ee" stroke-width="5" stroke-linecap="round"/>
      <rect x="40" y="132" width="10" height="4" fill="#9fb3cf"/><rect x="70" y="132" width="10" height="4" fill="#9fb3cf"/></svg>`,
    ess: () => `<svg viewBox="0 0 120 140"><rect x="22" y="8" width="76" height="124" rx="10" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="32" y="20" width="56" height="26" rx="4" fill="#0a1a31"/>
      <rect x="40" y="28" width="32" height="10" rx="2" fill="none" stroke="#5cf0a6" stroke-width="2"/><rect x="43" y="31" width="20" height="4" fill="#5cf0a6"/><rect x="72" y="31" width="3" height="4" fill="#5cf0a6"/>
      <circle cx="42" cy="58" r="3" fill="#16c06b"/><circle cx="54" cy="58" r="3" fill="#16c06b"/><circle cx="66" cy="58" r="3" fill="#16c06b"/><circle cx="78" cy="58" r="3" fill="#c9d4e3"/>
      <path d="M34 76h52M34 90h52M34 104h52" stroke="#dde4ee" stroke-width="5" stroke-linecap="round"/>
      <rect x="40" y="132" width="10" height="4" fill="#9fb3cf"/><rect x="70" y="132" width="10" height="4" fill="#9fb3cf"/></svg>`,
    cellPrismatic: () => `<svg viewBox="0 0 120 140"><rect x="36" y="12" width="14" height="14" rx="2" fill="#c9d4e3"/><rect x="70" y="12" width="14" height="14" rx="2" fill="#c9d4e3"/>
      <rect x="24" y="22" width="72" height="110" rx="6" fill="#2465c7"/><rect x="24" y="22" width="72" height="14" rx="6" fill="#1b4fa0"/>
      <circle cx="60" cy="29" r="3.5" fill="#9fb3cf"/>
      <rect x="34" y="60" width="52" height="34" rx="4" fill="#fff" opacity=".92"/>
      <text x="60" y="75" text-anchor="middle" font-size="10" font-weight="800" fill="#1b4fa0" font-family="sans-serif">LiFePO4</text>
      <text x="60" y="88" text-anchor="middle" font-size="9" font-weight="700" fill="#5b6b82" font-family="sans-serif">3.2V</text></svg>`,
    cellCylinder: () => `<svg viewBox="0 0 140 140">${[22, 56, 90].map((x, i) => `
      <rect x="${x}" y="26" width="28" height="98" rx="7" fill="${["#2465c7", "#16325c", "#1f8f5a"][i]}"/>
      <ellipse cx="${x + 14}" cy="28" rx="14" ry="5" fill="#c9d4e3"/><rect x="${x + 9}" y="20" width="10" height="7" rx="2" fill="#9fb3cf"/>
      <rect x="${x}" y="64" width="28" height="18" fill="#fff" opacity=".25"/>`).join("")}</svg>`,
    charger: () => `<svg viewBox="0 0 140 140"><rect x="14" y="34" width="84" height="64" rx="9" fill="#16325c"/>
      <path d="M26 46v40M34 46v40" stroke="#0a1a31" stroke-width="4" stroke-linecap="round"/>
      <rect x="46" y="46" width="40" height="18" rx="3" fill="#0a1a31"/>
      <text x="66" y="59" text-anchor="middle" font-size="10" font-weight="800" fill="#5cf0a6" font-family="sans-serif">CHG</text>
      <circle cx="52" cy="78" r="3.5" fill="#16c06b"/><circle cx="64" cy="78" r="3.5" fill="#ffb020"/><circle cx="76" cy="78" r="3.5" fill="#e5334b"/>
      <path d="M98 62c18 0 22 10 22 26v20" stroke="#5b6b82" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="110" y="106" width="20" height="16" rx="3" fill="#2a3a52"/><path d="M115 122v6M125 122v6" stroke="#9fb3cf" stroke-width="3"/>
      <rect x="20" y="98" width="12" height="5" rx="2" fill="#5b6b82"/><rect x="80" y="98" width="12" height="5" rx="2" fill="#5b6b82"/></svg>`,
    frontLoad: () => `<svg viewBox="0 0 120 140"><rect x="16" y="8" width="88" height="124" rx="10" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <path d="M16 32h88" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="24" y="15" width="30" height="10" rx="2" fill="#0a1a31"/><circle cx="66" cy="20" r="2.2" fill="#16c06b"/>
      <circle cx="92" cy="20" r="6" fill="#dde4ee" stroke="#9fb3cf" stroke-width="1.5"/>
      <circle cx="60" cy="80" r="33" fill="#dde4ee" stroke="#9fb3cf" stroke-width="3"/><circle cx="60" cy="80" r="24" fill="#16325c"/>
      <path d="M41 86c8 7 30 7 38 0" stroke="#5aa9f0" stroke-width="3" fill="none"/>
      <path d="M46 70a17 17 0 0 1 10-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>
      <rect x="24" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="84" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    topLoad: () => `<svg viewBox="0 0 120 140"><rect x="16" y="34" width="88" height="98" rx="10" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="16" y="12" width="88" height="26" rx="8" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="26" y="19" width="32" height="11" rx="2" fill="#0a1a31"/><circle cx="74" cy="25" r="2.5" fill="#16c06b"/><circle cx="90" cy="25" r="6" fill="#dde4ee" stroke="#9fb3cf" stroke-width="1.5"/>
      <rect x="24" y="44" width="72" height="38" rx="8" fill="#dde4ee" stroke="#9fb3cf" stroke-width="2"/>
      <ellipse cx="60" cy="63" rx="25" ry="11" fill="#16325c"/><path d="M42 64c6 5 30 5 36 0" stroke="#5aa9f0" stroke-width="2.5" fill="none"/>
      <rect x="48" y="90" width="24" height="5" rx="2.5" fill="#c9d4e3"/>
      <rect x="24" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="84" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    semiAuto: () => `<svg viewBox="0 0 140 140"><rect x="10" y="36" width="120" height="94" rx="10" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="10" y="16" width="120" height="24" rx="8" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <circle cx="28" cy="28" r="5.5" fill="#9fb3cf"/><circle cx="46" cy="28" r="5.5" fill="#9fb3cf"/><circle cx="96" cy="28" r="5.5" fill="#9fb3cf"/><circle cx="114" cy="28" r="5.5" fill="#9fb3cf"/>
      <rect x="18" y="46" width="64" height="34" rx="6" fill="#5aa9f0" opacity=".85"/><rect x="88" y="46" width="34" height="34" rx="6" fill="#dde4ee" stroke="#9fb3cf" stroke-width="2"/>
      <rect x="40" y="96" width="60" height="6" rx="3" fill="#dde4ee"/>
      <rect x="20" y="130" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="108" y="130" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    fridgeSingle: () => `<svg viewBox="0 0 120 140"><rect x="28" y="6" width="64" height="126" rx="10" fill="#dfe6f0" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="80" y="38" width="5" height="40" rx="2.5" fill="#9fb3cf"/><rect x="38" y="18" width="20" height="6" rx="3" fill="#16325c" opacity=".25"/>
      <rect x="34" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="74" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    fridgeDouble: () => `<svg viewBox="0 0 120 140"><rect x="28" y="4" width="64" height="128" rx="10" fill="#dfe6f0" stroke="#c0cbdb" stroke-width="2"/>
      <path d="M28 46h64" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="80" y="18" width="5" height="20" rx="2.5" fill="#9fb3cf"/><rect x="80" y="56" width="5" height="40" rx="2.5" fill="#9fb3cf"/>
      <rect x="38" y="60" width="18" height="6" rx="3" fill="#16325c" opacity=".25"/>
      <rect x="34" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="74" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    fridgeBottom: () => `<svg viewBox="0 0 120 140"><rect x="28" y="4" width="64" height="128" rx="10" fill="#dfe6f0" stroke="#c0cbdb" stroke-width="2"/>
      <path d="M28 88h64" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="80" y="30" width="5" height="40" rx="2.5" fill="#9fb3cf"/><rect x="44" y="98" width="32" height="5" rx="2.5" fill="#9fb3cf"/>
      <rect x="34" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="74" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    fridgeSide: () => `<svg viewBox="0 0 140 140"><rect x="14" y="4" width="112" height="128" rx="10" fill="#dfe6f0" stroke="#c0cbdb" stroke-width="2"/>
      <path d="M70 4v128" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="60" y="34" width="5" height="50" rx="2.5" fill="#9fb3cf"/><rect x="75" y="34" width="5" height="50" rx="2.5" fill="#9fb3cf"/>
      <rect x="26" y="30" width="24" height="34" rx="4" fill="#16325c" opacity=".85"/><rect x="31" y="36" width="14" height="8" rx="1.5" fill="#5aa9f0"/>
      <rect x="20" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="108" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    fridgeFrench: () => `<svg viewBox="0 0 140 140"><rect x="14" y="4" width="112" height="128" rx="10" fill="#dfe6f0" stroke="#c0cbdb" stroke-width="2"/>
      <path d="M70 4v80M14 84h112" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="60" y="22" width="5" height="44" rx="2.5" fill="#9fb3cf"/><rect x="75" y="22" width="5" height="44" rx="2.5" fill="#9fb3cf"/>
      <rect x="50" y="94" width="40" height="5" rx="2.5" fill="#9fb3cf"/>
      <rect x="20" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/><rect x="108" y="132" width="12" height="5" rx="2" fill="#9fb3cf"/></svg>`,
    cassetteAc: () => `<svg viewBox="0 0 140 140"><rect x="14" y="14" width="112" height="112" rx="14" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="42" y="42" width="56" height="56" rx="6" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <path d="M50 54h40M50 64h40M50 74h40M50 84h40" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="40" y="24" width="60" height="8" rx="4" fill="#dde4ee"/><rect x="40" y="108" width="60" height="8" rx="4" fill="#dde4ee"/>
      <rect x="24" y="40" width="8" height="60" rx="4" fill="#dde4ee"/><rect x="108" y="40" width="8" height="60" rx="4" fill="#dde4ee"/>
      <circle cx="112" cy="118" r="3" fill="#16c06b"/></svg>`,
    towerAc: () => `<svg viewBox="0 0 120 140"><rect x="34" y="4" width="52" height="128" rx="14" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="44" y="18" width="32" height="12" rx="3" fill="#0a1a31"/><text x="60" y="27.5" text-anchor="middle" font-size="8" font-weight="700" fill="#5cf0a6" font-family="sans-serif">24°</text>
      <path d="M46 44v62M54 44v62M62 44v62M70 44v62" stroke="#dde4ee" stroke-width="3" stroke-linecap="round"/>
      <rect x="40" y="132" width="40" height="5" rx="2.5" fill="#9fb3cf"/></svg>`,
    portableAc: () => `<svg viewBox="0 0 140 140"><rect x="30" y="18" width="64" height="102" rx="12" fill="#fff" stroke="#c9d4e3" stroke-width="2"/>
      <rect x="40" y="28" width="44" height="22" rx="4" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="1.5"/><path d="M44 36h36M44 42h36" stroke="#c0cbdb" stroke-width="2"/>
      <rect x="50" y="60" width="24" height="10" rx="2" fill="#0a1a31"/><circle cx="62" cy="88" r="12" fill="#f1f4f9" stroke="#c9d4e3" stroke-width="2"/>
      <path d="M94 60h12c12 0 14 10 14 22v38" stroke="#9fb3cf" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="124" r="5" fill="#5b6b82"/><circle cx="82" cy="124" r="5" fill="#5b6b82"/></svg>`,
  };

  const art = (name) => (ART[name] || ART.tubular)();

  // Which drawing a product gets when it has no photo: its own `art`, then its subcategory, then its category.
  const SUB_ART = [
    [/front load|washer dryer|dryer|twin/i, "frontLoad"], [/top load/i, "topLoad"], [/semi/i, "semiAuto"],
    [/side by side/i, "fridgeSide"], [/french|multi door/i, "fridgeFrench"], [/bottom freezer/i, "fridgeBottom"],
    [/double door|convertible/i, "fridgeDouble"], [/single door|mini/i, "fridgeSingle"],
    [/window/i, "windowAc"], [/cassette|ductable/i, "cassetteAc"], [/tower|floor/i, "towerAc"], [/portable/i, "portableAc"], [/split/i, "ac"],
    [/lfp cell|prismatic/i, "cellPrismatic"], [/nmc|cylind/i, "cellCylinder"], [/ess|inverter battery|lithium solar/i, "ess"],
    [/battery pack|ev battery/i, "pack"], [/hybrid|solar inverter|off-grid|grid-tie/i, "solarInverter"], [/charger/i, "charger"],
  ];
  const CAT_ART = {
    batteries: "pack", inverters: "solarInverter", chargers: "charger", "solar-panels": "solar", stabilizers: "stabilizer",
    "electric-scooters": "scooter", ac: "ac", refrigerators: "fridgeDouble", "washing-machines": "frontLoad",
  };
  const VIGHYA_ART = { pack: "vighyaPack", ess: "vighyaEss" }; // our own lithium packs get the Vighya-labelled drawing
  const artFor = (p) => {
    const a = p.art || (SUB_ART.find(([re]) => re.test(p.sub)) || [])[1] || CAT_ART[p.cat] || "tubular";
    return p.brand === "Vighya" && VIGHYA_ART[a] ? VIGHYA_ART[a] : a;
  };

  /* ---------- Products: config.js products + data/<category>.js catalogue ---------- */
  const brandOf = (p) => p.brand || (/^vighya\b/i.test(p.name) ? "Vighya" : "");
  const fromConfig = (p, c) => ({
    id: p.id || slug(p.name), cat: c.id, sub: p.type, name: p.name, brand: brandOf(p), model: p.model || "",
    tagline: p.tagline || "", bullets: p.specs || [], groups: null, image: p.image || "", art: p.art || "", tag: p.tag || "", price: p.price || "",
  });
  const fromData = (p, c) => ({
    id: p.id, cat: c.id, sub: p.sub, name: p.name, brand: p.brand || "", model: p.model || "",
    tagline: "", bullets: p.hl || [], groups: p.specs || null, image: p.image || "", art: p.art || "", tag: p.tag || "", price: "",
  });

  const ix = (c) => IDX[c.id] || { count: 0, subcats: {}, brands: {}, featured: [] };
  const countOf = (c) => c.products.length + ix(c).count;
  // Subcategories in display order (config `types` first), with product counts; empty ones are left out.
  const subsOf = (c) => {
    const counts = new Map();
    const add = (s, n) => s && counts.set(s, (counts.get(s) || 0) + n);
    c.types.forEach((t) => add(t, 0));
    c.products.forEach((p) => add(p.type, 1));
    Object.entries(ix(c).subcats).forEach(([s, n]) => add(s, n));
    return [...counts].filter(([, n]) => n > 0).map(([name, count]) => ({ name, count }));
  };

  // Same ?v= as this page's own script tag, so a site update never mixes new pages with cached old data
  const ASSET_V = ((document.currentScript && document.currentScript.src.match(/\?v=\w+/)) || [""])[0];
  const loading = {};
  const loadData = (c) => {
    if (!IDX[c.id]) return Promise.resolve();
    if (!loading[c.id]) loading[c.id] = new Promise((done) => {
      const s = document.createElement("script");
      s.src = `data/${c.id}.js${ASSET_V}`;
      s.onload = done;
      s.onerror = () => { console.error(`Could not load data/${c.id}.js`); done(); };
      document.head.append(s);
    });
    return loading[c.id];
  };
  const productsOf = (c) => loadData(c).then(() =>
    c.products.map((p) => fromConfig(p, c)).concat(((window.CATALOG || {})[c.id] || []).map((p) => fromData(p, c))));

  /* ---------- Shared header / footer ---------- */
  const navLinks = [
    ["Products", `${home}#categories`],
    ["Backup Calculator", `${home}#calculator`],
    ["Services", `${home}#services`],
    ["Visit Us", `${home}#visit`],
  ];
  const logo = (light) => `
    <a href="${home || "#top"}" class="logo${light ? " logo--light" : ""}" aria-label="Vighya Trading home">
      <span class="logo__mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 4h7l4.5 10L11 20z" fill="#5b4fd6"/><path d="M15 4h7l-8.5 16-2-5z" fill="#e5334b"/></svg></span>
      <span class="logo__text">Vighya <b>Trading</b></span>
    </a>`;

  const qs = new URLSearchParams(location.search);
  const currentCat = page === "home" ? null : qs.get("c");

  // "All" menu: categories on the left, the hovered/tapped category's types on the right (grouped where config says so)
  const megaSubs = (c) => {
    const subs = subsOf(c);
    const link = (s) => `<li><a href="${catUrl(c.id, s.name)}">${esc(s.name)}<small>${s.count}</small></a></li>`;
    if (!c.groups) return `<ul class="mega__subs">${subs.map(link).join("")}</ul>`;
    const used = new Set();
    const blocks = c.groups.map((g) => {
      const items = subs.filter((s) => g.types.includes(s.name));
      items.forEach((s) => used.add(s.name));
      return items.length ? `<p class="mega__group">${esc(g.name)}</p><ul class="mega__subs">${items.map(link).join("")}</ul>` : "";
    });
    const rest = subs.filter((s) => !used.has(s.name));
    if (rest.length) blocks.push(`<p class="mega__group">More</p><ul class="mega__subs">${rest.map(link).join("")}</ul>`);
    return blocks.join("");
  };
  const activeIdx = Math.max(0, C.categories.findIndex((c) => c.id === currentCat));
  const catbar = `
    <div class="catbar" id="catbar">
      <div class="container catbar__inner">
        <button type="button" class="catbar__all" id="megaBtn" aria-expanded="false" aria-controls="mega">${ico("menu")}<span>All</span>${ico("chevDown")}</button>
        <nav class="catbar__chips" aria-label="Categories">${C.categories.map((c) => `
          <a href="${catUrl(c.id)}" class="cat-chip${c.id === currentCat ? " is-active" : ""}"${c.id === currentCat ? ' aria-current="page"' : ""}>${catIco(c.icon)}<span>${esc(c.name)}</span></a>`).join("")}
        </nav>
      </div>
      <div class="mega" id="mega" hidden>
        <div class="mega__head">
          <button type="button" class="mega__back" id="megaBack">${ico("chevLeft")}All categories</button>
          <span class="mega__title">Shop by category</span>
          <button type="button" class="mega__close" id="megaClose" aria-label="Close menu">${ico("close")}</button>
        </div>
        <div class="mega__body">
          <ul class="mega__cats">${C.categories.map((c, i) => `
            <li><button type="button" class="mega__cat${i === activeIdx ? " is-active" : ""}" data-i="${i}">${catIco(c.icon)}<span>${esc(c.name)}</span>${ico("chevRight")}</button></li>`).join("")}
          </ul>
          ${C.categories.map((c, i) => `
          <div class="mega__pane" data-pane="${i}"${i === activeIdx ? "" : " hidden"}>
            <div class="mega__pane-head"><h3>Types of ${esc(c.name)}</h3><a class="mega__all" href="${catUrl(c.id)}">View all ${countOf(c)}</a></div>
            ${megaSubs(c)}
          </div>`).join("")}
        </div>
      </div>
    </div>
    <div class="mega-backdrop" id="megaBackdrop" hidden></div>`;

  $("#site-header").outerHTML = `
    <div class="topbar">
      <div class="container topbar__inner">
        <span class="topbar__hours">${C.hours.map(([d, t]) => `${esc(d)}: ${esc(t)}`).join("  ·  ")}</span>
        <a class="topbar__phone" data-phone-link>${ico("phone")}<span data-phone></span></a>
      </div>
    </div>
    <header class="header" id="top">
      <div class="container header__inner">
        ${logo(false)}
        <nav class="nav" id="nav" aria-label="Main">
          ${navLinks.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}
        </nav>
        <a class="btn btn--primary btn--sm header__cta" data-phone-link>${ico("phone")}Call Now</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
      </div>
    </header>
    ${catbar}`;

  $("#site-footer").outerHTML = `
    <footer class="footer">
      <div class="container footer__inner">
        <div>
          ${logo(true)}
          <p class="footer__tag">Vighya batteries, inverters, chargers, solar panels, stabilizers, electric scooters, ACs, refrigerators and washing machines, all under one roof.</p>
        </div>
        <div class="footer__links">
          <span class="footer__h">Categories</span>
          ${C.categories.map((c) => `<a href="${catUrl(c.id)}">${esc(c.name)}</a>`).join("")}
        </div>
        <div class="footer__contact">
          <span class="footer__h">Contact</span>
          <a class="footer__phone" data-phone-link><span data-phone></span></a>
          <a data-map-link target="_blank" rel="noopener"><span data-address></span></a>
          <span>${C.hours.map(([d, t]) => `${esc(d)}: ${esc(t)}`).join("<br>")}</span>
        </div>
      </div>
      <div class="container footer__bottom">
        <span>© ${new Date().getFullYear()} Vighya Trading. All rights reserved.</span>
        <span>Product names, photos and trademarks belong to their makers. Drawings and stock photos are for illustration.</span>
      </div>
    </footer>
    <div class="mobile-bar">
      <a class="mobile-bar__btn" data-phone-link>${ico("phone")}Call</a>
      <a class="mobile-bar__btn mobile-bar__btn--wa" data-wa-link data-wa-text="Hi Vighya Trading, I have an enquiry.">${ico("wa")}WhatsApp</a>
      <a class="mobile-bar__btn" data-map-link target="_blank" rel="noopener">${ico("pin")}Directions</a>
    </div>`;

  initMega();

  /* ---------- Product card ---------- */
  const askText = (p) => `Hi ${C.businessName}, please share the price and details for: ${p.name}${p.model && !p.name.includes(p.model) ? ` (model ${p.model})` : ""}`;
  const card = (p) => {
    const media = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />` : art(artFor(p));
    const line = p.tagline || [p.brand, p.model].filter(Boolean).join(" · ");
    return `
      <article class="product" data-type="${esc(p.sub)}">
        <div class="product__media product__media--${p.cat}${mediaClass("product__media", p.image)}">
          ${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ""}
          ${media}
        </div>
        <div class="product__body">
          <span class="product__cat">${esc(p.sub)}</span>
          <h3><a class="product__link" href="${prodUrl(p)}">${esc(p.name)}</a></h3>
          ${line ? `<p class="muted">${esc(line)}</p>` : ""}
          <ul class="product__specs">${p.bullets.slice(0, 4).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="product__foot">
            <span class="product__price">${p.price ? esc(p.price) : "Ask for best price"}</span>
            <a class="btn btn--whatsapp btn--sm" href="${waUrl(askText(p))}" target="_blank" rel="noopener">${ico("wa")}Get price</a>
          </div>
        </div>
      </article>`;
  };
  // images/products/ holds each brand model's own photo (shown whole, on white); vighya-* and electric-scooters are the shop's own photos;
  // every other image is a stock photo, captioned as representative on the product page.
  const isModelPhoto = (src) => /^images\/products\//.test(src);
  const isExactPhoto = (src) => isModelPhoto(src) || /^images\/(vighya-|electric-scooters\.)/.test(src);
  const mediaClass = (base, src) => (!src ? "" : isModelPhoto(src) ? ` ${base}--cutout` : ` ${base}--photo`);
  const coverCut = (c) => (c.cover && isModelPhoto(c.cover) ? " media-cutout" : ""); // a brand's product photo: show it whole
  const coverArt = (c) => (c.products[0] ? art(c.products[0].art) : art(CAT_ART[c.id]));

  /* ---------- Home page ---------- */
  if (page === "home") {
    $("#typesStrip").innerHTML = C.productTypes.map((t) => `<li>${esc(t)}</li>`).join("");

    $("#catRail").innerHTML = C.categories.map((c) => `
      <a class="rail-item" href="${catUrl(c.id)}">
        <span class="rail-item__media product__media--${c.id}${c.cover ? " rail-item__media--photo" : ""}${coverCut(c)}">
          ${c.cover ? `<img src="${esc(c.cover)}" alt="" loading="lazy" />` : coverArt(c)}
        </span>
        <span class="rail-item__name">${esc(c.name)}</span>
      </a>`).join("");

    $("#categoryTiles").innerHTML = C.categories.map((c) => {
      const subs = subsOf(c).map((s) => s.name);
      return `
      <a class="cat-tile" href="${catUrl(c.id)}">
        <div class="cat-tile__media product__media--${c.id}${c.cover ? " cat-tile__media--photo" : ""}${coverCut(c)}">
          ${c.cover ? `<img src="${esc(c.cover)}" alt="" loading="lazy" />` : coverArt(c)}
        </div>
        <div class="cat-tile__body">
          <span class="cat-tile__ico">${catIco(c.icon)}</span>
          <h3>${esc(c.name)}</h3>
          <p>${subs.slice(0, 3).map(esc).join(" · ")}${subs.length > 3 ? " & more" : ""}</p>
          <span class="cat-tile__go">View ${countOf(c)} products ${ico("arrow")}</span>
        </div>
      </a>`;
    }).join("");

    $("#featured").innerHTML = C.categories.map((c) => {
      const items = c.products.map((p) => fromConfig(p, c)).concat(ix(c).featured.map((p) => fromData(p, c))).slice(0, 4);
      return items.length ? `
      <div class="row">
        <div class="row__head">
          <h3>${catIco(c.icon)}${esc(c.name)}</h3>
          <a class="row__all" href="${catUrl(c.id)}">See all ${ico("arrow")}</a>
        </div>
        <div class="row__scroll">${items.map(card).join("")}</div>
      </div>` : "";
    }).join("");

    $("#hoursTable").innerHTML = C.hours.map(([d, t]) => `<tr><th>${esc(d)}</th><td>${esc(t)}</td></tr>`).join("");
    $("#mapFrame").src = C.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery || C.address)}&output=embed`;
    initCalculator();
    initEnquiry();
  }

  /* ---------- Category page ---------- */
  if (page === "category") {
    const cat = C.categories.find((c) => c.id === currentCat);
    if (!cat) { location.replace("./#categories"); return; }

    document.title = `${cat.name} | Vighya Trading, Bhiwani`;
    $('meta[name="description"]').content = `${cat.blurb} Vighya Trading, Village Nangal, Bhiwani.`;
    $("#catName").textContent = cat.name;
    $("#crumbName").textContent = cat.name;
    $("#catBlurb").textContent = cat.blurb;
    const subs = subsOf(cat);
    $("#catCount").textContent = `${countOf(cat)} products · ${subs.length} types`;
    $("#catIcon").innerHTML = catIco(cat.icon);
    $("#catAsk").dataset.waText = `Hi ${C.businessName}, I'm interested in ${cat.name}. Please share models and prices.`;
    const visual = $("#catVisual");
    visual.classList.add(`product__media--${cat.id}`);
    visual.innerHTML = cat.cover ? `<img src="${esc(cat.cover)}" alt="${esc(cat.name)} at Vighya Trading" />` : coverArt(cat);
    if (cat.cover) visual.classList.add("cat-hero__visual--photo");
    if (coverCut(cat)) visual.classList.add("media-cutout");

    const others = C.categories.filter((c) => c.id !== cat.id);
    $("#otherCats").innerHTML = others.map((c) => `<a class="cat-chip" href="${catUrl(c.id)}">${catIco(c.icon)}<span>${esc(c.name)}</span></a>`).join("");

    const PAGE_SIZE = 24;
    const state = { sub: qs.get("s") || "", brand: qs.get("b") || "", q: "", shown: PAGE_SIZE };
    if (!subs.some((s) => s.name === state.sub)) state.sub = "";
    const grid = $("#productGrid");
    grid.innerHTML = `<p class="grid-note">Loading products…</p>`;

    productsOf(cat).then((all) => {
      all.forEach((p) => (p.hay = [p.name, p.brand, p.model, p.sub, ...p.bullets].join(" ").toLowerCase()));
      const total = all.length;
      $("#typeTabs").innerHTML = [`<button class="tab" role="tab" data-filter="">All <small>${total}</small></button>`]
        .concat(subs.map((s) => `<button class="tab" role="tab" data-filter="${esc(s.name)}">${esc(s.name)} <small>${s.count}</small></button>`))
        .join("");
      const tabs = $$("#typeTabs .tab");
      const brandBox = $("#brandChips");
      const search = $("#catSearch");
      const count = $("#resultCount");
      const more = $("#showMore");

      const render = () => {
        tabs.forEach((t) => { const on = t.dataset.filter === state.sub; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", on); });
        const inSub = all.filter((p) => !state.sub || p.sub === state.sub);
        const brands = [...new Set(inSub.map((p) => p.brand).filter(Boolean))].sort();
        if (!brands.includes(state.brand)) state.brand = "";
        brandBox.hidden = brands.length < 2;
        brandBox.innerHTML = brands.length < 2 ? "" : `<span class="filter-label">Brand</span>` + ["", ...brands].map((b) =>
          `<button type="button" class="chip${b === state.brand ? " is-active" : ""}" data-brand="${esc(b)}">${b ? esc(b) : "All brands"}</button>`).join("");
        const q = state.q.trim().toLowerCase();
        const list = inSub.filter((p) => (!state.brand || p.brand === state.brand) && (!q || q.split(/\s+/).every((w) => p.hay.includes(w))));
        count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
        grid.innerHTML = list.length ? list.slice(0, state.shown).map(card).join("")
          : `<p class="grid-note">No products match. <button type="button" class="link-btn" id="clearFilters">Clear filters</button></p>`;
        more.hidden = list.length <= state.shown;
        more.textContent = `Show more (${list.length - state.shown} more)`;
        const u = new URL(location.href);
        ["s", "b"].forEach((k) => u.searchParams.delete(k));
        if (state.sub) u.searchParams.set("s", state.sub);
        if (state.brand) u.searchParams.set("b", state.brand);
        history.replaceState(null, "", u);
      };

      tabs.forEach((tab) => tab.addEventListener("click", () => { state.sub = tab.dataset.filter; state.shown = PAGE_SIZE; render(); }));
      brandBox.addEventListener("click", (e) => {
        const b = e.target.closest("[data-brand]");
        if (b) { state.brand = b.dataset.brand; state.shown = PAGE_SIZE; render(); }
      });
      search.addEventListener("input", () => { state.q = search.value; state.shown = PAGE_SIZE; render(); });
      more.addEventListener("click", () => { state.shown += PAGE_SIZE; render(); });
      grid.addEventListener("click", (e) => {
        if (e.target.id !== "clearFilters") return;
        Object.assign(state, { sub: "", brand: "", q: "", shown: PAGE_SIZE });
        search.value = "";
        render();
      });
      render();
    });
  }

  /* ---------- Product page ---------- */
  if (page === "product") {
    const cat = C.categories.find((c) => c.id === currentCat);
    if (!cat) { location.replace("./#categories"); return; }
    productsOf(cat).then((all) => {
      const p = all.find((x) => x.id === qs.get("id"));
      if (!p) { location.replace(catUrl(cat.id)); return; }

      document.title = `${p.name} | Vighya Trading, Bhiwani`;
      $('meta[name="description"]').content = `${p.name}${p.model ? ` (${p.model})` : ""}: specifications. Ask Vighya Trading, Village Nangal, Bhiwani for today's price.`;
      const related = all.filter((x) => x.id !== p.id && x.sub === p.sub).slice(0, 4);
      const specs = p.groups && p.groups.length
        ? p.groups.map(([g, rows]) => `
          <section class="spec">
            <h3>${esc(g)}</h3>
            <dl>${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          </section>`).join("")
        : `<section class="spec"><h3>Key features</h3><ul class="product__specs">${p.bullets.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>`;

      $("#pdp").innerHTML = `
        <nav class="crumbs" aria-label="Breadcrumb"><a href="./">Home</a><span>/</span><a href="${catUrl(cat.id)}">${esc(cat.name)}</a><span>/</span><a href="${catUrl(cat.id, p.sub)}">${esc(p.sub)}</a><span>/</span><span>${esc(p.model || p.name)}</span></nav>
        <div class="pdp">
          <figure class="pdp__media product__media--${cat.id}${mediaClass("pdp__media", p.image)}">
            ${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ""}
            ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" />` : art(artFor(p))}
            ${!p.image || !isExactPhoto(p.image) ? `<figcaption>${p.image ? "Representative photo" : "Illustration"}, not the exact product</figcaption>` : ""}
          </figure>
          <div class="pdp__info">
            <span class="product__cat">${esc(p.sub)}</span>
            <h1>${esc(p.name)}</h1>
            <p class="pdp__meta">${[p.brand && `Brand: <b>${esc(p.brand)}</b>`, p.model && `Model: <b>${esc(p.model)}</b>`].filter(Boolean).join("<span>·</span>")}</p>
            ${p.tagline ? `<p class="muted">${esc(p.tagline)}</p>` : ""}
            <ul class="pdp__chips">${p.bullets.slice(0, 6).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
            <div class="hero__ctas">
              <a class="btn btn--whatsapp" data-wa-link data-wa-text="${esc(askText(p))}">${ico("wa")}Ask for price on WhatsApp</a>
              <a class="btn btn--outline" data-phone-link>${ico("phone")}<span data-phone></span></a>
            </div>
            <p class="pdp__note">Prices change with offers, so message or call us for today's best price. Visit us in Village Nangal, Bhiwani to see it in person.</p>
          </div>
        </div>
        <div class="specs">
          <h2>Technical specifications</h2>
          <div class="specs__grid">${specs}</div>
          ${p.groups ? `<p class="specs__fine">Specifications are as published by the maker and may change. Please confirm with us before you buy.</p>` : ""}
        </div>
        ${related.length ? `
        <div class="row pdp__related">
          <div class="row__head"><h3>${catIco(cat.icon)}More ${esc(p.sub)}</h3><a class="row__all" href="${catUrl(cat.id, p.sub)}">See all ${ico("arrow")}</a></div>
          <div class="row__scroll">${related.map(card).join("")}</div>
        </div>` : ""}`;
      bindContacts($("#pdp"));
    });
  }

  /* ---------- Contact details (after all markup exists) ---------- */
  function bindContacts(root = document) {
    $$("[data-phone]", root).forEach((el) => (el.textContent = C.phoneDisplay));
    $$("[data-phone-link]", root).forEach((el) => (el.href = `tel:${C.phoneDial}`));
    $$("[data-address]", root).forEach((el) => (el.textContent = C.address));
    $$("[data-map-link]", root).forEach((el) => (el.href = mapUrl));
    $$("[data-wa-link]", root).forEach((el) => {
      if (!el.href) el.href = waUrl(el.dataset.waText || `Hi ${C.businessName}, I have an enquiry.`);
      el.target = "_blank";
      el.rel = "noopener";
    });
    if (C.email) {
      $$("[data-email]", root).forEach((el) => (el.textContent = C.email));
      $$("[data-email-link]", root).forEach((el) => (el.href = `mailto:${C.email}`));
      $$("[data-email-wrap]", root).forEach((el) => (el.hidden = false));
    }
  }
  bindContacts();

  /* ---------- Mobile nav ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- "All" categories menu ---------- */
  function initMega() {
    const btn = $("#megaBtn");
    const mega = $("#mega");
    const backdrop = $("#megaBackdrop");
    const cats = $$(".mega__cat", mega);
    const panes = $$(".mega__pane", mega);
    const small = matchMedia("(max-width: 760px)");

    const show = (i) => {
      cats.forEach((b) => b.classList.toggle("is-active", b.dataset.i === String(i)));
      panes.forEach((p) => (p.hidden = p.dataset.pane !== String(i)));
    };
    const setOpen = (open) => {
      mega.hidden = !open;
      backdrop.hidden = !open;
      btn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("mega-open", open && small.matches);
      if (!open) mega.classList.remove("is-sub");
    };
    btn.addEventListener("click", () => setOpen(mega.hidden));
    cats.forEach((b) => {
      b.addEventListener("mouseenter", () => { if (!small.matches) show(b.dataset.i); });
      b.addEventListener("focus", () => { if (!small.matches) show(b.dataset.i); });
      b.addEventListener("click", () => { show(b.dataset.i); mega.classList.add("is-sub"); });
    });
    $("#megaBack").addEventListener("click", () => mega.classList.remove("is-sub"));
    $("#megaClose").addEventListener("click", () => setOpen(false));
    backdrop.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mega.hidden) { setOpen(false); btn.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (!mega.hidden && !e.target.closest("#catbar")) setOpen(false);
    });
  }

  /* ---------- Backup calculator ---------- */
  function initCalculator() {
    const APPLIANCES = [
      { name: "Ceiling fan", w: 75, qty: 2 },
      { name: "LED bulb", w: 10, qty: 4 },
      { name: "Tube light", w: 20, qty: 1 },
      { name: "LED TV", w: 80, qty: 1 },
      { name: "Wi-Fi router", w: 12, qty: 1 },
      { name: "Laptop", w: 65, qty: 0 },
      { name: "Refrigerator", w: 200, qty: 0 },
      { name: "Air cooler", w: 180, qty: 0 },
    ];
    const INVERTERS = [700, 900, 1100, 1500, 2000, 2500, 3500, 5000];
    const BATTERY_AH = [100, 120, 135, 150, 165, 180, 200, 220, 230];
    const EFFICIENCY = 0.75; // inverter losses + safe depth of discharge

    const wrap = $("#appliances");
    wrap.innerHTML = APPLIANCES.map((a, i) => `
      <div class="appl">
        <span class="appl__name">${a.name}<small>${a.w} W</small></span>
        <div class="stepper">
          <button type="button" data-i="${i}" data-d="-1" aria-label="Fewer ${a.name}">−</button>
          <output id="q${i}">${a.qty}</output>
          <button type="button" data-i="${i}" data-d="1" aria-label="More ${a.name}">+</button>
        </div>
      </div>`).join("");

    wrap.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-i]");
      if (!b) return;
      const a = APPLIANCES[b.dataset.i];
      a.qty = Math.max(0, Math.min(20, a.qty + Number(b.dataset.d)));
      $(`#q${b.dataset.i}`).textContent = a.qty;
      calc();
    });
    const hours = $("#hours");
    hours.addEventListener("input", calc);

    function calc() {
      const load = APPLIANCES.reduce((s, a) => s + a.w * a.qty, 0);
      const hrs = Number(hours.value);
      $("#hoursOut").textContent = hrs;
      $("#loadOut").textContent = load;

      const waBtn = $("#calcWa");
      if (!load) {
        $("#recInverter").textContent = "—";
        $("#recBattery").textContent = "—";
        $("#recNote").textContent = "Add some appliances to see a recommendation.";
        waBtn.href = waUrl(`Hi ${C.businessName}, I need help choosing an inverter and battery.`);
        return;
      }

      const va = load / 0.8;
      const inverter = INVERTERS.find((v) => v >= va) || null;
      const batteries = !inverter ? 4 : inverter <= 1100 ? 1 : inverter <= 2500 ? 2 : 4;
      const ah = (load * hrs) / (12 * batteries * EFFICIENCY);
      const single = BATTERY_AH.find((v) => v >= ah);

      $("#recInverter").textContent = inverter ? `${inverter} VA` : "5 kVA+";
      let battText, note;
      if (single) {
        battText = `${batteries} × ${single}Ah`;
        note = `${batteries > 1 ? `${batteries} batteries of` : "One battery of"} ${single}Ah (tubular recommended) should give about ${hrs} hour${hrs > 1 ? "s" : ""} on this load.`;
      } else {
        battText = `${batteries} × 220Ah+`;
        note = "That's a lot of backup for this load. Talk to us about a bigger system, lithium batteries or solar.";
      }
      $("#recBattery").textContent = battText;
      $("#recNote").textContent = note;

      const list = APPLIANCES.filter((a) => a.qty).map((a) => `${a.qty} × ${a.name}`).join(", ");
      waBtn.href = waUrl(
        `Hi ${C.businessName}, I used your backup calculator.\nAppliances: ${list}\nTotal load: ${load} W\nBackup needed: ${hrs} hours\nSuggested: ${inverter ? inverter + " VA" : "5 kVA+"} inverter with ${battText} battery.\nPlease share options and prices.`
      );
    }
    calc();
  }

  /* ---------- Enquiry form → WhatsApp ---------- */
  function initEnquiry() {
    const sel = $("#enquiryForm select[name=need]");
    sel.innerHTML = C.categories.map((c) => `<option>${esc(c.name)}</option>`).join("") +
      "<option>Old battery exchange</option><option>Service / water top-up</option><option>Warranty claim</option>";
    $("#enquiryForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const text = `Hi ${C.businessName}, I'm ${f.get("name")}.\nLooking for: ${f.get("need")}` + (f.get("msg") ? `\n${f.get("msg")}` : "");
      window.open(waUrl(text), "_blank", "noopener");
    });
  }
})();
