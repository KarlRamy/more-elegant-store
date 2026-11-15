# M/E — More Elegant

E-commerce storefront for the **M/E (More Elegant)** clothing brand, built with React and Vite.
Heavyweight essentials, limited drops, quietly louder.

## Features

- Home page with a hero, a live countdown for the November sale, new arrivals and category tiles
- Collection pages: Men, Women, New Arrivals, Hoodies and All Products
- Filters for search, type, size, color and price, plus sorting
- Product page with color and size selection, a price that updates by size, a size guide and hover zoom
- Shopping bag with quantity editing, promo codes and a free-shipping threshold
- Checkout form and order confirmation
- Responsive layout, keyboard focus styles and reduced-motion support

## Tech Stack

- React 18
- Vite 5
- Plain CSS (no UI library)
- Hash-based routing (no router dependency)

## Getting Started

```bash
git clone https://github.com/KarlRamy/more-elegant-store.git
cd more-elegant-store
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
public/images/     product images
src/data.js        products, prices, colors, sizes, promo codes, sale settings
src/components.jsx shared components (logo, image slot, product card, countdown)
src/pages.jsx      home, collections, product, bag, checkout
src/App.jsx        layout and routing
src/styles.css     all styles
```

## Customizing

Everything editable is in `src/data.js`:

- Products, prices, colors and sizes
- Sale discount (`DISCOUNT`) and end date (`SALE_ENDS`)
- Promo codes (`PROMO_CODES`)
- Shipping fee and free-shipping threshold

## Product Images

Add images to `public/images/` with these names:

- Men: `men-1.jpg` to `men-10.jpg`
- Women: `women-1.jpg` to `women-4.jpg`

Missing images show a placeholder with the expected file path.

## Routes

| Route | Page |
| --- | --- |
| `#/` | Home |
| `#/men` | Men |
| `#/women` | Women |
| `#/new` | New Arrivals |
| `#/hoodies` | Hoodies |
| `#/all` | All Products and search |
| `#/product/:id` | Product details |
| `#/checkout` | Checkout |

## Status

Front end only. Orders are not sent anywhere yet, so a backend or order service
(for example a form service, Google Sheets or WhatsApp) is needed to receive them.

## License

All rights reserved. Contact the author before reusing the design or code.
