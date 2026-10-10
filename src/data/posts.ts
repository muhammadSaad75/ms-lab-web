// Blog posts live in src/content/blog/<slug>.md — add a file and it gets a page, a blog card and a sitemap entry.
// Frontmatter: title, description, date (YYYY-MM-DD); optional updated, service (a services.ts slug), draft: true.
export type PostMeta = { slug: string; title: string; description: string; date: string; updated?: string; service?: string; draft?: boolean; minutes: number }

const metas = import.meta.glob<PostMeta>('../content/blog/*.md', { eager: true, query: '?meta', import: 'default' })
const bodies = import.meta.glob<string>('../content/blog/*.md', { import: 'default' })

// Drafts show in `npm run dev` but are left out of production builds
export const posts = Object.values(metas).filter(p => !(import.meta.env.PROD && p.draft)).sort((a, b) => b.date.localeCompare(a.date))

// One promise per post so React's use() sees a stable value across renders
const cache = new Map<string, Promise<string>>()
export function postHtml(slug: string) {
  let p = cache.get(slug)
  if (!p) cache.set(slug, p = bodies[`../content/blog/${slug}.md`]())
  return p
}

// UTC so the prerendered date matches the hydrated one in every timezone
export const formatDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
