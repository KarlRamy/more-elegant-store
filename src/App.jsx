import { useEffect, useState } from 'react'
import { Logo, egp } from './components.jsx'
import { Home, Collection, COLLECTIONS, Product, CartDrawer, Checkout, Done } from './pages.jsx'
import { DISCOUNT, FREE_SHIPPING_OVER } from './data.js'

function useHash() {
  const get = () => window.location.hash.replace(/^#/, '') || '/'
  const [h, setH] = useState(get)
  useEffect(() => {
    const f = () => { setH(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return h
}

const Search = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>)
const Bag = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>)

export default function App() {
  const route = useHash()
  const [, page, arg] = route.split('/')
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('me-cart')) || [] } catch { return [] } })
  const [code, setCode] = useState(null)
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(null)
  useEffect(() => { try { localStorage.setItem('me-cart', JSON.stringify(cart)) } catch {} }, [cart])

  const add = (p, size) => {
    const key = `${p.id}-${size}`
    setCart((c) => (c.find((i) => i.key === key) ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)) : [...c, { key, p, size, qty: 1 }]))
    setOpen(true)
  }
  const count = cart.reduce((a, i) => a + i.qty, 0)
  const nav = [['men', 'MEN'], ['women', 'WOMEN'], ['new', 'NEW DROP'], ['hoodies', 'HOODIES']]

  let view
  if (!page) view = <Home />
  else if (COLLECTIONS[page]) view = <Collection key={page} id={page} />
  else if (page === 'product') view = <Product key={arg} id={arg} add={add} />
  else if (page === 'checkout') view = <Checkout cart={cart} code={code} placed={(f) => { setOrder({ no: Math.floor(100000 + Math.random() * 900000), ...f }); setCart([]); setCode(null); window.location.hash = '#/done' }} />
  else if (page === 'done' && order) view = <Done order={order} />
  else view = <Home />

  return (
    <>
      <div className="topbar mono">FREE SHIPPING ON ORDERS OVER {egp(FREE_SHIPPING_OVER)} &nbsp;///&nbsp; NOVEMBER DROP: {DISCOUNT * 100}% OFF SELECTED PIECES</div>
      <header className="top">
        <Logo />
        <nav className="mono">{nav.map(([k, l]) => <a key={k} href={`#/${k}`} className={page === k ? 'on' : ''}>{l}</a>)}</nav>
        <div className="icons">
          <a href="#/all" aria-label="Search products"><Search /></a>
          <button onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}><Bag /><span className="badge mono">{count}</span></button>
        </div>
      </header>
      <main>{view}</main>
      <footer className="foot">
        <Logo dark />
        <nav className="mono">{nav.map(([k, l]) => <a key={k} href={`#/${k}`}>{l}</a>)}</nav>
        <p className="mono">© {new Date().getFullYear()} M/E More Elegant. Quietly louder.</p>
      </footer>
      {open && <CartDrawer cart={cart} setCart={setCart} code={code} setCode={setCode} close={() => setOpen(false)} />}
    </>
  )
}
