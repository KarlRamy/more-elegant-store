// ===== STORE SETTINGS (edit here) =====
export const SALE_LABEL = 'NOVEMBER WINDOW'
export const SALE_ENDS = '2026-11-30T23:59:59'
export const DISCOUNT = 0.2
export const SIZES = ['M', 'L', 'XL']
export const SIZE_EXTRA = { M: 0, L: 0, XL: 150 }
export const PROMO_CODES = { ME10: 0.1, WELCOME15: 0.15 }
export const SHIPPING = 100
export const FREE_SHIPPING_OVER = 3000

// image = slot path. Drop the file into public/images with the same name.
const P = (id, gender, name, base, extra = {}) => ({
  id, gender, type: 'Hoodie', name, base,
  image: `/images/${id}.jpg`,
  isNew: false,
  sale: true,
  ...extra,
})

export const PRODUCTS = [
  P('men-1', 'men', 'Cool Hoodie — Stay Cozy', 1650, { isNew: true }),
  P('men-2', 'men', 'Good Vibes Hoodie — Choose Joy', 2200, { isNew: true }),
  P('men-3', 'men', 'Dream Big Hoodie — Make It Happen', 2300, { isNew: true }),
  P('men-4', 'men', 'No Bad Days Hoodie — Keep Moving', 2600, { isNew: true }),
  P('men-5', 'men', 'Easy Day Hoodie — Take It Slow', 1250),
  P('men-6', 'men', 'Original Hoodie — Be Yourself', 2100),
  P('men-7', 'men', 'Quiet Mind Hoodie — Find Your Way', 1150),
  P('men-8', 'men', 'Weekend Hoodie — Out of Office', 3200),
  P('men-9', 'men', 'Good Energy Hoodie — Pass It On', 2000),
  P('men-10', 'men', 'Classic Hoodie — Made to Last', 1800, { sale: false }),
  P('women-1', 'women', 'Cool Cropped Hoodie — Stay Cozy', 1550, { isNew: true }),
  P('women-2', 'women', 'Good Vibes Hoodie — Choose Joy', 1100, { isNew: true }),
  P('women-3', 'women', 'Dreamer Hoodie — Make It Happen', 2100),
  P('women-4', 'women', 'Unbothered Hoodie — Keep Your Peace', 3000),
]

export const SIZE_GUIDE = {
  men: [['M', '38 - 40', '27.5', '25'], ['L', '41 - 43', '28.5', '26'], ['XL', '44 - 46', '29.5', '26.5']],
  women: [['M', '34 - 36', '25', '23.5'], ['L', '37 - 39', '26', '24'], ['XL', '40 - 42', '27', '24.5']],
}

const r2 = (n) => Math.round(n * 100) / 100
export const priceOf = (p, size = 'M') => {
  const original = p.base + (SIZE_EXTRA[size] || 0)
  return { original, price: p.sale ? r2(original * (1 - DISCOUNT)) : original, onSale: p.sale }
}
