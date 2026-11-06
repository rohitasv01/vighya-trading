# Vighya Trading — website

Plain static site (HTML/CSS/JS). No build step.

## Edit details
Everything (phone, WhatsApp, address, map link, hours, brands, products) is in **config.js**.

## Add product photos
Put photos in `images/` and set `image: "images/your-photo.jpg"` on that product in config.js.
Square or 4:3 photos with a plain background look best.

## Deploy to Vercel
Option B: Vercel CLI
    npm i -g vercel
    vercel          # first time: answer the prompts (no build command, output dir = .)
    vercel --prod   # publish

Option C: GitHub
Push this folder to a GitHub repo → vercel.com/new → import the repo → Framework preset "Other" → Deploy.

## Custom domain later
Vercel dashboard → Project → Settings → Domains → add your domain and follow the DNS steps.
