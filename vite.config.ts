import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { markdown } from './scripts/markdown'

// Only process.env is needed here; avoids pulling @types/node into the browser code's type scope
declare const process: { env: Record<string, string | undefined> }

// Base path comes from the deploy environment: the Pages workflow sets BASE_PATH to '/<repo>/' on
// github.io or '/' on a custom domain. Local dev and plain builds default to '/'.
// Every route (plus 404.html) is prerendered to static HTML by scripts/prerender.mjs after the build.
export default defineConfig({ base: process.env.BASE_PATH || '/', plugins: [markdown(), react(), tailwindcss()] })
