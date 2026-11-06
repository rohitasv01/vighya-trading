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
