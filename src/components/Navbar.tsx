import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../config/siteConfig'
import { Button } from './ui'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  const bar = 'block h-0.5 w-5 rounded bg-white'
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : ''}`}>
      <nav aria-label="Main" className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${scrolled ? 'h-14' : 'h-20'}`}>
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">MS<span className="grad-text"> Labs</span></Link>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map(([l, to]) => <li key={to}><NavLink to={to} end={to === '/'} className={({ isActive }) => `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>{l}</NavLink></li>)}
        </ul>
        <div className="hidden md:block"><Button href={site.whatsapp} className="!min-h-10">Let's Talk</Button></div>
        <button aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden">
          <motion.span className={bar} animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} />
          <motion.span className={bar} animate={{ opacity: open ? 0 : 1 }} />
          <motion.span className={bar} animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden md:hidden">
            <ul className="space-y-1 px-5 pb-6">
              {nav.map(([l, to]) => <li key={to}><NavLink to={to} end={to === '/'} className={({ isActive }) => `block rounded-xl px-4 py-3 text-base ${isActive ? 'bg-white/10 text-white' : 'text-slate-300'}`}>{l}</NavLink></li>)}
              <li className="pt-3"><Button href={site.whatsapp} variant="wa" className="w-full">Let's Talk on WhatsApp</Button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
