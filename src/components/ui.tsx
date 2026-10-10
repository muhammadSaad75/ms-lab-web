import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
const v = {
  primary: 'bg-white text-slate-900 hover:bg-slate-200',
  ghost: 'border border-white/15 text-white hover:bg-white/10',
  wa: 'bg-emerald-500 text-white hover:bg-emerald-400',
}
type P = { to?: string; href?: string; variant?: keyof typeof v; children: ReactNode; className?: string; type?: 'submit' | 'button' }
export function Button({ to, href, variant = 'primary', children, className = '', type = 'button' }: P) {
  const c = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition active:scale-95 ${v[variant]} ${className}`
  if (to) return <Link to={to} className={c}>{children}</Link>
  if (href) {
    const ext = href.startsWith('http')
    return <a href={href} className={c} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
  }
  return <button type={type} className={c}>{children}</button>
}
export const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>{children}</motion.div>
)
// `page` renders the page's <h1>, unanimated so it is visible in the prerendered HTML before JS loads
export const SectionHeading = ({ eyebrow, title, desc, center, page }: { eyebrow?: string; title: string; desc?: string; center?: boolean; page?: boolean }) => {
  const H = page ? 'h1' : 'h2'
  const body = <>
    {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand2">{eyebrow}</p>}
    <H className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</H>
    {desc && <p className="mt-4 text-base text-slate-400 sm:text-lg">{desc}</p>}
  </>
  const c = `mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`
  return page ? <div className={c}>{body}</div> : <Reveal className={c}>{body}</Reveal>
}
export const Section = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 ${className}`}>{children}</section>
)
export const AnimatedBackground = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="blob absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/25 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
    <div className="blob absolute right-0 top-40 h-72 w-72 rounded-full bg-brand2/10 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
  </div>
)
