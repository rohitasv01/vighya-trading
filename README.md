# Vighya Trading — website

Plain static site (HTML/CSS/JS). No build step.

## Pages
- `index.html`: home (hero, category tiles, product rows, calculator, services, FAQ, map)
- `category.html?c=<id>`: one page per category (batteries, inverters, solar-panels, stabilizers, electric-scooters, ac)

## Edit details
Everything (phone, WhatsApp, address, map, hours, categories, products) is in **config.js**.
To add a product, copy an existing `{ ... }` block inside a category's `products` list.

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
All other `images/*.jpg` are from Pexels (free for commercial use, no credit required — https://www.pexels.com/license/).
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
