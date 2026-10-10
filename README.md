# MS Labs website
npm install · npm run dev · npm run build (outputs dist/)
Edit: src/config/siteConfig.ts, src/data/products.ts, src/data/services.ts
Services: each entry in src/data/services.ts gets its own page at /services/<slug>/ (intro, what's included, FAQs).
Blog: add src/content/blog/<slug>.md — the filename is the URL. Frontmatter:
  ---
  title: Post title (shown as the H1 — start the body at ## headings)
  description: 140–160 character summary for Google
  date: 2026-10-10            # YYYY-MM-DD; optional `updated:` too
  service: mobile-app-development   # optional: links the post to that service page
  draft: true                 # optional: visible in `npm run dev`, hidden in production
  ---
Values containing ": " must be in quotes. Easiest: write posts in Pages CMS (app.pagescms.org), configured by .pages.yml.
Posts are rendered to HTML at build time, prerendered, and added to the sitemap automatically.
SEO: page titles, descriptions and structured data live in src/config/seo.ts. `npm run build` prerenders every
route to static HTML (dist/<route>/index.html), plus a real 404.html and sitemap.xml — so new products appear
in the sitemap automatically. Products with status 'coming-soon' are noindex and left out of the sitemap.
Deploy: pushing to main builds the site and pushes dist/ to muhammadSaad75/ms-labs-website, which serves
mslabs.online via GitHub Pages (.github/workflows/deploy.yml; needs the LIVE_SITE_DEPLOY_KEY secret).
