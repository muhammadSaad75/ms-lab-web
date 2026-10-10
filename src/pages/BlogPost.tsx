import { use } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Button, Section } from '../components/ui'
import CTASection from '../components/CTASection'
import { formatDate, postHtml, posts } from '../data/posts'
import { services } from '../data/services'
import NotFound from './NotFound'
export default function BlogPost() {
  const p = posts.find(x => x.slug === useParams().slug)
  if (!p) return <NotFound />
  return <Post slug={p.slug} />
}
function Post({ slug }: { slug: string }) {
  const p = posts.find(x => x.slug === slug)!
  // Suspends until the post's chunk loads; prerender waits for it, so the body is in the static HTML
  const html = use(postHtml(slug))
  const service = services.find(s => s.slug === p.service)
  const more = posts.filter(x => x !== p).slice(0, 2)
  return (
    <>
      <Section className="max-w-3xl">
        <Link to="/blog/" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden />All articles</Link>
        <article>
          <header>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">{p.title}</h1>
            <p className="mt-4 text-sm text-slate-500">
              By MS Labs · <time dateTime={p.date}>{formatDate(p.date)}</time>
              {p.updated && <> · Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time></>} · {p.minutes} min read
            </p>
          </header>
          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        {service && <aside className="mt-14 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand2">Need help with this?</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{service.title}</h2>
          <p className="mt-2 text-slate-400">{service.desc}</p>
          <Button to={`/services/${service.slug}/`} variant="ghost" className="mt-6">See the service <ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
        </aside>}
        {more.length > 0 && <nav aria-label="More articles" className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">More articles</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">{more.map(x => <li key={x.slug}><Link to={`/blog/${x.slug}/`} className="group flex min-h-11 items-center justify-between gap-4 py-4 text-slate-300 hover:text-white">{x.title}<ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-white" aria-hidden /></Link></li>)}</ul>
        </nav>}
      </Section>
      <CTASection />
    </>
  )
}
