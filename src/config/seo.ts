import { site } from './siteConfig'
import { products } from '../data/products'
import { services } from '../data/services'
import { posts } from '../data/posts'

// Single source of truth for per-page SEO. Used by the client (useSeo) and by the build-time prerender.
// URLs use a trailing slash because each page is emitted as <path>/index.html, which static hosts serve
// at "/path/" (and 301 "/path" to it).
// `published`/`modified` (YYYY-MM-DD) become article meta tags; `modified` is also the sitemap lastmod.
export type Meta = { path: string | null; title: string; description: string; noindex?: boolean; type?: 'website' | 'article'; crumb?: string; jsonLd?: object[]; published?: string; modified?: string }

const pages: Record<string, Omit<Meta, 'path'>> = {
  '/': { title: 'MS Labs — Mobile App, Web & Software Development', description: 'MS Labs builds software products and digital solutions that solve real-world problems — mobile apps, React Native, web applications, APIs and SDKs.' },
  '/products/': { crumb: 'Products', title: 'Products — Apps & Digital Products by MS Labs', description: 'Explore the mobile apps and digital products built and published by MS Labs to solve real-world problems.' },
  '/services/': { crumb: 'Services', title: 'Software Development Services — MS Labs', description: 'Mobile app, React Native, web application, backend & API, SDK development, performance optimization and maintenance services from MS Labs.' },
  '/blog/': { crumb: 'Blog', title: 'Blog — App Development Guides & Insights | MS Labs', description: 'Practical articles on mobile app development, React Native, web apps, APIs and performance from the MS Labs team.' },
  '/about/': { crumb: 'About', title: 'About MS Labs — Product-First Technology Company', description: 'MS Labs is a product-first technology company building mobile apps, digital products and dependable software for real-world problems.' },
  '/contact/': { crumb: 'Contact', title: 'Contact MS Labs — Start Your Software Project', description: `Talk to MS Labs about your mobile app, web or backend project. WhatsApp or call ${site.phone}, or email ${site.email}.` },
  '/privacy/': { crumb: 'Privacy Policy', title: 'Privacy Policy — MS Labs', description: 'How the MS Labs website handles your information, including messages sent through the contact form.' },
  '/terms/': { crumb: 'Terms of Service', title: 'Terms of Service — MS Labs', description: 'Terms that apply to using the MS Labs website and engaging MS Labs for software projects.' },
}

const notFound: Meta = { path: null, title: 'Page not found — MS Labs', description: 'The page you are looking for does not exist.', noindex: true }

const abs = (path: string) => site.url + path

