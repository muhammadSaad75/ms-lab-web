import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, Section, SectionHeading } from '../components/ui'
import CTASection from '../components/CTASection'
import { formatDate, posts } from '../data/posts'
export default function Blog() {
  return (<><Section><SectionHeading page eyebrow="Blog" title="Guides & Insights" desc="Practical articles on building, launching and improving mobile and web apps." />
    {posts.length === 0 ? <p className="text-slate-400">New articles are on the way.</p> :
      <ul className="grid gap-5 md:grid-cols-2">{posts.map((p, i) => <li key={p.slug}><Reveal delay={i * 0.05} className="h-full">
        <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-brand/50">
          <p className="text-xs text-slate-500"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min read</p>
          <h2 className="mt-3 text-xl font-semibold text-white"><Link to={`/blog/${p.slug}/`} className="after:absolute after:inset-0 after:rounded-2xl">{p.title}</Link></h2>
          <p className="mt-2 text-sm text-slate-400">{p.description}</p>
          <span aria-hidden className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-slate-400 group-hover:text-white">Read article <ArrowUpRight className="h-4 w-4" /></span>
        </article>
      </Reveal></li>)}</ul>}
  </Section><CTASection /></>)
}
