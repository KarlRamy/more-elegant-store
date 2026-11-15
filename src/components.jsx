import { useEffect, useState } from 'react'
import { DISCOUNT, SALE_ENDS, priceOf } from './data.js'

export const egp = (n) => new Intl.NumberFormat('en-EG', {
  style: 'currency',
  currency: 'EGP',
  maximumFractionDigits: 0,
}).format(n)

export const Arrow = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M14 6l6 6-6 6" /></svg>)

export function Logo({ dark }) {
  return (
    <a href="#/" className={`logo ${dark ? 'dark' : ''}`} aria-label="M/E More Elegant, home">
      <span className="logo-mark">M<i>/</i>E</span>
      <span className="logo-sub">MORE<br />ELEGANT</span>
    </a>
  )
}

export function ImageSlot({ src, label, className = '' }) {
  const [ok, setOk] = useState(true)
  useEffect(() => setOk(true), [src])
  return ok ? (
    <img className={`img ${className}`} src={src} alt={label} onError={() => setOk(false)} />
  ) : (
    <div className={`slot ${className}`}><span className="mono">Image slot</span><code>public{src}</code></div>
  )
}

export function useCountdown() {
  const calc = () => Math.max(0, new Date(SALE_ENDS) - new Date())
  const [ms, setMs] = useState(calc)
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t) }, [])
  const s = Math.floor(ms / 1000)
  return [['Days', Math.floor(s / 86400)], ['Hrs', Math.floor(s / 3600) % 24], ['Min', Math.floor(s / 60) % 60], ['Sec', s % 60]]
}

export function Card({ p }) {
  const { price, onSale } = priceOf(p, 'M')
  return (
    <a className="card" href={`#/product/${p.id}`}>
      <div className="card-img">
        <ImageSlot src={p.image} label={p.name} />
        <div className="tags">
          {p.isNew && <span className="tag">NEW</span>}
          {onSale && <span className="tag hot">-{DISCOUNT * 100}%</span>}
        </div>
      </div>
      <div className="card-meta mono"><span>{p.gender} / {p.type}</span><b>From {egp(price)}</b></div>
      <h3>{p.name}</h3>
    </a>
  )
}