const organization = {
  '@type': 'Organization', '@id': `${site.url}/#org`, name: site.name, url: `${site.url}/`, logo: abs('/favicon.svg'), image: abs('/og.png'),
  slogan: site.tagline, email: site.email, telephone: site.phone,
  contactPoint: { '@type': 'ContactPoint', telephone: site.phone, email: site.email, contactType: 'sales', availableLanguage: ['English', 'Urdu'] },
  ...(Object.keys(site.social).length ? { sameAs: Object.values(site.social) } : {}),
}
const website = { '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: `${site.url}/`, publisher: { '@id': `${site.url}/#org` }, inLanguage: 'en' }

const breadcrumbs = (trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

// Normalizes "/products", "/products/" and "" to the canonical "/products/" form.
export const canonicalPath = (pathname: string) => (pathname.replace(/\/+$/, '') + '/')

export function metaFor(pathname: string): Meta {
  const path = canonicalPath(pathname)
  const page = pages[path]
  if (page) {
    const ld: object[] = path === '/' ? [organization, website] : [breadcrumbs([[page.crumb!, path]])]
    return { ...page, path, jsonLd: ld, ...(path === '/blog/' && posts[0] ? { modified: posts[0].updated ?? posts[0].date } : {}) }
  }
  const [, section, slug] = path.match(/^\/(products|services|blog)\/([^/]+)\/$/) ?? []
  if (section === 'services') return serviceMeta(path, slug)
  if (section === 'blog') return postMeta(path, slug)
  if (section === 'products') return productMeta(path, slug)
  return notFound
}

function serviceMeta(path: string, slug: string): Meta {
  const s = services.find(x => x.slug === slug)
  if (!s) return notFound
  return {
    path, title: `${s.title} Services — MS Labs`, description: s.summary,
    jsonLd: [
      breadcrumbs([['Services', '/services/'], [s.title, path]]),
      { '@type': 'Service', name: s.title, serviceType: s.title, description: s.summary, url: abs(path), provider: { '@id': `${site.url}/#org` } },
      { '@type': 'FAQPage', mainEntity: s.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  }
}

function postMeta(path: string, slug: string): Meta {
  const p = posts.find(x => x.slug === slug)
  if (!p) return notFound
  const modified = p.updated ?? p.date
  return {
    path, type: 'article', title: `${p.title} | MS Labs Blog`, description: p.description, published: p.date, modified,
    jsonLd: [
      breadcrumbs([['Blog', '/blog/'], [p.title, path]]),
      {
        '@type': 'BlogPosting', headline: p.title, description: p.description, url: abs(path), mainEntityOfPage: abs(path),
        datePublished: p.date, dateModified: modified, image: abs('/og.png'), inLanguage: 'en',
        author: { '@id': `${site.url}/#org` }, publisher: { '@id': `${site.url}/#org` },
      },
    ],
  }
}

function productMeta(path: string, slug: string): Meta {
  const p = products.find(x => x.slug === slug)
  if (!p) return notFound
  const live = p.status === 'live'
  return {
    path, type: 'article',
    title: `${p.name} — ${p.category} by MS Labs`,
    description: p.description,
    // Placeholder / unreleased products stay out of the index until they have real content
    noindex: !live,
    jsonLd: [
      breadcrumbs([['Products', '/products/'], [p.name, path]]),
      ...(live ? [{
        '@type': 'SoftwareApplication', name: p.name, description: p.long ?? p.description, url: abs(path),
        applicationCategory: p.category === 'Mobile App' ? 'MobileApplication' : 'BusinessApplication',
        operatingSystem: p.platforms.join(', '), publisher: { '@id': `${site.url}/#org` },
        ...(p.screenshot ? { screenshot: abs(p.screenshot) } : {}),
        ...(p.appStore || p.playStore ? { downloadUrl: p.playStore ?? p.appStore } : {}),
      }] : []),
    ],
  }
}

// Every URL that gets a prerendered HTML file; indexable ones also go in the sitemap.
export const routes = [
  ...Object.keys(pages),
  ...products.map(p => `/products/${p.slug}/`),
  ...services.map(s => `/services/${s.slug}/`),
  ...posts.map(p => `/blog/${p.slug}/`),
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Per-page head tags. Each carries data-seo so the client can swap them on navigation.
export function headTags(m: Meta) {
  const url = m.path ? abs(m.path) : null
  const t = esc(m.title), d = esc(m.description)
  const tags = [
    `<title data-seo>${t}</title>`,
    `<meta data-seo name="description" content="${d}" />`,
    `<meta data-seo name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    url && `<link data-seo rel="canonical" href="${url}" />`,
    `<meta data-seo property="og:type" content="${m.type ?? 'website'}" />`,
    `<meta data-seo property="og:title" content="${t}" />`,
    `<meta data-seo property="og:description" content="${d}" />`,
    url && `<meta data-seo property="og:url" content="${url}" />`,
    m.published && `<meta data-seo property="article:published_time" content="${m.published}" />`,
    m.modified && m.type === 'article' && `<meta data-seo property="article:modified_time" content="${m.modified}" />`,
    `<meta data-seo name="twitter:title" content="${t}" />`,
    `<meta data-seo name="twitter:description" content="${d}" />`,
    m.jsonLd?.length && `<script data-seo type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': m.jsonLd }).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n')
}
