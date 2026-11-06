(function () {
  const C = window.SITE_CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const page = document.body.dataset.page; // "home" | "category"
  const home = page === "home" ? "" : "./";
  const waUrl = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const mapUrl = C.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapQuery || C.address)}`;
  const catUrl = (id) => `category.html?c=${encodeURIComponent(id)}`;

  /* ---------- Icons ---------- */
  const ICON = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
    wa: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7a11.4 11.4 0 0 1-4.5-4c-.3-.5-1-1.5-1-2.8s.7-2 1-2.3a1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6a8.2 8.2 0 0 0 1.5 1.9 7.4 7.4 0 0 0 2.2 1.3c.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3a2.4 2.4 0 0 1-.2 1.3z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    arrow: '<path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/>',
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
  };
  const catIco = (n) => `<svg class="cat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICON[n] || CAT_ICON.battery}</svg>`;

  /* ---------- Product illustrations (used where there is no photo) ---------- */
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
  };
  const art = (name) => (ART[name] || ART.tubular)();

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
    </header>`;

  $("#site-footer").outerHTML = `
    <footer class="footer">
      <div class="container footer__inner">
        <div>
          ${logo(true)}
          <p class="footer__tag">Vighya batteries, inverters, solar panels, stabilizers, electric scooters and ACs, all under one roof.</p>
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
      </div>
    </footer>
    <div class="mobile-bar">
      <a class="mobile-bar__btn" data-phone-link>${ico("phone")}Call</a>
      <a class="mobile-bar__btn mobile-bar__btn--wa" data-wa-link data-wa-text="Hi Vighya Trading, I have an enquiry.">${ico("wa")}WhatsApp</a>
      <a class="mobile-bar__btn" data-map-link target="_blank" rel="noopener">${ico("pin")}Directions</a>
    </div>`;

  // Category strip (category pages only)
  const strip = $("#cat-strip");
  if (strip) {
    const current = new URLSearchParams(location.search).get("c");
    strip.innerHTML = `<div class="container cat-strip__inner">${C.categories.map((c) => `
      <a href="${catUrl(c.id)}" class="cat-chip${c.id === current ? " is-active" : ""}"${c.id === current ? ' aria-current="page"' : ""}>${catIco(c.icon)}<span>${esc(c.name)}</span></a>`).join("")}</div>`;
  }

  /* ---------- Product card ---------- */
  const card = (p, cat) => {
    const media = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />` : art(p.art);
    const msg = `Hi ${C.businessName}, please share the price and details for: ${p.name}`;
    return `
      <article class="product" data-type="${esc(p.type)}">
        <div class="product__media product__media--${cat.id}${p.image ? " product__media--photo" : ""}">
          ${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ""}
          ${media}
        </div>
        <div class="product__body">
          <span class="product__cat">${esc(p.type)}</span>
          <h3>${esc(p.name)}</h3>
          <p class="muted">${esc(p.tagline)}</p>
          <ul class="product__specs">${p.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="product__foot">
            <span class="product__price">${p.price ? esc(p.price) : "Ask for best price"}</span>
            <a class="btn btn--whatsapp btn--sm" href="${waUrl(msg)}" target="_blank" rel="noopener">${ico("wa")}Get price</a>
          </div>
        </div>
      </article>`;
  };

  /* ---------- Home page ---------- */
  if (page === "home") {
    $("#typesStrip").innerHTML = C.productTypes.map((t) => `<li>${esc(t)}</li>`).join("");

    $("#categoryTiles").innerHTML = C.categories.map((c) => `
      <a class="cat-tile" href="${catUrl(c.id)}">
        <div class="cat-tile__media product__media--${c.id}${c.cover ? " cat-tile__media--photo" : ""}">
          ${c.cover ? `<img src="${esc(c.cover)}" alt="" loading="lazy" />` : art(c.products[0].art)}
        </div>
        <div class="cat-tile__body">
          <span class="cat-tile__ico">${catIco(c.icon)}</span>
          <h3>${esc(c.name)}</h3>
          <p>${c.types.slice(0, 3).map(esc).join(" · ")}${c.types.length > 3 ? " & more" : ""}</p>
          <span class="cat-tile__go">View ${c.products.length} products ${ico("arrow")}</span>
        </div>
      </a>`).join("");

    $("#featured").innerHTML = C.categories.map((c) => `
      <div class="row">
        <div class="row__head">
          <h3>${catIco(c.icon)}${esc(c.name)}</h3>
          <a class="row__all" href="${catUrl(c.id)}">See all ${ico("arrow")}</a>
        </div>
        <div class="row__scroll">${c.products.slice(0, 4).map((p) => card(p, c)).join("")}</div>
      </div>`).join("");

    $("#hoursTable").innerHTML = C.hours.map(([d, t]) => `<tr><th>${esc(d)}</th><td>${esc(t)}</td></tr>`).join("");
    $("#mapFrame").src = C.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery || C.address)}&output=embed`;
    initCalculator();
    initEnquiry();
  }

  /* ---------- Category page ---------- */
  if (page === "category") {
    const id = new URLSearchParams(location.search).get("c");
    const cat = C.categories.find((c) => c.id === id);
    if (!cat) { location.replace("./#categories"); return; }

    document.title = `${cat.name} | Vighya Trading, Bhiwani`;
    $('meta[name="description"]').content = `${cat.blurb} Vighya Trading, Village Nangal, Bhiwani.`;
    $("#catName").textContent = cat.name;
    $("#crumbName").textContent = cat.name;
    $("#catBlurb").textContent = cat.blurb;
    $("#catCount").textContent = `${cat.products.length} products · ${cat.types.length} types`;
    $("#catIcon").innerHTML = catIco(cat.icon);
    $("#catAsk").dataset.waText = `Hi ${C.businessName}, I'm interested in ${cat.name}. Please share models and prices.`;
    const visual = $("#catVisual");
    visual.classList.add(`product__media--${cat.id}`);
    visual.innerHTML = cat.cover ? `<img src="${esc(cat.cover)}" alt="${esc(cat.name)} at Vighya Trading" />` : art(cat.products[0].art);
    if (cat.cover) visual.classList.add("cat-hero__visual--photo");

    const counts = Object.fromEntries(cat.types.map((t) => [t, cat.products.filter((p) => p.type === t).length]));
    $("#typeTabs").innerHTML = [`<button class="tab is-active" role="tab" aria-selected="true" data-filter="all">All <small>${cat.products.length}</small></button>`]
      .concat(cat.types.map((t) => `<button class="tab" role="tab" aria-selected="false" data-filter="${esc(t)}">${esc(t)} <small>${counts[t]}</small></button>`))
      .join("");
    const grid = $("#productGrid");
    grid.innerHTML = cat.products.map((p) => card(p, cat)).join("");

    $$("#typeTabs .tab").forEach((tab) => tab.addEventListener("click", () => {
      $$("#typeTabs .tab").forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const f = tab.dataset.filter;
      $$(".product", grid).forEach((el) => (el.hidden = f !== "all" && el.dataset.type !== f));
    }));

    const others = C.categories.filter((c) => c.id !== cat.id);
    $("#otherCats").innerHTML = others.map((c) => `<a class="cat-chip" href="${catUrl(c.id)}">${catIco(c.icon)}<span>${esc(c.name)}</span></a>`).join("");
  }

  /* ---------- Contact details (after all markup exists) ---------- */
  $$("[data-phone]").forEach((el) => (el.textContent = C.phoneDisplay));
  $$("[data-phone-link]").forEach((el) => (el.href = `tel:${C.phoneDial}`));
  $$("[data-address]").forEach((el) => (el.textContent = C.address));
  $$("[data-map-link]").forEach((el) => (el.href = mapUrl));
  $$("[data-wa-link]").forEach((el) => {
    if (!el.href) el.href = waUrl(el.dataset.waText || `Hi ${C.businessName}, I have an enquiry.`);
    el.target = "_blank";
    el.rel = "noopener";
  });
  if (C.email) {
    $$("[data-email]").forEach((el) => (el.textContent = C.email));
    $$("[data-email-link]").forEach((el) => (el.href = `mailto:${C.email}`));
    $$("[data-email-wrap]").forEach((el) => (el.hidden = false));
  }

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
