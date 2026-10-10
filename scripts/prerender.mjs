// Turns the client build into static HTML: one file per route, a real 404.html, and sitemap.xml.
// Runs after `vite build` (client -> dist) and `vite build --ssr` (server entry -> dist-ssr).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')
const { render, headTags, metaFor, routes, site } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

const template = await readFile(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) throw new Error('index.html is missing the <!--seo--> or #root placeholder')

// Function replacers: a string replacement would treat any "$" in page content as a special pattern
const page = async url => {
  const body = await render(url)
  return template.replace('<!--seo-->', () => headTags(metaFor(url))).replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
}

for (const url of routes) {
  const file = join(dist, url, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, await page(url))
  console.log('prerendered', url)
}
// Static hosts serve this with a real 404 status for unknown URLs; the app then hydrates the NotFound page
await writeFile(join(dist, '404.html'), await page('/404/'))
console.log('prerendered 404.html')

const today = new Date().toISOString().slice(0, 10)
const urls = routes.map(metaFor).filter(m => m.path && !m.noindex)
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(m => `<url><loc>${site.url}${m.path}</loc><lastmod>${m.modified ?? today}</lastmod></url>`).join('\n')}
</urlset>
`)
console.log(`sitemap.xml: ${urls.length} URLs`)
await rm(ssr, { recursive: true, force: true })
