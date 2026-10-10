import { marked } from 'marked'
import { parse } from 'yaml'
import type { Plugin } from 'vite'

// Blog posts are Markdown files with a frontmatter block. Importing "post.md?meta" yields only the metadata
// (bundled into the post list); importing "post.md" yields the rendered HTML (one lazy chunk per post).
// Markdown is rendered here at build time, so no parser ships to the browser.
export function markdown(): Plugin {
  return {
    name: 'mslabs-markdown',
    transform(code, id) {
      const [file, query] = id.split('?')
      if (!file.endsWith('.md') || (query && query !== 'meta')) return
      const m = code.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
      if (!m) throw new Error(`${file}: missing the --- frontmatter --- block`)
      if (!query) return { code: `export default ${JSON.stringify(marked.parse(m[2], { async: false }))}`, map: null }
      // A real YAML parser: Pages CMS may quote values or fold long ones across lines
      let data: Record<string, unknown>
      try { data = parse(m[1]) ?? {} } catch (e) { throw new Error(`${file}: invalid frontmatter (put values containing ": " in quotes): ${(e as Error).message}`) }
      for (const [k, v] of Object.entries(data)) {
        if (v instanceof Date) data[k] = v.toISOString().slice(0, 10)
        if (v === '' || v === null) delete data[k]
      }
      for (const k of ['title', 'description', 'date']) if (!data[k]) throw new Error(`${file}: frontmatter needs "${k}"`)
      for (const k of ['date', 'updated']) if (data[k] && !/^\d{4}-\d{2}-\d{2}$/.test(String(data[k]))) throw new Error(`${file}: "${k}" must be YYYY-MM-DD`)
      data.slug = file.split('/').pop()!.replace(/\.md$/, '')
      data.minutes = Math.max(1, Math.round(m[2].split(/\s+/).filter(Boolean).length / 200))
      return { code: `export default ${JSON.stringify(data)}`, map: null }
    },
  }
}
