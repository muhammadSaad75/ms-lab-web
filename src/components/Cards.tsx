import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Product } from '../data/products'
import type { Service } from '../data/services'
import { Reveal } from './ui'
export function ServiceCard({ s, full, i = 0 }: { s: Service; full?: boolean; i?: number }) {
  return (
    <Reveal delay={i * 0.05} className="h-full">
      <motion.article whileHover={{ y: -4 }} className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-brand/50">
        <s.icon className="mb-5 h-6 w-6 text-brand2" aria-hidden />
        {/* The title link's ::after covers the card, so the whole card is clickable with one link for crawlers */}
        <h3 className="text-lg font-semibold text-white"><Link to={`/services/${s.slug}/`} className="after:absolute after:inset-0 after:rounded-2xl">{s.title}</Link></h3>
        <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
        {full && <ul className="mt-4 space-y-2 text-sm text-slate-300">{s.capabilities.map(c => <li key={c} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{c}</li>)}</ul>}
        <span aria-hidden className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-slate-400 group-hover:text-white">Learn more <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </motion.article>
    </Reveal>
  )
}
export function ProductCard({ p, i = 0 }: { p: Product; i?: number }) {
  return (
    <Reveal delay={i * 0.06} className="h-full">
      <motion.div whileHover={{ y: -4 }} className="group h-full overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-brand/50">
        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand/20 to-brand2/10">
          {p.screenshot ? <img src={p.screenshot} alt={`${p.name} app screenshot`} loading="lazy" className="h-full w-full object-cover" /> : <p.icon className="h-12 w-12 text-white/80" aria-hidden />}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 text-xs"><span className="text-brand2">{p.category}</span><span className="rounded-full border border-line px-2.5 py-1 text-slate-400">{p.status === 'live' ? p.platforms.join(' · ') : 'Coming soon'}</span></div>
          <h3 className="mt-3 text-xl font-semibold text-white">{p.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{p.description}</p>
          <Link to={`/products/${p.slug}/`} className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-white">View details <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></Link>
        </div>
      </motion.div>
    </Reveal>
  )
}
export const ProcessStep = ({ n, title, desc, last }: { n: string; title: string; desc: string; last?: boolean }) => (
  <Reveal className="relative flex gap-5 pb-10 last:pb-0">
    {!last && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-2rem)] w-px bg-line" />}
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-card text-sm font-semibold text-brand2">{n}</span>
    <div className="pt-2"><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-1 text-sm text-slate-400">{desc}</p></div>
  </Reveal>
)
