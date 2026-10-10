import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Button, Section } from '../components/ui'
import { products } from '../data/products'
import NotFound from './NotFound'
export default function ProductDetail() {
  const p = products.find(x => x.slug === useParams().slug)
  if (!p) return <NotFound />
  return (
    <Section>
      <Link to="/products/" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden />All products</Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand2">{p.category} · {p.platforms.join(' / ')}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{p.name}</h1>
          <p className="mt-4 text-lg text-slate-400">{p.long ?? p.description}</p>
          <ul className="mt-6 space-y-2">{p.features.map(f => <li key={f} className="flex gap-2 text-slate-300"><Check className="mt-1 h-4 w-4 text-brand" aria-hidden />{f}</li>)}</ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {p.appStore && <Button href={p.appStore}>App Store</Button>}{p.playStore && <Button href={p.playStore} variant="ghost">Google Play</Button>}
            {!p.appStore && !p.playStore && <Button to="/contact/" variant="ghost">Get notified</Button>}
          </div>
        </div>
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand/20 to-brand2/10">
          {p.screenshot ? <img src={p.screenshot} alt={`${p.name} screenshot`} loading="lazy" className="h-full w-full object-cover" /> : <p.icon className="h-16 w-16 text-white/80" aria-hidden />}
        </div>
      </div>
    </Section>
  )
}
