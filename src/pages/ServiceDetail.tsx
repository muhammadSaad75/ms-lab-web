import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { Button, Reveal, Section, SectionHeading } from '../components/ui'
import { ProcessStep } from '../components/Cards'
import CTASection from '../components/CTASection'
import { process, services } from '../data/services'
import { posts } from '../data/posts'
import { site } from '../config/siteConfig'
import NotFound from './NotFound'
export default function ServiceDetail() {
  const s = services.find(x => x.slug === useParams().slug)
  if (!s) return <NotFound />
  const related = posts.filter(p => p.service === s.slug).slice(0, 3)
  const others = services.filter(x => x !== s)
  return (
    <>
      <Section className="!pb-8">
        <Link to="/services/" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden />All services</Link>
        <div className="max-w-3xl">
          <s.icon className="mb-5 h-8 w-8 text-brand2" aria-hidden />
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{s.title}</h1>
          {s.intro.map(p => <p key={p} className="mt-5 text-lg text-slate-400">{p}</p>)}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact/">Discuss Your Project</Button>
            <Button href={site.whatsapp} variant="wa"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp Us</Button>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="What's included" title={`Our ${s.title.toLowerCase()} services`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{s.included.map(([t, d], i) => <Reveal key={t} delay={i * 0.05} className="h-full"><div className="h-full rounded-2xl border border-line bg-card p-6"><Check className="mb-4 h-5 w-5 text-brand" aria-hidden /><h3 className="font-semibold text-white">{t}</h3><p className="mt-2 text-sm text-slate-400">{d}</p></div></Reveal>)}</div>
        <Reveal className="mt-10"><h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Technologies</h3><ul className="mt-4 flex flex-wrap gap-2">{s.stack.map(t => <li key={t} className="rounded-full border border-line px-3 py-1.5 text-sm text-slate-300">{t}</li>)}</ul></Reveal>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="How we work" title="A clear path from problem to product" /></div>
          <div>{process.map(([t, d], i) => <ProcessStep key={t} n={`0${i + 1}`} title={t} desc={d} last={i === process.length - 1} />)}</div>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="FAQ" title={`${s.title}: common questions`} />
        {/* Answers stay in the DOM (details/summary) so crawlers and the prerendered HTML include them */}
        <div className="max-w-3xl divide-y divide-line border-y border-line">{s.faqs.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-white [&::-webkit-details-marker]:hidden"><h3>{q}</h3><span aria-hidden className="text-xl text-brand2 transition group-open:rotate-45">+</span></summary><p className="mt-3 text-slate-400">{a}</p></details>)}</div>
      </Section>
      {related.length > 0 && <Section>
        <SectionHeading eyebrow="From the blog" title="Related articles" />
        <ul className="grid gap-5 md:grid-cols-3">{related.map(p => <li key={p.slug}><Link to={`/blog/${p.slug}/`} className="block h-full rounded-2xl border border-line bg-card p-6 transition-colors hover:border-brand/50"><h3 className="font-semibold text-white">{p.title}</h3><p className="mt-2 text-sm text-slate-400">{p.description}</p></Link></li>)}</ul>
      </Section>}
      <Section>
        <SectionHeading eyebrow="More services" title="Other ways we can help" />
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{others.map(x => <li key={x.slug}><Link to={`/services/${x.slug}/`} className="group flex min-h-11 items-center justify-between gap-2 border-b border-line py-3 text-slate-300 hover:text-white">{x.title}<ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-white" aria-hidden /></Link></li>)}</ul>
      </Section>
      <CTASection />
    </>
  )
}
