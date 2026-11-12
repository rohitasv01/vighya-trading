# Vighya Battery — website

Plain static site (HTML/CSS/JS). No build step.

## Pages
- `index.html`: home (hero, category picture strip, category tiles, product rows, calculator, services, FAQ, map)
- `category.html?c=<id>&s=<type>&b=<brand>`: one page per category, with type tabs, brand filter and search
  (batteries, inverters, chargers, solar-panels, stabilizers, electric-scooters, ac, refrigerators, washing-machines)
- `product.html?c=<id>&id=<product id>`: one page per product with its full specification table
- Every page has the category bar with the **All** menu (categories → their types).

## Edit details
Shop details (phone, WhatsApp, address, map, hours) and the category list are in **config.js**.
To add one of our own products, copy an existing `{ ... }` block inside a category's `products` list.

## Brand catalogue (data/)
Every brand model with its specifications is in `data/<category>.js`, one file per category
(LG fridges and washing machines, Daikin and Lloyd ACs, G-Lite scooters, Kura chargers, lithium batteries, inverters).
`data/index.js` holds only counts, types and four featured products per category, so the home page stays light.
After editing a `data/<category>.js` file (or config.js, script.js, styles.css), run this. It refreshes the index and
updates the `?v=` tag on the pages so visitors' browsers fetch the new files instead of old cached ones:

    python3 tools/build_catalog.py

Model photos are in `images/products/<category>/`; they are the makers' own product photos, unedited.
A product with no photo of its own shows a stock photo for its type, captioned "Representative photo, not the exact
product" on its page; `STOCK_PHOTO` in script.js says which. Give the product an `image` and the stock photo goes away.
No prices are stored anywhere: every product asks the customer to WhatsApp or call for today's price.

## Add product photos
Put photos in `images/` and set `image: "images/your-photo.webp"` on that product in config.js.
Set `cover:` on a category to change its tile / page photo. 4:3 photos look best.

## Deploy to Vercel
Option B: Vercel CLI
    npm i -g vercel
    vercel          # first time: answer the prompts (no build command, output dir = .)
    vercel --prod   # publish

Option C: GitHub
Push this folder to a GitHub repo → vercel.com/new → import the repo → Framework preset "Other" → Deploy.

## Custom domain later
Vercel dashboard → Project → Settings → Domains → add your domain and follow the DNS steps.

## Stock photos
Photos named `vighya-*.webp` and `electric-scooters.webp` are the shop's own.
All other `images/*.jpg` are from Pexels (free for commercial use, no credit required — https://www.pexels.com/license/),
except `battery-bank.jpg`, which is Unsplash photo CH7kRmyBQ4I (free for commercial use, no credit required — https://unsplash.com/license).
Replace any of them by dropping a new file in `images/` and updating its path in config.js.

| File | Pexels photo ID |
|---|---|
| inverter-home-setup.jpg | 37929911 |
| inverter-internals.jpg | 38171183 |
| solar-house-roof.jpg | 12243093 |
| solar-small-panel.jpg | 9875421 |
| solar-panels-frame.jpg | 13963757 |
| solar-panels-mono.jpg | 35726122 |
| solar-panels-poly.jpg | 12606669 |
| solar-installation.jpg | 9875411 |
| electrical-panel.jpg | 28265032 |
| voltage-meters.jpg | 31996522 |
| ac-split-indoor.jpg | 38788452 |
| ac-outdoor-unit.jpg | 27427771 |
| ac-window-units.jpg | 25004718 |
| scooter-green.jpg | 7420572 |
| scooter-white.jpg | 10829534 |
| battery-warehouse.jpg | 36594160 |
| battery-flat-plate.jpg | 37177070 |
| washing-machine-load.jpg | 11316620 |
| refrigerator-steel.jpg | 8032016 |
| cells-cylindrical.jpg | 698485 |
| ebike-battery.jpg | 11951153 |
