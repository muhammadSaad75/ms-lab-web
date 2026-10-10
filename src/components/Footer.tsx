import { Link } from 'react-router-dom'
import { nav, site } from '../config/siteConfig'
import { services } from '../data/services'
export default function Footer() {
  const links = [...nav.map(([l, to]) => [l, to]), ['Privacy Policy', '/privacy/'], ['Terms of Service', '/terms/']]
  const social = Object.entries(site.social)
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:justify-between">
        <div><p className="text-lg font-semibold text-white">{site.name}</p><p className="mt-2 max-w-xs text-sm text-slate-400">{site.tagline}</p>
          {social.length > 0 && <div className="mt-4 flex gap-4 text-sm">{social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">{n}</a>)}</div>}
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <ul className="text-sm"><li className="pb-1.5 font-medium text-white">Services</li>{services.map(s => <li key={s.slug}><Link to={`/services/${s.slug}/`} className="inline-block py-1.5 text-slate-400 hover:text-white">{s.title}</Link></li>)}</ul>
          <ul className="grid h-fit grid-cols-2 gap-x-10 gap-y-1 text-sm">{links.map(([l, to]) => <li key={to}><Link to={to} className="inline-block py-1.5 text-slate-400 hover:text-white">{l}</Link></li>)}</ul>
        </div>
      </div>
      <p className="border-t border-line py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  )
}
