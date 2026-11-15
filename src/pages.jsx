import { useMemo, useState } from 'react'
import { PRODUCTS, SIZES, DISCOUNT, SALE_LABEL, SIZE_GUIDE, PROMO_CODES, SHIPPING, FREE_SHIPPING_OVER, priceOf } from './data.js'
import { Arrow, Card, ImageSlot, useCountdown, egp } from './components.jsx'

/* ---------------- HOME ---------------- */
export function Home() {
  const time = useCountdown()
  const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 4)
  const count = (g) => PRODUCTS.filter((p) => p.gender === g).length
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="mono lime">Drop 11 — 2026</p>
          <h1><span>MORE</span><span className="outline">ELEGANT</span></h1>
          <p className="hero-sub">Uniforms for the ungoverned.<br />Heavyweight essentials, reduced to their strongest form.</p>
          <a className="btn lime-btn" href="#/new">SHOP THE DROP <Arrow /></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 600 600" className="orbits">
            <ellipse cx="300" cy="300" rx="290" ry="170" transform="rotate(-25 300 300)" />
            <ellipse cx="300" cy="300" rx="290" ry="170" transform="rotate(25 300 300)" />
            <ellipse cx="300" cy="300" rx="200" ry="270" transform="rotate(10 300 300)" />
          </svg>
          <div className="ribbon mono"><b>M E</b> / MORE ELEGANT / <b>QUIETLY LOUDER</b> /</div>
          <div className="big-me">M<i>/</i>E</div>
        </div>
        <div className="window">
          <div className="window-top">
            <div className="mono"><div>{SALE_LABEL}</div><p>Limited run. No restocks.</p></div>
            <strong>{DISCOUNT * 100}% OFF</strong>
          </div>
          <div className="timer">{time.map(([l, v]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><span className="mono">{l}</span></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><p className="mono">01 / Latest</p><h2 className="display light">NEW ARRIVALS</h2></div>
          <a className="view-all mono" href="#/new">View all <Arrow /></a>
        </div>
        <div className="grid">{fresh.map((p) => <Card key={p.id} p={p} />)}</div>
      </section>

      <section className="tiles">
        <a className="tile blue" href="#/men"><span className="mono">{String(count('men')).padStart(2, '0')} Styles</span><span className="circle"><Arrow /></span><h2 className="display">MEN</h2><i className="ghost">M/E</i></a>
        <a className="tile rust" href="#/women"><span className="mono">{String(count('women')).padStart(2, '0')} Styles</span><span className="circle"><Arrow /></span><h2 className="display">WOMEN</h2><i className="ghost">M/E</i></a>
      </section>

      <section className="method">
        <p className="mono lime">The M E Method</p>
        <h2 className="display">WE DON'T CHASE<br />THE <em>NOISE.</em></h2>
        <div className="method-cols">
          <div><h4>Heavyweight only</h4><p>Dense fabrics and clean cuts. Nothing in the line is there to fill a rail.</p></div>
          <div><h4>Limited runs</h4><p>Every drop is made once. When a piece is gone, it is gone.</p></div>
          <div><h4>Built to be worn out</h4><p>Pieces made for daily use, not for the photo.</p></div>
        </div>
      </section>
    </>
  )
}

/* ---------------- COLLECTION (men / women / new / hoodies / all) ---------------- */
export const COLLECTIONS = {
  men: { label: '02 / Men', title: 'MEN', tone: 'blue', blurb: 'Heavyweight essentials cut for everyday wear.', filter: (p) => p.gender === 'men' },
  women: { label: '03 / Women', title: 'WOMEN', tone: 'rust', blurb: 'The same uniform, cut for her.', filter: (p) => p.gender === 'women' },
  new: { label: '04 / Latest', title: 'NEW ARRIVALS', tone: 'ink', blurb: 'This drop. Limited run, no restocks.', filter: (p) => p.isNew },
  hoodies: { label: '05 / Essential', title: 'HOODIES', tone: 'lime', blurb: 'The core of the line.', filter: (p) => p.type === 'Hoodie' },
  all: { label: '06 / Everything', title: 'ALL PRODUCTS', tone: 'ink', blurb: 'Search the full line.', filter: () => true },
}

export function Collection({ id }) {
  const c = COLLECTIONS[id]
  const base = useMemo(() => PRODUCTS.filter(c.filter), [id])
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [sort, setSort] = useState('featured')
  const [max, setMax] = useState(5000)
  const types = [...new Set(base.map((p) => p.type))]
  const list = useMemo(() => {
    const out = base.filter((p) => (!q || p.name.toLowerCase().includes(q.toLowerCase())) && (!type || p.type === type) &&
      priceOf(p, size || 'M').price <= max)
    if (sort === 'low') out.sort((a, b) => priceOf(a).price - priceOf(b).price)
    if (sort === 'high') out.sort((a, b) => priceOf(b).price - priceOf(a).price)
    return out
  }, [base, q, type, size, sort, max])

  return (
    <>
      <header className={`band ${c.tone}`}>
        <p className="mono">{c.label}</p>
        <h1 className="display">{c.title}</h1>
        <p className="band-sub">{c.blurb}</p>
        <span className="mono band-count">{String(base.length).padStart(2, '0')} Styles</span>
        <i className="ghost">M/E</i>
      </header>
      <section className="section">
        <div className="filters">
          <input aria-label="Search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{types.map((t) => <option key={t}>{t}</option>)}</select>
          <select aria-label="Size" value={size} onChange={(e) => setSize(e.target.value)}><option value="">All sizes</option>{SIZES.map((s) => <option key={s}>{s}</option>)}</select>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          <label className="range mono">Up to {egp(max)}<input type="range" min="500" max="5000" step="100" value={max} onChange={(e) => setMax(+e.target.value)} /></label>
        </div>
        {list.length ? <div className="grid">{list.map((p) => <Card key={p.id} p={p} />)}</div>
          : <p className="empty">No pieces match these filters. Try another size or price.</p>}
      </section>
    </>
  )
}

/* ---------------- PRODUCT ---------------- */
function SizeGuide({ gender, close }) {
  return (
    <div className="modal" onClick={close}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <h3>Size guide (inches)</h3>
        <table>
          <thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Sleeve</th></tr></thead>
          <tbody>{SIZE_GUIDE[gender].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
        <button className="btn dark-btn" onClick={close}>Close</button>
      </div>
    </div>
  )
}

export function Product({ id, add }) {
  const p = PRODUCTS.find((x) => x.id === id)
  const [size, setSize] = useState('M')
  const [guide, setGuide] = useState(false)
  const [origin, setOrigin] = useState(null)
  if (!p) return <section className="section"><p className="empty">Product not found. <a href="#/all">Browse all products</a></p></section>
  const { original, price, onSale } = priceOf(p, size)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const more = PRODUCTS.filter((x) => x.gender === p.gender && x.id !== p.id).slice(0, 4)
  return (
    <>
      <section className="section pdp">
        <div className={`zoom ${origin ? 'on' : ''}`} onMouseMove={move} onMouseLeave={() => setOrigin(null)} style={{ '--o': origin || '50% 50%' }}>
          <ImageSlot src={p.image} label={p.name} />
        </div>
        <div className="info">
          <p className="mono crumbs"><a href={`#/${p.gender}`}>{p.gender}</a> / {p.type}</p>
          <h1 className="display sm">{p.name}</h1>
          <p className="pdp-price"><b>{egp(price)}</b>{onSale && <><s>{egp(original)}</s><span className="tag hot">-{DISCOUNT * 100}%</span></>}</p>
          <h4 className="mono">Size <button className="link" onClick={() => setGuide(true)}>Size guide</button></h4>
          <div className="sizes">{SIZES.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}</div>
          <button className="btn lime-btn wide" onClick={() => add(p, size)}>ADD TO BAG <Arrow /></button>
          <ul className="notes mono"><li>Free shipping over {egp(FREE_SHIPPING_OVER)}</li><li>Limited run. No restocks.</li><li>Hover the image to zoom</li></ul>
        </div>
        {guide && <SizeGuide gender={p.gender} close={() => setGuide(false)} />}
      </section>
      <section className="section">
        <div className="section-head"><h2 className="display light sm">YOU MAY ALSO LIKE</h2></div>
        <div className="grid">{more.map((x) => <Card key={x.id} p={x} />)}</div>
      </section>
    </>
  )
}

/* ---------------- CART / CHECKOUT ---------------- */
export function totals(cart, code) {
  const subtotal = cart.reduce((a, i) => a + priceOf(i.p, i.size).price * i.qty, 0)
  const off = code ? Math.round(subtotal * PROMO_CODES[code] * 100) / 100 : 0
  const ship = !cart.length || subtotal - off >= FREE_SHIPPING_OVER ? 0 : SHIPPING
  return { subtotal, off, ship, total: subtotal - off + ship }
}

export function CartDrawer({ cart, setCart, code, setCode, close }) {
  const [input, setInput] = useState(code || '')
  const [msg, setMsg] = useState('')
  const t = totals(cart, code)
  const apply = () => {
    const c = input.trim().toUpperCase()
    if (PROMO_CODES[c]) { setCode(c); setMsg(`Code ${c} applied.`) } else { setCode(null); setMsg('That code is not valid.') }
  }
  const qty = (k, d) => setCart(cart.map((i) => (i.key === k ? { ...i, qty: Math.max(1, i.qty + d) } : i)))
  return (
    <div className="modal side" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head"><h3 className="display sm">BAG</h3><button className="link" onClick={close}>Close</button></div>
        {!cart.length ? <p className="empty">Your bag is empty. <a href="#/new" onClick={close}>Shop the drop</a></p> : (
          <>
            <ul className="lines">{cart.map((i) => (
              <li key={i.key}>
                <ImageSlot className="thumb" src={i.p.image} label={i.p.name} />
                <div><b>{i.p.name}</b><small className="mono">Size {i.size}</small>
                  <div className="qty"><button aria-label="Decrease" onClick={() => qty(i.key, -1)}>−</button>{i.qty}<button aria-label="Increase" onClick={() => qty(i.key, 1)}>+</button></div></div>
                <div className="end"><b>{egp(priceOf(i.p, i.size).price * i.qty)}</b><button className="link" onClick={() => setCart(cart.filter((x) => x.key !== i.key))}>Remove</button></div>
              </li>))}</ul>
            <div className="promo"><input placeholder="Promo code" value={input} onChange={(e) => setInput(e.target.value)} /><button className="btn dark-btn small" onClick={apply}>Apply</button></div>
            {msg && <p className="hint">{msg}</p>}
            <dl className="sum">
              <div><dt>Subtotal</dt><dd>{egp(t.subtotal)}</dd></div>
              {t.off > 0 && <div><dt>Promo</dt><dd>−{egp(t.off)}</dd></div>}
              <div><dt>Shipping</dt><dd>{t.ship ? egp(t.ship) : 'Free'}</dd></div>
              <div className="tot"><dt>Total</dt><dd>{egp(t.total)}</dd></div>
            </dl>
            <a className="btn lime-btn wide" href="#/checkout" onClick={close}>CHECKOUT <Arrow /></a>
          </>)}
      </aside>
    </div>
  )
}

export function Checkout({ cart, code, placed }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', city: '', address: '' })
  const t = totals(cart, code)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  if (!cart.length) return <section className="section narrow"><p className="empty">Your bag is empty. <a href="#/new">Shop the drop</a></p></section>
  return (
    <section className="section narrow">
      <h1 className="display sm">CHECKOUT</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); placed(f) }}>
        <input required placeholder="Full name" value={f.name} onChange={set('name')} />
        <input required type="email" placeholder="Email" value={f.email} onChange={set('email')} />
        <input required type="tel" placeholder="Phone" value={f.phone} onChange={set('phone')} />
        <input required placeholder="City" value={f.city} onChange={set('city')} />
        <textarea required rows="3" placeholder="Street address" value={f.address} onChange={set('address')} />
        <p className="hint">Payment on delivery. Order total: <b>{egp(t.total)}</b></p>
        <button className="btn lime-btn wide">PLACE ORDER <Arrow /></button>
      </form>
    </section>
  )
}

export function Done({ order }) {
  return (
    <section className="section narrow">
      <p className="mono">Order #{order.no}</p>
      <h1 className="display sm">ORDER RECEIVED</h1>
      <p className="lead">We will email {order.email} with shipping details.</p>
      <a className="btn dark-btn" href="#/">Back to home</a>
    </section>
  )
}
