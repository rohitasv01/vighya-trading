(function () {
  const C = window.SITE_CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const waUrl = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const mapUrl = C.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.mapQuery || C.address)}`;

  /* ---------- Contact details ---------- */
  $$("[data-phone]").forEach((el) => (el.textContent = C.phoneDisplay));
  $$("[data-phone-link]").forEach((el) => (el.href = `tel:${C.phoneDial}`));
  $$("[data-address]").forEach((el) => (el.textContent = C.address));
  $$("[data-map-link]").forEach((el) => (el.href = mapUrl));
  $$("[data-wa-link]").forEach((el) => {
    el.href = waUrl(el.dataset.waText || `Hi ${C.businessName}, I have an enquiry.`);
    el.target = "_blank";
    el.rel = "noopener";
  });
  if (C.email) {
    $$("[data-email]").forEach((el) => (el.textContent = C.email));
    $$("[data-email-link]").forEach((el) => (el.href = `mailto:${C.email}`));
    $$("[data-email-wrap]").forEach((el) => (el.hidden = false));
  }

  $("#mapFrame").src = C.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery || C.address)}&output=embed`;

  $$("[data-hours-short]").forEach((el) => (el.textContent = C.hours.map(([d, t]) => `${d}: ${t}`).join("  ·  ")));
  $("#hoursTable").innerHTML = C.hours.map(([d, t]) => `<tr><th>${esc(d)}</th><td>${esc(t)}</td></tr>`).join("");
  $("#brandsList").innerHTML = C.brands.map((b) => `<li>${esc(b)}</li>`).join("");
  $("#year").textContent = new Date().getFullYear();

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

  /* ---------- Product illustrations (used until real photos are added) ---------- */
  const art = {
    tubular: (c) => `
      <svg viewBox="0 0 120 140"><rect x="34" y="8" width="14" height="12" rx="3" fill="#9fb3cf"/><rect x="72" y="8" width="14" height="12" rx="3" fill="#9fb3cf"/>
      <rect x="20" y="16" width="80" height="116" rx="12" fill="${c}"/><rect x="30" y="30" width="60" height="10" rx="5" fill="#fff" opacity=".25"/>
      <path d="M64 56 50 82h11l-4 24 17-32H63z" fill="#fff"/></svg>`,
    flat: (c) => `
      <svg viewBox="0 0 120 140"><rect x="28" y="38" width="14" height="12" rx="3" fill="#9fb3cf"/><rect x="78" y="38" width="14" height="12" rx="3" fill="#9fb3cf"/>
      <rect x="10" y="46" width="100" height="74" rx="12" fill="${c}"/><rect x="20" y="58" width="80" height="8" rx="4" fill="#fff" opacity=".25"/>
      <path d="M64 70 52 92h10l-3 18 14-26H62z" fill="#fff"/></svg>`,
    inverter: (c) => `
      <svg viewBox="0 0 120 140"><rect x="12" y="34" width="96" height="78" rx="12" fill="${c}"/>
      <rect x="24" y="46" width="44" height="24" rx="4" fill="#0a1a31"/><text x="46" y="63" text-anchor="middle" font-size="12" font-weight="700" fill="#5cf0a6" font-family="sans-serif">230V</text>
      <circle cx="88" cy="58" r="10" fill="#fff" opacity=".9"/><circle cx="88" cy="58" r="4" fill="${c}"/>
      <rect x="24" y="82" width="72" height="4" rx="2" fill="#fff" opacity=".3"/><rect x="24" y="92" width="72" height="4" rx="2" fill="#fff" opacity=".3"/>
      <rect x="20" y="112" width="12" height="6" rx="2" fill="#5b6b82"/><rect x="88" y="112" width="12" height="6" rx="2" fill="#5b6b82"/></svg>`,
    combo: (c) => `
      <svg viewBox="0 0 120 140"><rect x="6" y="56" width="58" height="50" rx="9" fill="#16325c"/>
      <rect x="14" y="64" width="26" height="14" rx="3" fill="#0a1a31"/><circle cx="52" cy="71" r="6" fill="#fff" opacity=".9"/>
      <rect x="76" y="22" width="9" height="9" rx="2" fill="#9fb3cf"/><rect x="98" y="22" width="9" height="9" rx="2" fill="#9fb3cf"/>
      <rect x="68" y="28" width="46" height="88" rx="9" fill="${c}"/><path d="M93 50 83 70h8l-3 17 12-23h-8z" fill="#fff"/>
      <rect x="4" y="116" width="112" height="8" rx="4" fill="#c9d4e3"/></svg>`,
  };
  const colors = { tubular: "#1f8f5a", flat: "#2465c7", inverter: "#16325c", combo: "#e08a00" };
  const labels = { tubular: "Tubular Battery", flat: "Flat Plate Battery", inverter: "Inverter", combo: "Combo" };

  const grid = $("#productGrid");
  grid.innerHTML = C.products.map((p) => {
    const media = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />`
      : art[p.category](colors[p.category]);
    const msg = `Hi ${C.businessName}, please share the price for: ${p.name}`;
    return `
      <article class="product" data-cat="${p.category}">
        <div class="product__media product__media--${p.category}">
          ${p.tag ? `<span class="product__tag">${esc(p.tag)}</span>` : ""}
          ${media}
        </div>
        <div class="product__body">
          <span class="product__cat">${labels[p.category]}</span>
          <h3>${esc(p.name)}</h3>
          <p class="muted">${esc(p.tagline)}</p>
          <ul class="product__specs">${p.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="product__foot">
            <span class="product__price">${p.price ? esc(p.price) : "Ask for best price"}</span>
            <a class="btn btn--whatsapp btn--sm" href="${waUrl(msg)}" target="_blank" rel="noopener">Get price</a>
          </div>
        </div>
      </article>`;
  }).join("");

  $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    const f = tab.dataset.filter;
    $$(".product", grid).forEach((card) => (card.hidden = f !== "all" && card.dataset.cat !== f));
  }));

  /* ---------- Backup calculator ---------- */
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
      note = `That's a lot of backup for this load. Talk to us about a bigger system or reducing hours.`;
    }
    $("#recBattery").textContent = battText;
    $("#recNote").textContent = note;

    const list = APPLIANCES.filter((a) => a.qty).map((a) => `${a.qty} × ${a.name}`).join(", ");
    waBtn.href = waUrl(
      `Hi ${C.businessName}, I used your backup calculator.\nAppliances: ${list}\nTotal load: ${load} W\nBackup needed: ${hrs} hours\nSuggested: ${inverter ? inverter + " VA" : "5 kVA+"} inverter with ${battText} battery.\nPlease share options and prices.`
    );
  }
  calc();

  /* ---------- Enquiry form → WhatsApp ---------- */
  $("#enquiryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const text = `Hi ${C.businessName}, I'm ${f.get("name")}.\nLooking for: ${f.get("need")}` + (f.get("msg") ? `\n${f.get("msg")}` : "");
    window.open(waUrl(text), "_blank", "noopener");
  });
})();
